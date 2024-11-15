import React, { FC } from 'react';

import {
  Calculator,
  CheckSquare,
  CheckSquare2,
  GitMerge,
  Hash,
  ListOrdered,
  LucideRadio as RadioButton,
  Type,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TestCreatorQuestion } from '@/app/[locale]/(dashboard)/test-creator/types/question';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

interface QuestionBulletProps {
  question: TestCreatorQuestion;
  questionGroupId: string;
  index: number;
}

export const questionTypeIcons = {
  OPEN: Type,
  SINGLE_CHOICE: RadioButton,
  MULTIPLE_CHOICE: CheckSquare,
  ORDER: ListOrdered,
  BOOLEAN: CheckSquare2,
  NUMERIC: Hash,
  MATCHING: GitMerge,
  BOOLEAN_GROUP: CheckSquare,
  NUMERIC_GROUP: Calculator,
} as const;

export const questionTypeColors = {
  OPEN: 'hover:bg-blue-100 bg-blue-50',
  SINGLE_CHOICE: 'hover:bg-green-100 bg-green-50',
  MULTIPLE_CHOICE: 'hover:bg-purple-100 bg-purple-50',
  ORDER: 'hover:bg-orange-100 bg-orange-50',
  BOOLEAN: 'hover:bg-yellow-100 bg-yellow-50',
  NUMERIC: 'hover:bg-red-100 bg-red-50',
  MATCHING: 'hover:bg-indigo-100 bg-indigo-50',
  BOOLEAN_GROUP: 'hover:bg-teal-100 bg-teal-50',
  NUMERIC_GROUP: 'hover:bg-pink-100 bg-pink-50',
} as const;

const QuestionBullet: FC<QuestionBulletProps> = ({
  question,
  index,
  questionGroupId,
}) => {
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );

  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const Icon = questionTypeIcons[question.questionType];

  const handleQuestionClick = () => {
    if (currentQuestion?.id === question.id) {
      return setCurrentQuestion(null);
    }
    setCurrentQuestion({ groupId: questionGroupId, questionId: question.id });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleQuestionClick}
            variant="outline"
            className={cn(
              'relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all',
              questionTypeColors[question.questionType],
              currentQuestion?.id === question.id &&
                'ring-2 ring-black ring-offset-2'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{index + 1}.</span>
            <span className="max-w-[120px] truncate">{question.text}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{question.text}</p>
          <p className="text-xs text-gray-500">{question.questionType}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default QuestionBullet;
