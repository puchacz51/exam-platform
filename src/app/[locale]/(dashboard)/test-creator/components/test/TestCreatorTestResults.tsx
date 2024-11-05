'use client';

import { FC } from 'react';

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

const TestCreatorTestResults: FC = () => {
  const form = useFormContext();

  return (
    <TabsContent
      value="results"
      className="space-y-6"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="showPartialResults"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż wyniki cząstkowe
                </FormLabel>
                <FormDescription>
                  Wyświetlaj wyniki podczas rozwiązywania testu
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

        <FormField
          control={form.control}
          name="showCorrectAnswers"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż poprawne odpowiedzi
                </FormLabel>
                <FormDescription>
                  Wyświetl poprawne odpowiedzi po zakończeniu testu
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

        <FormField
          control={form.control}
          name="showPointsPerQuestion"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż punkty za pytania
                </FormLabel>
                <FormDescription>
                  Wyświetl zdobyte punkty za każde pytanie
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

        <FormField
          control={form.control}
          name="showFinalScore"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż wynik końcowy
                </FormLabel>
                <FormDescription>
                  Wyświetl całkowity wynik po zakończeniu testu
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
