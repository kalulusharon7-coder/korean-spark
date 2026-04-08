import React from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '@/data/lessons';
import { loadProgress, isLessonUnlocked } from '@/utils/progress';
import { Lock, CheckCircle, ChevronRight } from 'lucide-react';

const LessonsPage: React.FC = () => {
  const progress = loadProgress();

  return (
    <div className="min-h-screen pb-20 px-4 pt-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Lessons</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Speaking first. One sentence at a time.
      </p>

      <div className="space-y-3 max-w-lg mx-auto">
        {lessons.map(lesson => {
          const unlocked = isLessonUnlocked(progress, lesson.id, lesson.order);
          const lp = progress.lessonsProgress[lesson.id];
          const completed = lp?.completed;
          const sentenceCount = lesson.subLessons.reduce((sum, sl) => sum + sl.sentences.length, 0);

          return (
            <Link
              key={lesson.id}
              to={unlocked ? `/lessons/${lesson.id}` : '#'}
              className={`block rounded-xl border p-4 transition-all ${
                !unlocked
                  ? 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                  : completed
                  ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
              }`}
              onClick={e => { if (!unlocked) e.preventDefault(); }}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                  completed
                    ? 'bg-primary text-primary-foreground'
                    : unlocked
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completed ? <CheckCircle className="h-5 w-5" /> : lesson.order}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lesson.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {lesson.subLessons.length} parts · {sentenceCount} sentences
                  </p>
                </div>
                {unlocked ? (
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsPage;
