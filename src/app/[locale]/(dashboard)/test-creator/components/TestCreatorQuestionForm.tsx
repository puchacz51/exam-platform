'use client';
import React, { FC } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { questionTypeEnum } from '@schema/questions';

import { useTestContext } from '../store/storeContext';

const questionSchema = z.object({
  text: z.string().min(1, 'Treść pytania jest wymagana'),
  questionTypeId: z.string().min(1, 'Typ pytania jest wymagany'),
  isPublic: z.boolean().default(false),
  categoryId: z.string().min(1, 'Kategoria jest wymagana'),
  answers: z
    .array(
      z.object({
        text: z.string().min(1, 'Treść odpowiedzi jest wymagana'),
        isCorrect: z.boolean().default(false),
      })
    )
    .min(1, 'Przynajmniej jedna odpowiedź jest wymagana'),
});

interface TestCreatorQuestionFormProps {
  onSubmit: (data: z.infer<typeof questionSchema>) => void;
}

const TestCreatorQuestionForm: FC<TestCreatorQuestionFormProps> = ({
  onSubmit,
}) => {
  const { categories } = useTestContext((state) => state.testConfiguration);
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: '',
      questionTypeId: '',
      isPublic: false,
      categoryId: '',
      answers: [{ text: '', isCorrect: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  const handleSubmit = (data: z.infer<typeof questionSchema>) => {
    onSubmit(data);
    form.reset(); // Reset the form after submitting
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md border p-4"
          >
            <h2 className="mb-2 text-xl font-semibold">Pytanie {index + 1}</h2>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treść pytania</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Wprowadź treść pytania"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ pytania</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ pytania" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {questionTypeEnum.enumValues.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publiczne</FormLabel>
                    <FormDescription>
                      Zaznacz, jeśli to pytanie ma być publiczne.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold">Odpowiedzi</h3>
              {form.watch('answers')?.map((_, answerIndex) => (
                <div
                  key={answerIndex}
                  className="mt-2 flex items-center space-x-2"
                >
                  <FormField
                    control={form.control}
                    name={`answers.${answerIndex}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Odpowiedź ${answerIndex + 1}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`answers.${answerIndex}.isCorrect`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Poprawna</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const answers = form.getValues('answers');
                      if (answers.length > 1) {
                        form.setValue(
                          'answers',
                          answers.filter((_, i) => i !== answerIndex)
                        );
                      }
                    }}
                  >
                    Usuń
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const answers = form.getValues('answers') || [];
                  form.setValue('answers', [
                    ...answers,
                    { text: '', isCorrect: false },
                  ]);
                }}
                className="mt-2"
              >
                Dodaj odpowiedź
              </Button>
            </div>

            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="mt-4"
              >
                Usuń pytanie
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            append({
              text: '',
              isCorrect: false,
            })
          }
        >
          Dodaj pytanie
        </Button>

        <Button type="submit">Zapisz pytania</Button>
      </form>
    </Form>
  );
};

export default TestCreatorQuestionForm;
