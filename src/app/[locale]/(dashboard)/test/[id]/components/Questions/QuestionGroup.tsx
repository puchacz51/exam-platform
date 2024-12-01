import { Badge } from '@/components/ui/badge';
import { CompleteQuestionGroup } from '@/types/test/test';
import { Question } from '@/types/questions';
import { QuestionItem } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionItem';

interface QuestionGroupProps {
  group: CompleteQuestionGroup;
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
        <QuestionItem
          key={question.id}
          question={question as Question}
          questionIndex={questionIndex}
        />
      ))}
    </div>
  </>
);
