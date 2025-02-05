'use client';

import { FC } from 'react';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { TestCreatorTest } from '@/types/test-creator/test';

const TestCreatorTestResults: FC = () => {
  const t = useTranslations('testCreator.settings.results');
  const form = useFormContext<TestCreatorTest>();
  // const watch = form.watch;
  return (
    <TabsContent
      value="results"
      className="space-y-6"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="settings.showCorrectAnswers"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  {t('showCorrectAnswers')}
                </FormLabel>
                <FormDescription>
                  {t('showCorrectAnswersDescription')}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default TestCreatorTestResults;
