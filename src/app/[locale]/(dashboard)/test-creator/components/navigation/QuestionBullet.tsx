// QuestionBullet.tsx
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

interface QuestionBulletProps {
  questionNumber: number;
  isActive: boolean;
}

const QuestionBullet: FC<QuestionBulletProps> = ({
  questionNumber,
  isActive,
}) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
    >
      {questionNumber}
    </Button>
  );
};

export default QuestionBullet;
