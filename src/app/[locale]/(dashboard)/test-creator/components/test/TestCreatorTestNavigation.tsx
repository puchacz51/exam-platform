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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { navigationModeEnum } from '@schema/testSettings';

const TestCreatorTestNavigation: FC = () => {
  const form = useFormContext();

  return (
    <TabsContent
      value="navigation"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="navigationMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Tryb nawigacji</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Wybierz tryb nawigacji" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {navigationModeEnum.enumValues.map((mode) => (
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
              Określ sposób poruszania się po teście
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allowGoBack"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-semibold">
                Pozwól na powrót do poprzednich pytań
              </FormLabel>
              <FormDescription>
                Uczestnik może wracać do wcześniejszych pytań
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
        name="confirmBeforeGroupChange"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-semibold">
                Potwierdzaj zmianę grupy
              </FormLabel>
              <FormDescription>
                Wymagaj potwierdzenia przed przejściem do następnej grupy pytań
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
    </TabsContent>
  );
};

export default TestCreatorTestNavigation;
