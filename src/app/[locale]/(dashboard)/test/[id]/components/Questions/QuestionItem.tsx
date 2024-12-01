import QuestionSelector from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionSelector';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/questions';

interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  mode?: 'view' | 'solve';
}

export const QuestionItem = ({
  question,
  questionIndex,
  mode = 'view',
}: QuestionItemProps) => (
  <Card className="p-4 transition-shadow hover:shadow-md">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-md flex items-center gap-2 font-medium">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
          {questionIndex + 1}
        </span>
        Question
      </h4>
      <Badge variant="outline">{question.points} points</Badge>
    </div>
    <p className="mb-4">{question.text}</p>
    <QuestionSelector
      mode={mode}
      question={question}
    />
  </Card>
);
