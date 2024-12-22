import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('dashboard.testAssignment');
  const { control, watch } = useFormContext<TestAccessFormValues>();
  const accessType = watch('accessType');

  return (
    <>
      <FormField
        control={control}
        name="accessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('accessType')}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectAccessType')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="CODE">{t('accessCode')}</SelectItem>
                <SelectItem value="GROUP">{t('groupAccess')}</SelectItem>
                <SelectItem value="EMAIL">{t('accessCodeGroup')}</SelectItem>
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
              <FormLabel>{t('accessCode')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('enterAccessCode')}
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
