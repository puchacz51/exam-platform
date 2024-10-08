import { FC } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../../store/storeContext';

interface QuestionBulletProps {
  questionNumber: number;
  isActive: boolean;
}

const QuestionBullet: FC = () => {
  const questions = useTestContext((state) => state.questions);

  return <Button>{questionNumber}</Button>;
};

export default QuestionBullet;
