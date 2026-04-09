import React from 'react';
import { Link } from 'react-router-dom';
import { loadProgress } from '@/utils/progress';
import { lessons } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { BookOpen, Flame, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const HomePage: React.FC = () => {
  const progress = loadProgress();
  const completedCount = Object.values(progress.lessonsProgress).filter(lp => lp.completed).length;
  const nextLesson = lessons.find(l => !progress.lessonsProgress[l.id]?.completed) || lessons[0];

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Hero */}
      <div className="pt-8 pb-6 text-center">
        <img src={logo} alt="Kala-Tala — Communication before grammar" className="w-40 h-40 mx-auto mb-2 object-contain" />
        <p className="text-sm text-accent max-w-xs mx-auto font-medium tracking-wide">
          Communication before grammar.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto">
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <BookOpen className="h-5 w-5 mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{completedCount}</p>
          <p className="text-[10px] text-muted-foreground">Lessons</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <MessageCircle className="h-5 w-5 mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{progress.totalSentencesSpoken}</p>
          <p className="text-[10px] text-muted-foreground">Spoken</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Flame className="h-5 w-5 mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{progress.streakDays}</p>
          <p className="text-[10px] text-muted-foreground">Streak</p>
        </div>
      </div>

      {/* Continue */}
      <div className="max-w-sm mx-auto mb-8">
        <Link to={`/lessons/${nextLesson.id}`}>
          <div className="rounded-xl bg-primary text-primary-foreground p-5 hover:opacity-90 transition-opacity">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Continue Learning</p>
            <p className="text-lg font-bold">{nextLesson.title}</p>
            <p className="text-sm opacity-80">{nextLesson.description}</p>
          </div>
        </Link>
      </div>

      {/* Quick links */}
      <div className="max-w-sm mx-auto space-y-3">
        <Link to="/lessons">
          <Button variant="outline" className="w-full justify-start gap-3">
            <BookOpen className="h-4 w-4" />
            Browse All Lessons
          </Button>
        </Link>
        <Link to="/hangul">
          <Button variant="outline" className="w-full justify-start gap-3 mt-3">
            <span className="korean-text text-sm">ㄱ</span>
            Hangul Chart
          </Button>
        </Link>
      </div>

      {/* Motto */}
      <p className="text-center text-xs text-muted-foreground mt-12 max-w-xs mx-auto">
        Let's get another language under your belt in no time. 🇰🇷
      </p>
    </div>
  );
};

export default HomePage;
