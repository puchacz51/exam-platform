import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { TestCreatorQuestion } from '@/types/test-creator/question';
import { generateId } from '@/utils/generateId';

export const MultipleChoiceQuestionForm = () => {
  const form = useFormContext<TestCreatorQuestion>();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'answers',
  });

  useEffect(() => {
    if (!fields.length) {
      append({ id: generateId(), text: '', isCorrect: false });
    }
  }, []);

  return (
    <Form {...form}>
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
                    name={`answers.${index}.isCorrect`}
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
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
              onClick={() => append({ 
                id: generateId(), 
                text: '', 
                isCorrect: false 
              })}
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Dodaj odpowiedź
            </Button>
          </CardContent>
        </Card>
        <FormField
          name="answers"
          control={control}
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default MultipleChoiceQuestionForm;
