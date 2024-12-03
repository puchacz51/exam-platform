import { FC } from 'react';

import BooleanGroupQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/BooleanGroupQuestion';
import NumericGroupQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/NumericGroupQuestion';
import SingleChoiceQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/MultipleChoiceQuestion';
import MatchingQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/MatchingQuestion';
import OrderQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/OrderQuestion';
import NumericQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/NumericQuestion';
import BooleanQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/BooleanQuestion';
import OpenQuestion from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/OpenQuestion';
import { Question } from '@/types/questions';

interface QuestionSelectorProps {
  question: Question;
  mode?: 'view' | 'solve';
}

const QuestionSelector: FC<QuestionSelectorProps> = ({
  question,
  mode = 'view',
}) => {
  switch (question.questionType) {
    case 'SINGLE_CHOICE':
      return (
        <SingleChoiceQuestion
          mode={mode}
          question={question}
        />
      );
    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoiceQuestion
          mode={mode}
          question={question}
        />
      );
    case 'MATCHING':
      return (
        <MatchingQuestion
          mode={mode}
          question={question}
        />
      );
    case 'ORDER':
      return (
        <OrderQuestion
          mode={mode}
          question={question}
        />
      );
    case 'NUMERIC':
      return (
        <NumericQuestion
          mode={mode}
          question={question}
        />
      );
    case 'BOOLEAN':
      return (
        <BooleanQuestion
          mode={mode}
          question={question}
        />
      );
    case 'BOOLEAN_GROUP':
      return (
        <BooleanGroupQuestion
          mode={mode}
          question={question}
        />
      );
    case 'NUMERIC_GROUP':
      return (
        <NumericGroupQuestion
          mode={mode}
          question={question}
        />
      );
    case 'OPEN':
      return (
        <OpenQuestion
          mode={mode}
          question={question}
        />
      );
  }
};

export default QuestionSelector;
