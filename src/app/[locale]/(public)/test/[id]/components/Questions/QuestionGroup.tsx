import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import QuestionSelector from './QuestionSelector';

interface Question {
  id: string;
  text: string;
  points: number;
}

interface QuestionGroupProps {
  group: {
    name?: string;
    questions?: Question[];
  };
  currentGroupIndex: number;
}

export const QuestionGroup = ({
  group,
  currentGroupIndex,
}: QuestionGroupProps) => (
  <>
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {group?.name || `Group ${currentGroupIndex + 1}`}
        </h3>
        <Badge
          variant="outline"
          className="text-sm"
        >
          {group?.questions?.length || 0} Questions
        </Badge>
      </div>
    </div>

    <div className="space-y-6">
      {group?.questions?.map((question, questionIndex) => (
        <Card
          key={question.id}
          className="p-4 transition-shadow hover:shadow-md"
        >
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
          <QuestionSelector question={question} />
        </Card>
      ))}
    </div>
  </>
);
