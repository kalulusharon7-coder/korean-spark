import { UserProgress, LessonProgress, SpeechAttempt } from '@/types/lesson';

const STORAGE_KEY = 'kt-kalatala-progress';

function getDefaultProgress(): UserProgress {
  return {
    lessonsProgress: {},
    currentLesson: 'lesson-1',
    totalSentencesSpoken: 0,
    hangulCharactersBuilt: 0,
    streakDays: 0,
    lastActive: new Date().toISOString(),
  };
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultProgress();
}

export function saveProgress(progress: UserProgress): void {
  progress.lastActive = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonUnlocked(progress: UserProgress, lessonId: string, lessonOrder: number): boolean {
  if (lessonOrder === 1) return true;
  const prevId = `lesson-${lessonOrder - 1}`;
  const prevProgress = progress.lessonsProgress[prevId];
  return !!prevProgress?.completed;
}

export function markSentenceAttempted(progress: UserProgress, lessonId: string, sentenceId: string, attempt: SpeechAttempt): UserProgress {
  const lp = progress.lessonsProgress[lessonId] || {
    lessonId,
    completed: false,
    sentencesAttempted: [],
    sentencesRecalled: [],
    attempts: [],
  };

  if (!lp.sentencesAttempted.includes(sentenceId)) {
    lp.sentencesAttempted = [...lp.sentencesAttempted, sentenceId];
  }
  lp.attempts = [...lp.attempts, attempt];

  return {
    ...progress,
    lessonsProgress: { ...progress.lessonsProgress, [lessonId]: lp },
    totalSentencesSpoken: progress.totalSentencesSpoken + 1,
  };
}

export function markSentenceRecalled(progress: UserProgress, lessonId: string, sentenceId: string): UserProgress {
  const lp = progress.lessonsProgress[lessonId] || {
    lessonId,
    completed: false,
    sentencesAttempted: [],
    sentencesRecalled: [],
    attempts: [],
  };

  if (!lp.sentencesRecalled.includes(sentenceId)) {
    lp.sentencesRecalled = [...lp.sentencesRecalled, sentenceId];
  }

  return {
    ...progress,
    lessonsProgress: { ...progress.lessonsProgress, [lessonId]: lp },
  };
}

export function completeLesson(progress: UserProgress, lessonId: string): UserProgress {
  const lp = progress.lessonsProgress[lessonId] || {
    lessonId,
    completed: false,
    sentencesAttempted: [],
    sentencesRecalled: [],
    attempts: [],
  };

  lp.completed = true;
  lp.completedAt = new Date().toISOString();

  return {
    ...progress,
    lessonsProgress: { ...progress.lessonsProgress, [lessonId]: lp },
  };
}
