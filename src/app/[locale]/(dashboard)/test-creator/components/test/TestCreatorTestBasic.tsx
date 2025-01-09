'use client';

import { FC } from 'react';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TabsContent } from '@/components/ui/tabs';
import { TestCreatorTest } from '@/types/test-creator/test';

const TestCreatorTestBasic: FC = () => {
  const t = useTranslations('testCreator.settings.basic');
  const {
    formState: { errors },
    control,
  } = useFormContext<TestCreatorTest>();

  return (
    <TabsContent
      value="basic"
      className={cn(
        'space-y-6',
        (errors.title || errors.description) &&
          'rounded-lg p-4 ring-2 ring-destructive/20'
      )}
    >
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">{t('title')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('titlePlaceholder')}
                className="border-gray-200"
                {...field}
              />
            </FormControl>
            <FormDescription>{t('titleDescription')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">{t('description')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('descriptionPlaceholder')}
                className="min-h-32 border-gray-200"
                {...field}
              />
            </FormControl>
            <FormDescription>{t('descriptionHelp')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

export default TestCreatorTestBasic;
