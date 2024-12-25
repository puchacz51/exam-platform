import React, { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OpenQuestion } from '@/types/test-creator/question';
import { generateId } from '@/utils/generateId';

export const SingleChoiceQuestionForm = () => {
  const t = useTranslations('testCreator.questions.multipleChoice');
  const form = useFormContext<OpenQuestion>();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const handleCorrectAnswerSelection = (index: number) => {
    getValues().answers?.forEach((_, i) => {
      setValue(`answers.${i}.isCorrect`, i === index, { shouldValidate: true });
    });
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ id: generateId(), text: '', isCorrect: false });
      append({ id: generateId(), text: '', isCorrect: false });
    }
  }, []);

  return (
    <>
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
          <div className="mb-4">
            <FormLabel>{t('answers')}</FormLabel>
            {fields.length < 2 && (
              <Alert
                variant="destructive"
                className="mt-2"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{t('minAnswersWarning')}</AlertDescription>
              </Alert>
            )}
            {fields.filter((field) => field.isCorrect).length !== 1 &&
              fields.length >= 2 && (
                <Alert className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t('selectOneCorrectAnswer')}
                  </AlertDescription>
                </Alert>
              )}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center space-x-4"
              >
                <FormField
                  control={control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('answerPlaceholder', { number: index + 1 })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`answers.${index}.isCorrect`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value ? 'true' : 'false'}
                          onValueChange={() =>
                            handleCorrectAnswerSelection(index)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="true"
                              id={`correct-${index}`}
                            />
                            <FormLabel
                              htmlFor={`correct-${index}`}
                              className="text-sm text-muted-foreground"
                            >
                              {t('correctAnswer')}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t('deleteAnswer')}</span>
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                id: generateId(),
                text: '',
                isCorrect: false,
              })
            }
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('addAnswer')}
          </Button>
        </CardContent>
      </Card>

      {errors?.answers && (
        <FormField
          name="answers"
          control={control}
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default SingleChoiceQuestionForm;
