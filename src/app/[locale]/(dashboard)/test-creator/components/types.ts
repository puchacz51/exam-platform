export interface QuestionProps {
  question: {
    id: string;
    content: string;
    type: string;
    options?: string[];
  };
  answers: string[];
  onAnswerChange: (answers: string[]) => void;
}
