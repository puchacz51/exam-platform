import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { NumericQuestion } from '@/types/test-creator/question';

export const NumericQuestionForm = () => {
  const form = useFormContext<NumericQuestion>();
  const t = useTranslations('testCreator.questions.numeric');

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('questionContent')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t('questionPlaceholder')}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('correctAnswer')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder={t('correctAnswerPlaceholder')}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tolerance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('tolerance')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder={t('tolerancePlaceholder')}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default NumericQuestionForm;
