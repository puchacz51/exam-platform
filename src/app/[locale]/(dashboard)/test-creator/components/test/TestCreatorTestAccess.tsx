'use client';

import { FC } from 'react';

import { useFormContext } from 'react-hook-form';
import { Users } from 'lucide-react';

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
import { testAccessTypeEnum } from '@schema/testAccess';

const TestCreatorTestAccess: FC = () => {
  const form = useFormContext();

  return (
    <TabsContent
      value="access"
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="accessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Typ dostępu</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Wybierz typ dostępu" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {testAccessTypeEnum.enumValues.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Określ sposób dostępu do testu</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('accessType') === 'CODE' && (
        <FormField
          control={form.control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Kod dostępu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Wprowadź kod dostępu"
                  className="border-gray-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Kod będzie wymagany do rozpoczęcia testu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </TabsContent>
  );
};

export default TestCreatorTestAccess;
