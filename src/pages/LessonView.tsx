import React, { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLessonById } from '@/data/lessons';
import { loadProgress, saveProgress } from '@/utils/progress';
import { UserProgress } from '@/types/lesson';
import LessonPlayer from '@/components/LessonPlayer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const LessonView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = getLessonById(id || '');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  const handleProgressUpdate = useCallback((updated: UserProgress) => {
    setProgress(updated);
    saveProgress(updated);
  }, []);

  const handleComplete = useCallback(() => {
    navigate('/lessons');
  }, [navigate]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pb-20 px-4">
        <p className="text-muted-foreground mb-4">Lesson not found.</p>
        <Link to="/lessons">
          <Button variant="outline">Back to Lessons</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-4">
      <div className="px-4 mb-4 flex items-center gap-3">
        <Link to="/lessons">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-foreground">{lesson.title}</h1>
          <p className="text-xs text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      <LessonPlayer
        lesson={lesson}
        progress={progress}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default LessonView;
