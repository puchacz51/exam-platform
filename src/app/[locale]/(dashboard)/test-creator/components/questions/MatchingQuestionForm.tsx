import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { AlertCircle, ArrowRightLeft, Plus, Trash2 } from 'lucide-react';

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
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MatchingQuestion } from '@/types/test-creator/question';
import { generateId } from '@/utils/generateId';

const MatchingQuestionForm = () => {
  const form = useFormContext<MatchingQuestion>();
  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'matchingPairs',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ id: generateId(), key: '', value: '' });
      append({ id: generateId(), key: '', value: '' });
    }
  }, []);

  return (
    <>
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-gray-700">
              Treść pytania
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Wprowadź treść pytania..."
                className="min-h-[100px] resize-y bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Card className="border-t-4 border-t-blue-500">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <FormLabel className="text-lg font-medium text-gray-700">
                Pary do dopasowania
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    id: generateId(),
                    key: '',
                    value: '',
                  })
                }
                className="border-blue-200 bg-white hover:bg-gray-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj parę
              </Button>
            </div>
            {fields.length < 2 && (
              <Alert
                variant="destructive"
                className="mt-4"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Wymagane są co najmniej dwie pary do dopasowania
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:border-blue-200"
              >
                <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_max-content_1fr]">
                  <FormField
                    control={control}
                    name={`matchingPairs.${index}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-600">
                          Element {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Wprowadź pierwszy element..."
                            className="bg-gray-50 transition-colors focus:bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="hidden  md:block">
                    <div className="rounded-full bg-gray-100 p-2">
                      <ArrowRightLeft className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <FormField
                      control={control}
                      name={`matchingPairs.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-600">
                            Dopasowanie {index + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Wprowadź element do dopasowania..."
                              className="bg-gray-50 transition-colors focus:bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute -right-2 -top-2 h-8 w-8 border bg-white opacity-0 shadow-sm transition-opacity hover:bg-red-50 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Usuń parę</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MatchingQuestionForm;
