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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const openEndedSchema = z.object({
  text: z.string().min(1, 'Treść pytania jest wymagana'),
  correctAnswer: z
    .string()
    .min(1, 'Przykładowa poprawna odpowiedź jest wymagana'),
});

export const OpenEndedQuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(openEndedSchema),
    defaultValues: {
      text: '',
      correctAnswer: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof openEndedSchema>) => {
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
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Przykładowa poprawna odpowiedź</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Wprowadź przykładową poprawną odpowiedź"
                      className="min-h-[100px]"
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

export default OpenEndedQuestionForm;
