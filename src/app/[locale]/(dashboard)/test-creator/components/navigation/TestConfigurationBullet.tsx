'use client';
import { FC } from 'react';

import { GrDocumentConfig } from 'react-icons/gr';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

const TestConfigurationBullet: FC = () => {
  const isInitialTestConfig = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );
  const setIsTestConfiguratorOpen = useTestContext(
    (state) => state.setIsTestConfiguratorOpen
  );
  const isQuestionConfiguratorOpen = useTestContext(
    (state) => state.isQuestionConfiguratorOpen
  );

  return (
    <Button
      onClick={() => setIsTestConfiguratorOpen(!isQuestionConfiguratorOpen)}
      disabled={!isInitialTestConfig}
      variant={isInitialTestConfig ? 'default' : 'ghost'}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full p-3 transition-all duration-300 ease-in-out',
        !isInitialTestConfig
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:from-blue-500 hover:to-blue-700'
      )}
      aria-label="Configure test"
    >
      <GrDocumentConfig className="h-6 w-6" />
    </Button>
  );
};

export default TestConfigurationBullet;
