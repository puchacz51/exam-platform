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
    handleSubmit,
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
      append({ text: '', isCorrect: false });
      append({ text: '', isCorrect: false });
    }
  }, []);

  const onSubmit = (data: OpenQuestion) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
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
          <div className="mb-4">
            <FormLabel>Odpowiedzi</FormLabel>
            {fields.length < 2 && (
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
            {fields.filter((field) => field.isCorrect).length !== 1 &&
              fields.length >= 2 && (
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
    </form>
  );
};

export default SingleChoiceQuestionForm;
