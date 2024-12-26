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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { NumericGroupQuestion } from '@/types/test-creator/question';
import { generateId } from '@/utils/generateId';

const NumericGroupQuestionForm = () => {
  const t = useTranslations('testCreator.questions.numericGroup');
  const form = useFormContext<NumericGroupQuestion>();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subQuestions',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        id: generateId(),
        text: '',
        correctAnswer: 0,
        numericTolerance: 0,
      });
      append({
        id: generateId(),
        text: '',
        correctAnswer: 0,
        numericTolerance: 0,
      });
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('mainQuestion')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('mainQuestionPlaceholder')}
                className="min-h-[120px] text-base"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center justify-between gap-2">
            <span>{t('subQuestions')}</span>
            <Button
              type="button"
              onClick={() =>
                append({
                  id: generateId(),
                  text: '',
                  correctAnswer: 0,
                  numericTolerance: 0,
                })
              }
              className="ml-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('addSubQuestion')}
            </Button>
          </CardTitle>
          {fields.length < 2 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{t('minSubQuestionsWarning')}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted font-medium">
                    {index + 1}
                  </span>
                  <FormField
                    control={control}
                    name={`subQuestions.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('subQuestionPlaceholder')}
                            className="text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">{t('deleteSubQuestion')}</span>
                    </Button>
                  )}
                </div>

                <div className="ml-12 grid grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name={`subQuestions.${index}.correctAnswer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('correctAnswer')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className="text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`subQuestions.${index}.numericTolerance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('tolerance')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.1"
                            placeholder={t('tolerancePlaceholder')}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className="text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {index < fields.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumericGroupQuestionForm;
