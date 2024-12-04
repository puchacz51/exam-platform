import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TestAccessFormValues } from '@/app/[locale]/(dashboard)/test-assignment/schema/TestAccessSchema';

export const LimitsSection = () => {
  const { control } = useFormContext<TestAccessFormValues>();

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={control}
        name="timeLimit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time Limit (minutes)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
