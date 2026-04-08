import React, { useState, useCallback } from 'react';
import { Lesson, Sentence } from '@/types/lesson';
import { UserProgress } from '@/types/lesson';
import { koreanSimilarity, getFeedbackMessage } from '@/utils/similarity';
import { markSentenceAttempted, markSentenceRecalled, completeLesson, saveProgress } from '@/utils/progress';
import SentenceCard from './SentenceCard';
import SpeechRecorder from './SpeechRecorder';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle, RotateCcw, Star } from 'lucide-react';

interface LessonPlayerProps {
  lesson: Lesson;
  progress: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
  onComplete: () => void;
}

type Phase = 'learn' | 'recall' | 'complete';

const LessonPlayer: React.FC<LessonPlayerProps> = ({ lesson, progress, onProgressUpdate, onComplete }) => {
  const allSentences = lesson.subLessons.flatMap(sl => sl.sentences);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('learn');
  const [showRomanization, setShowRomanization] = useState(true);
  const [feedback, setFeedback] = useState<{ message: string; type: string; spoken?: string } | null>(null);
  const [recallIndex, setRecallIndex] = useState(0);
  const [attemptedInPhase, setAttemptedInPhase] = useState<Set<string>>(new Set());

  const currentSentence: Sentence | undefined = phase === 'learn'
    ? allSentences[currentIndex]
    : allSentences[recallIndex];

  const totalSentences = allSentences.length;
  const progressPercent = phase === 'learn'
    ? ((currentIndex) / totalSentences) * 50
    : 50 + ((recallIndex) / totalSentences) * 50;

  // Find current sub-lesson title
  let currentSubLesson = '';
  let count = 0;
  for (const sl of lesson.subLessons) {
    const idx = phase === 'learn' ? currentIndex : recallIndex;
    if (idx < count + sl.sentences.length) {
      currentSubLesson = sl.title;
      break;
    }
    count += sl.sentences.length;
  }

  const handleSpeechResult = useCallback((spokenText: string) => {
    if (!currentSentence) return;

    const similarity = koreanSimilarity(spokenText, currentSentence.korean);
    const fb = getFeedbackMessage(similarity);

    const attempt = {
      sentenceId: currentSentence.id,
      spokenText,
      targetText: currentSentence.korean,
      similarity,
      timestamp: new Date().toISOString(),
    };

    let updated = markSentenceAttempted(progress, lesson.id, currentSentence.id, attempt);

    if (phase === 'recall') {
      updated = markSentenceRecalled(updated, lesson.id, currentSentence.id);
    }

    saveProgress(updated);
    onProgressUpdate(updated);

    setFeedback({ message: fb.message, type: fb.type, spoken: spokenText });
    setAttemptedInPhase(prev => new Set(prev).add(currentSentence.id));
  }, [currentSentence, progress, lesson.id, phase, onProgressUpdate]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    if (phase === 'learn') {
      if (currentIndex < totalSentences - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setPhase('recall');
        setRecallIndex(0);
        setAttemptedInPhase(new Set());
      }
    } else if (phase === 'recall') {
      if (recallIndex < totalSentences - 1) {
        setRecallIndex(i => i + 1);
      } else {
        // Complete
        const updated = completeLesson(progress, lesson.id);
        saveProgress(updated);
        onProgressUpdate(updated);
        setPhase('complete');
      }
    }
  }, [phase, currentIndex, recallIndex, totalSentences, progress, lesson.id, onProgressUpdate]);

  const handleSkip = useCallback(() => {
    setFeedback(null);
    setAttemptedInPhase(prev => new Set(prev).add(currentSentence?.id || ''));
    handleNext();
  }, [handleNext, currentSentence]);

  if (phase === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
        <div className="rounded-full bg-primary/10 p-6">
          <Star className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Lesson Complete! 🎉</h2>
        <p className="text-muted-foreground max-w-md">
          You're building real Korean, sentence by sentence. Communication, not perfection!
        </p>
        <Button onClick={onComplete} size="lg" className="gap-2">
          Continue <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (!currentSentence) return null;

  const hasAttempted = attemptedInPhase.has(currentSentence.id);

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {phase === 'learn' ? 'Listen & Repeat' : 'Recall from Memory'}
          </span>
          <span className="text-xs text-muted-foreground">
            {phase === 'learn' ? currentIndex + 1 : recallIndex + 1} / {totalSentences}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">{currentSubLesson}</p>
      </div>

      {/* Sentence */}
      <SentenceCard
        sentence={currentSentence}
        showRomanization={showRomanization}
        onToggleRomanization={() => setShowRomanization(!showRomanization)}
        hideText={phase === 'recall'}
      />

      {/* Speech */}
      <div className="mt-6">
        <SpeechRecorder onResult={handleSpeechResult} />
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg text-center animate-slide-up ${
          feedback.type === 'success'
            ? 'bg-primary/10 text-primary'
            : feedback.type === 'good'
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground'
        }`}>
          <p className="text-sm font-medium">{feedback.message}</p>
          {feedback.spoken && (
            <p className="text-xs mt-1 opacity-70">You said: "{feedback.spoken}"</p>
          )}
          {phase === 'recall' && (
            <p className="text-xs mt-1 korean-text font-medium">
              Answer: {currentSentence.korean}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-3 justify-center">
        {(hasAttempted || feedback) && (
          <Button onClick={handleNext} className="gap-2">
            {phase === 'learn' && currentIndex === totalSentences - 1
              ? 'Start Recall'
              : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {!hasAttempted && !feedback && (
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Skip for now
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonPlayer;
