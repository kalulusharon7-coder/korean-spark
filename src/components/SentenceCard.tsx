import React, { useState, useCallback } from 'react';
import { Sentence } from '@/types/lesson';
import { speakKorean } from '@/utils/speech';
import { Button } from '@/components/ui/button';
import { Volume2, Eye, EyeOff } from 'lucide-react';

interface SentenceCardProps {
  sentence: Sentence;
  showRomanization: boolean;
  onToggleRomanization: () => void;
  hideText?: boolean;
  children?: React.ReactNode;
}

const SentenceCard: React.FC<SentenceCardProps> = ({
  sentence,
  showRomanization,
  onToggleRomanization,
  hideText = false,
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(async () => {
    setIsPlaying(true);
    await speakKorean(sentence.korean);
    setIsPlaying(false);
  }, [sentence.korean]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-slide-up">
      {!hideText ? (
        <>
          <div className="mb-4 text-center">
            <p className="korean-text text-3xl font-bold text-foreground mb-2">
              {sentence.korean}
            </p>
            {showRomanization && sentence.romanization && (
              <p className="text-sm text-muted-foreground italic mb-2">
                {sentence.romanization}
              </p>
            )}
            <p className="text-lg text-muted-foreground">
              {sentence.english}
            </p>
          </div>
        </>
      ) : (
        <div className="mb-4 text-center">
          <p className="text-lg text-muted-foreground italic">
            Can you recall this sentence?
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {sentence.english}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlay}
          disabled={isPlaying}
          className="gap-2"
        >
          <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse-gentle text-primary' : ''}`} />
          {isPlaying ? 'Playing...' : 'Listen'}
        </Button>

        {!hideText && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleRomanization}
            className="gap-2"
          >
            {showRomanization ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showRomanization ? 'Hide' : 'Show'} Romanization
          </Button>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default SentenceCard;
