import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TestAccessFormValues } from '@/app/[locale]/(dashboard)/test-assignment/schema/TestAccessSchema';
import { Group } from '@/types/group/group';
import { MultiGroupSelection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/MultiGroupSelection';

interface AccessTypeSectionProps {
  initialGroups?: Group[];
}

export const AccessTypeSection = ({
  initialGroups,
}: AccessTypeSectionProps) => {
  const { control, watch } = useFormContext<TestAccessFormValues>();
  const accessType = watch('accessType');

  return (
    <>
      <FormField
        control={control}
        name="accessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Access Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select access type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="CODE">Access Code</SelectItem>
                <SelectItem value="GROUP">Group Access</SelectItem>
                <SelectItem value="EMAIL">Access Code + Group</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {accessType !== 'GROUP' && (
        <FormField
          control={control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter access code"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      {accessType !== 'CODE' && (
        <div className="mt-4">
          <MultiGroupSelection initialGroups={initialGroups || []} />
        </div>
      )}
    </>
  );
};
