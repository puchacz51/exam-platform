import { FC } from 'react';

import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Textarea } from '@/components/ui/textarea';

import SingleChoiceQuestion from './SingleChoinceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import MatchingQuestion from './MatchingQuestion';
import BooleanQuestion from './BooleanQuestion';
import NumericQuestion from './NumericQuestion';
import OrderQuestion from './OrderQuestion';
import BooleanGroupQuestion from '@/app/[locale]/(public)/test/[id]/components/Questions/BooleanGroupQuestion';
import NumericGroupQuestion from '@/app/[locale]/(public)/test/[id]/components/Questions/NumericGroupQuestion';

const QuestionSelector: FC<{ question: QuestionType }> = ({ question }) => {
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
      return <NumericGroupQuestion question={question} />;
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
