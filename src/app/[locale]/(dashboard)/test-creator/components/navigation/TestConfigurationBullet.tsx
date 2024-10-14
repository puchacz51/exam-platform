'use client';
import { FC } from 'react';

import { GrDocumentConfig } from 'react-icons/gr';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useTestContext } from '../../store/storeContext';

const TestConfigurationBullet: FC = () => {
  const test = useTestContext((state) => state.test);

  return (
    <Button
      disabled={!test.title}
      className={cn('h-4 w-4')}
    >
      <GrDocumentConfig className="h-4 w-4 text-white" />
    </Button>
  );
};

export default TestConfigurationBullet;
