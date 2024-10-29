import React, { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

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

import { OpenQuestion } from '../../schemas/questionTypeSchema';

export const SingleChoiceQuestionForm = () => {
  const form = useFormContext<OpenQuestion>();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'answers',
  });

  useEffect(() => {
    if (!fields.length) {
      append({ text: '', isCorrect: false });
      append({ text: '', isCorrect: false });
    }
  }, [append, fields.length]);

  const correctAnswerCount = fields.filter((field) => field.isCorrect).length;
  const hasMinimumAnswers = fields.length >= 2;
  const hasOneCorrectAnswer = correctAnswerCount === 1;

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Treść pytania</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Wprowadź treść pytania"
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <FormLabel>Odpowiedzi</FormLabel>
            {!hasMinimumAnswers && (
              <Alert
                variant="destructive"
                className="mt-2"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Wymagane są co najmniej dwie odpowiedzi
                </AlertDescription>
              </Alert>
            )}
            {!hasOneCorrectAnswer && fields.length >= 2 && (
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Wybierz dokładnie jedną poprawną odpowiedź
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
                          placeholder={`Odpowiedź ${index + 1}`}
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
                          onValueChange={(value) => {
                            // Clear all other correct answers
                            getValues()?.answers?.forEach((_, i) => {
                              setValue(`answers.${i}.isCorrect`, false, {
                                shouldValidate: true,
                              });
                            });
                            // Set new correct answer
                            setValue(
                              `answers.${index}.isCorrect`,
                              value === 'true',
                              {
                                shouldValidate: true,
                              }
                            );
                          }}
                          value={field.value ? 'true' : 'false'}
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
                              Poprawna
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
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
                    <span className="sr-only">Usuń odpowiedź</span>
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ text: '', isCorrect: false })}
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            Dodaj odpowiedź
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
    </div>
  );
};

export default SingleChoiceQuestionForm;
