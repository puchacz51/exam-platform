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
      variant={test.title ? 'default' : 'ghost'}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors duration-200',
        !test.title
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      )}
      aria-label="Configure test"
    >
      <GrDocumentConfig className="h-6 w-6" />
    </Button>
  );
};

export default TestConfigurationBullet;
