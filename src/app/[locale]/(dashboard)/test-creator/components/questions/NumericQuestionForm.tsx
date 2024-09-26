import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save } from 'lucide-react';

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
import { Card, CardContent } from '@/components/ui/card';

const numericQuestionSchema = z.object({
  text: z.string().min(1, 'Treść pytania jest wymagana'),
  correctAnswer: z.number({
    required_error: 'Poprawna odpowiedź jest wymagana',
    invalid_type_error: 'Poprawna odpowiedź musi być liczbą',
  }),
  tolerance: z
    .number({
      required_error: 'Tolerancja jest wymagana',
      invalid_type_error: 'Tolerancja musi być liczbą',
    })
    .min(0, 'Tolerancja nie może być ujemna'),
});

export const NumericQuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(numericQuestionSchema),
    defaultValues: {
      text: '',
      correctAnswer: undefined,
      tolerance: 0,
    },
  });

  const handleSubmit = (data: z.infer<typeof numericQuestionSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <Card>
          <CardContent className="pt-6">
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
                  <FormLabel>Poprawna odpowiedź</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Wprowadź poprawną odpowiedź numeryczną"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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
                  <FormLabel>Tolerancja</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Wprowadź tolerancję (np. 0.1)"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" /> Zapisz pytanie
        </Button>
      </form>
    </Form>
  );
};

export default NumericQuestionForm;
