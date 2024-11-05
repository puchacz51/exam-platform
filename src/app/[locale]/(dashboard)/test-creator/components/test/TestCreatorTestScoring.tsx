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

const TestCreatorTestScoring: FC = () => {
  const form = useFormContext();

  return (
    <TabsContent
      value="scoring"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="scoringSystem"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">System punktacji</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Wybierz system punktacji" />
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
            <FormDescription>
              Wybierz sposób przyznawania punktów
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allowPartialPoints"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-semibold">Punkty cząstkowe</FormLabel>
              <FormDescription>
                Pozwól na przyznawanie części punktów za częściowo poprawne
                odpowiedzi
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="minimumPointsPerQuestion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Minimalna liczba punktów
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border-gray-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Minimalna liczba punktów za pytanie
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roundingPrecision"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Precyzja zaokrąglania
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  className="border-gray-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>Liczba miejsc po przecinku</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default TestCreatorTestScoring;
