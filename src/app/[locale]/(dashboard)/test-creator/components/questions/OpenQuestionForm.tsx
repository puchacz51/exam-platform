import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { OpenQuestion } from '@/types/test-creator/question';

const OpenEndedQuestionForm = () => {
  const t = useTranslations('testCreator.questions.open');
  const form = useFormContext<OpenQuestion>();

  return (
    <Form {...form}>
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
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sampleAnswer')}</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    placeholder={t('sampleAnswerPlaceholder')}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </Form>
  );
};

export default OpenEndedQuestionForm;
