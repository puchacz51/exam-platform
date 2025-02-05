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
  FormMessage,
} from '@/components/ui/form';
import { TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { scoringSystemEnum } from '@schema/testSettings';
import { TestCreatorTest } from '@/types/test-creator/test';

const TestCreatorTestScoring: FC = () => {
  const t = useTranslations('testCreator.settings.scoring');
  const form = useFormContext<TestCreatorTest>();

  return (
    <TabsContent
      value="scoring"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="settings.scoringSystem"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">
              {t('scoringSystem')}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder={t('scoringSystemPlaceholder')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {scoringSystemEnum.enumValues.map((system) => (
                  <SelectItem
                    key={system}
                    value={system}
                  >
                    {system}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>{t('scoringDescription')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="settings.allowPartialPoints"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-semibold">
                {t('partialPoints')}
              </FormLabel>
              <FormDescription>{t('partialPointsDescription')}</FormDescription>
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
    </TabsContent>
  );
};

export default TestCreatorTestScoring;
