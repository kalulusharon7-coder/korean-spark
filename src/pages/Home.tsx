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
    <div className="min-h-screen pb-20 px-4 relative overflow-hidden">
      {/* Faded background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={logo}
          alt=""
          className="w-[120%] max-w-none opacity-[0.06]"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <div className="pt-10 pb-6 text-center">
          <img src={logo} alt="Kala-Tala" className="w-32 h-32 mx-auto mb-3 object-contain" />
          <p className="text-sm text-muted-foreground max-w-xs mx-auto tracking-wide">
            Communication before grammar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto">
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <BookOpen className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{completedCount}</p>
            <p className="text-[10px] text-muted-foreground">Lessons</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <MessageCircle className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{progress.totalSentencesSpoken}</p>
            <p className="text-[10px] text-muted-foreground">Spoken</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <Flame className="h-5 w-5 mx-auto text-primary mb-1" />
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
    </div>
  );
};

export default HomePage;
