'use client';

import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

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

const TestCreatorTestBasic: FC = () => {
  const form = useFormContext();

  return (
    <TabsContent
      value="basic"
      className="space-y-6"
    >
      <FormField
        control={form.control}
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
        control={form.control}
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
