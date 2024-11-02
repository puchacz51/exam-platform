import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

const SingleChoiceQuestion: React.FC<{ question: QuestionType }> = ({
  question,
}) => {
  return (
    <RadioGroup className="space-y-3">
      {question.answers?.map((answer) => (
        <div
          key={answer.id}
          className="flex items-center space-x-3"
        >
          <RadioGroupItem
            value={answer.id}
            id={answer.id}
            disabled
          />
          <Label
            htmlFor={answer.id}
            className="text-sm"
          >
            {answer.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default SingleChoiceQuestion;
