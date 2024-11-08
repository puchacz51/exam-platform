'use client';

import { FC } from 'react';

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
import { TestCreatorTest } from '@/app/[locale]/(dashboard)/test-creator/types/test';

const TestCreatorTestBasic: FC = () => {
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
            <FormLabel className="font-semibold">Tytuł testu</FormLabel>
            <FormControl>
              <Input
                placeholder="Wprowadź tytuł testu"
                className="border-gray-200"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Nadaj swojemu testowi unikalny tytuł
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Opis</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Wprowadź opis testu"
                className="min-h-32 border-gray-200"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Opisz czego dotyczy test i jakie są jego cele
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

export default TestCreatorTestBasic;
