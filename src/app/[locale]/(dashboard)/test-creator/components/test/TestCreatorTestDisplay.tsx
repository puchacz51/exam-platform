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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { questionDisplayModeEnum } from '@schema/testSettings';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { TestCreatorTest } from '@/types/test-creator/test';

const TestCreatorTestDisplay: FC = () => {
  const form = useFormContext<TestCreatorTest>();
  const questionDisplayMode = form.watch('settings.questionDisplayMode');

  return (
    <TabsContent
      value="display"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="settings.questionDisplayMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">
              Tryb wyświetlania pytań
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Wybierz tryb wyświetlania" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {questionDisplayModeEnum.enumValues.map((mode) => (
                  <SelectItem
                    key={mode}
                    value={mode}
                  >
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Sposób wyświetlania pytań w teście
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {questionDisplayMode === 'CUSTOM' && (
        <FormField
          control={form.control}
          name="settings.questionsPerPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Liczba pytań na stronę
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  className="border-gray-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ile pytań ma być wyświetlanych jednocześnie
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="settings.shuffleQuestionsInGroup"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Losowa kolejność pytań
                </FormLabel>
                <FormDescription>
                  Pytania będą wyświetlane w losowej kolejności
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
          name="settings.shuffleAnswers"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Losowa kolejność odpowiedzi
                </FormLabel>
                <FormDescription>
                  Odpowiedzi będą wyświetlane w losowej kolejności
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

      <Separator />

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="settings.showProgressBar"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż pasek postępu
                </FormLabel>
                <FormDescription>
                  Wyświetlaj postęp rozwiązywania testu
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
          name="settings.showTimeRemaining"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż pozostały czas
                </FormLabel>
                <FormDescription>
                  Wyświetlaj licznik pozostałego czasu
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
          name="settings.showQuestionPoints"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">
                  Pokaż punkty za pytanie
                </FormLabel>
                <FormDescription>
                  Wyświetlaj możliwą do zdobycia liczbę punktów
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
          name="settings.autosaveInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Interwał autozapisu (sekundy)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  className="border-gray-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Jak często automatycznie zapisywać odpowiedzi (0 = wyłączone)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default TestCreatorTestDisplay;
