import { FC } from 'react';

import { Textarea } from '@/components/ui/textarea';
import BooleanGroupQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/BooleanGroupQuestion';
import NumericGroupQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/NumericGroupQuestion';
import SingleChoiceQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/SingleChoinceQuestion';
import MultipleChoiceQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/MultipleChoiceQuestion';
import MatchingQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/MatchingQuestion';
import OrderQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/OrderQuestion';
import NumericQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/NumericQuestion';
import BooleanQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/BooleanQuestion';
import { Question } from '@/types/test/questionTypes';
import { type NumericGroupQuestion as NumericGroupQuestionType } from '@/types/test-creator/question';

interface QuestionSelectorProps {
  question: Question;
}

const QuestionSelector: FC<QuestionSelectorProps> = ({ question }) => {
  switch (question.questionType) {
    case 'SINGLE_CHOICE':
      return <SingleChoiceQuestion question={question} />;
    case 'MULTIPLE_CHOICE':
      return <MultipleChoiceQuestion question={question} />;
    case 'MATCHING':
      return <MatchingQuestion question={question} />;
    case 'ORDER':
      return <OrderQuestion question={question} />;
    case 'NUMERIC':
      return <NumericQuestion question={question} />;
    case 'BOOLEAN':
      return <BooleanQuestion question={question} />;
    case 'BOOLEAN_GROUP':
      return <BooleanGroupQuestion question={question} />;
    case 'NUMERIC_GROUP':
      return (
        <NumericGroupQuestion
          question={question as unknown as NumericGroupQuestionType}
        />
      );
    default:
      return (
        <Textarea
          placeholder="Enter your answer"
          disabled
          className="w-full"
        />
      );
  }
};

export default QuestionSelector;
