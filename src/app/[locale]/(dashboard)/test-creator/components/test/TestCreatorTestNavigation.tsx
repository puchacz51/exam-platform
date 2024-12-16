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
import { TestCreatorTest } from '@/types/test-creator/test';

const TestCreatorTestNavigation: FC = () => {
  const form = useFormContext<TestCreatorTest>();

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
    </TabsContent>
  );
};

export default TestCreatorTestNavigation;
