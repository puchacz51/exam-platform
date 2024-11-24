export interface TestWithCategory {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  questionCount: number;
  categories: string[];
}
