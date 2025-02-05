import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

import { generateId } from '@/utils/generateId';
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
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { BooleanGroupQuestion } from '@/types/test-creator/question';

const BooleanGroupQuestionForm = () => {
  const t = useTranslations('testCreator.questions.booleanGroup');
  const form = useFormContext<BooleanGroupQuestion>();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subQuestions',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ id: generateId(), text: '', correctAnswer: false });
      append({ id: generateId(), text: '', correctAnswer: false });
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              {t('mainQuestion')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('mainQuestionPlaceholder')}
                className="min-h-[120px] text-base"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card className="px-0">
        <CardHeader>
          <CardTitle className="flex w-full flex-wrap items-center justify-between gap-2">
            <span>{t('subQuestions')}</span>
            <Button
              type="button"
              onClick={() =>
                append({
                  id: generateId(),
                  text: '',
                  correctAnswer: false,
                })
              }
              className="ml-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('addSubQuestion')}
            </Button>
          </CardTitle>
          {fields.length < 2 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{t('minSubQuestionsWarning')}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex flex-col items-center gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted font-medium">
                    {index + 1}
                  </span>
                  <div className="flex w-full flex-grow flex-col items-center gap-4 md:flex-row">
                    <FormField
                      control={control}
                      name={`subQuestions.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full flex-grow">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Wprowadź treść podpytania..."
                              className="text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`subQuestions.${index}.correctAnswer`}
                      render={({ field }) => (
                        <FormItem className="flex min-w-[120px] items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium">
                            {field.value ? 'Prawda' : 'Fałsz'}
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {fields.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Usuń podpytanie</span>
                      </Button>
                    )}
                  </div>
                </div>
                {index < fields.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BooleanGroupQuestionForm;
