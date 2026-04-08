export interface Sentence {
  id: string;
  korean: string;
  romanization?: string;
  english: string;
  audioUrl: string;
  tags?: string[];
}

export interface SubLesson {
  id: string;
  title: string;
  sentences: Sentence[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  theme: string;
  phase: 'speaking' | 'grammar' | 'writing';
  order: number;
  subLessons: SubLesson[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  sentencesAttempted: string[];
  sentencesRecalled: string[];
  completedAt?: string;
  attempts: SpeechAttempt[];
}

export interface SpeechAttempt {
  sentenceId: string;
  spokenText: string;
  targetText: string;
  similarity: number;
  timestamp: string;
}

export interface UserProgress {
  lessonsProgress: Record<string, LessonProgress>;
  currentLesson: string;
  totalSentencesSpoken: number;
  hangulCharactersBuilt: number;
  streakDays: number;
  lastActive: string;
}
