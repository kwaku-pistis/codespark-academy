export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown or HTML description
  initialHTML: string;
  initialCSS: string;
  initialJS: string;
  activityGoal: string; // The "Practical Activity" from the schedule
}

export interface WeekModule {
  id: number;
  title: string;
  topics: string[]; // From "Topic" column
  objectives: string[]; // From "Learning Objectives" column
  lessons: Lesson[];
  color: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type Tab = 'learn' | 'practice' | 'quiz';