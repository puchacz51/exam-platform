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

const TestCreatorTestNavigation: FC = () => {
  const form = useFormContext<TestCreatorTest>();
  const t = useTranslations('testCreator.settings.navigation');
  const { setValue } = form;

  const onAllowGoBackChange = (value: boolean) => {
    setValue('settings.allowGoBack', value);
    if (value) {
      setValue('settings.showQuestionPoints', false);
    }
  };

  return (
    <TabsContent
      value="navigation"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="settings.allowGoBack"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-semibold">
                {t('allowGoBack')}
              </FormLabel>
              <FormDescription>{t('allowGoBackDescription')}</FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={onAllowGoBackChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

export default TestCreatorTestNavigation;
