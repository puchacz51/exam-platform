import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { NumericQuestion } from '../../schemas/questionTypeSchema';

export const NumericQuestionForm = () => {
  const form = useFormContext<NumericQuestion>();

  return (
    <>
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default NumericQuestionForm;
