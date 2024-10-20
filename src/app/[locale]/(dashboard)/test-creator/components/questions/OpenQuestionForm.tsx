import React from 'react';

import { useFormContext } from 'react-hook-form';

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

import { TestCreatorQuestion } from '../../types/question';

const OpenEndedQuestionForm = () => {
  const form = useFormContext<TestCreatorQuestion>();

  return (
    <Form {...form}>
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
    </Form>
  );
};

export default OpenEndedQuestionForm;
