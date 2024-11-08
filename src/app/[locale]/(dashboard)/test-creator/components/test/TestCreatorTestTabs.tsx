'use client';

import { FC } from 'react';

import { FieldErrors, useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestCreatorTest } from '@/app/[locale]/(dashboard)/test-creator/types/test';

type TestFieldsErrors = FieldErrors<TestCreatorTest>;

const TestCreatorTestTabs: FC = () => {
  const form = useFormContext<TestCreatorTest>();
  const {
    formState: { errors },
  } = form;

  const hasErrors = (fields: string[]) => {
    return fields.some((field) => {
      const fieldPath = field.split('.');
      let current: TestFieldsErrors = errors;
      for (const key of fieldPath) {
        if (!current[key as unknown as 'title']) return false;
        current = current[key as unknown as 'title'] as TestFieldsErrors;
      }
      return true;
    });
  };

  const tabsWithErrors = {
    basic: hasErrors(['title', 'description']),
    scoring: hasErrors([
      'settings.scoringSystem',
      'settings.minimumPointsPerQuestion',
      'settings.roundingPrecision',
    ]),
    navigation: hasErrors(['settings.navigationMode']),
    display: hasErrors([
      'settings.questionDisplayMode',
      'settings.questionsPerPage',
      'settings.autosaveInterval',
    ]),
    access: hasErrors(['accessType', 'accessCode']),
    results: hasErrors([]),
  };

  return (
    <Tabs defaultValue="basic">
      <TabsList className="flex h-auto w-full flex-wrap gap-2 bg-transparent">
        {Object.entries(tabsWithErrors).map(([tab, hasError]) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="relative data-[state=active]:bg-primary/5"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {hasError && (
              <AlertCircle className="absolute -right-1 -top-1 h-4 w-4 text-destructive" />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TestCreatorTestTabs;
