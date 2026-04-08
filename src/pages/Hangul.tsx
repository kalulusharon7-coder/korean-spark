import React from 'react';
import HangulChart from '@/components/HangulChart';
import { loadProgress } from '@/utils/progress';

const HangulPage: React.FC = () => {
  const progress = loadProgress();
  const completedCount = Object.values(progress.lessonsProgress).filter(lp => lp.completed).length;
  const showNames = completedCount >= 20;

  return (
    <div className="min-h-screen pb-20 px-4 pt-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Hangul Chart</h1>
      <p className="text-sm text-muted-foreground mb-6">
        The Korean alphabet — tap to hear each sound.
      </p>

      <div className="max-w-lg mx-auto">
        <HangulChart showNames={showNames} />

        {!showNames && (
          <p className="text-xs text-muted-foreground text-center mt-6">
            Complete 20 lessons to unlock character names and pairing rules ✨
          </p>
        )}
      </div>
    </div>
  );
};

export default HangulPage;
