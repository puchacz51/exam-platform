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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { BooleanQuestion } from '@/types/test-creator/question';

export const BooleanQuestionForm = () => {
  const form = useFormContext<BooleanQuestion>();
  const { control } = form;
  const t = useTranslations('testCreator.questions.boolean');

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={control}
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
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('correctAnswer')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={String(field.value)}
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="true"
                        />
                        <FormLabel
                          htmlFor="true"
                          className="cursor-pointer"
                        >
                          {t('true')}
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="false"
                        />
                        <FormLabel
                          htmlFor="false"
                          className="cursor-pointer"
                        >
                          {t('false')}
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};

export default BooleanQuestionForm;
