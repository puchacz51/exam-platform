import React from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
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

const singleChoiceSchema = z.object({
  text: z.string().min(1, 'Treść pytania jest wymagana'),
  answers: z
    .array(
      z.object({
        text: z.string().min(1, 'Treść odpowiedzi jest wymagana'),
      })
    )
    .min(2, 'Wymagane są co najmniej dwie odpowiedzi'),
  correctAnswerIndex: z.number().min(0, 'Wybierz poprawną odpowiedź'),
});

export const SingleChoiceQuestionForm = () => {
  const form = useFormContext();
  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'answers',
  });

  const saveQuestion = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(saveQuestion)}
        className="space-y-6"
      >
        <Card>
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormLabel className="mb-4 block">Odpowiedzi</FormLabel>
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
                    control={control}
                    name="correctAnswerIndex"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            value={field.value?.toString()}
                          >
                            <RadioGroupItem value={index.toString()} />
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {index > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ text: '' })}
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Dodaj odpowiedź
            </Button>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
        >
          Zapisz pytanie
        </Button>
      </form>
    </Form>
  );
};

export default SingleChoiceQuestionForm;