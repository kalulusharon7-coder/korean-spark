import React from 'react';
import { loadProgress } from '@/utils/progress';
import { lessons } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const progress = loadProgress();
  const completedCount = Object.values(progress.lessonsProgress).filter(lp => lp.completed).length;
  const totalAttempts = Object.values(progress.lessonsProgress).reduce(
    (sum, lp) => sum + (lp.attempts?.length || 0), 0
  );

  const handleReset = () => {
    if (window.confirm('Are you sure? This will reset all your progress.')) {
      localStorage.removeItem('kt-kalatala-progress');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

      <div className="max-w-sm mx-auto space-y-6">
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="korean-text text-2xl text-primary font-bold">학</span>
          </div>
          <p className="text-lg font-bold text-foreground">Learner</p>
          <p className="text-sm text-muted-foreground">Communication, not perfection</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-semibold text-foreground">Progress</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Lessons Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{lessons.length}</p>
              <p className="text-xs text-muted-foreground">Total Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{progress.totalSentencesSpoken}</p>
              <p className="text-xs text-muted-foreground">Sentences Spoken</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{totalAttempts}</p>
              <p className="text-xs text-muted-foreground">Total Attempts</p>
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={handleReset} className="w-full gap-2 text-destructive hover:text-destructive">
          <RotateCcw className="h-4 w-4" />
          Reset Progress
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
