import React, { FC, useEffect } from 'react';

import { randomBytes } from 'crypto';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { questionTypeEnum } from '../schemas/questionSchema';
import { useTestContext } from '../store/storeContext';
import {
  QuestionType,
  questionTypeSchema,
} from '../schemas/questionTypeSchema';
import SingleChoiceQuestionForm from './questions/SingleChoiceQuestionForm';
import OpenEndedQuestionForm from './questions/OpenQuestionForm';
import NumericQuestionForm from './questions/NumericQuestionForm';
import MultipleChoiceQuestionForm from './questions/MultipleChoiceQuestionForm';
import BooleanQuestionForm from './questions/BooleanQuestionForm';
import { TestCreatorQuestion } from '../types/question';
import OrderQuestionForm from './questions/OrderQuestionForm';

const initialQuestion = {
  text: '',
  isPublic: false,
  points: 1, // Default value for points
};
interface TestCreatorQuestionsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TestCreatorQuestionsForm: FC<TestCreatorQuestionsFormProps> = ({
  className,
}) => {
  const isQuestionConfiguratorOpen = useTestContext(
    (state) => state.isQuestionConfiguratorOpen
  );
  const setIsQuestionConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionConfiguratorOpen
  );
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const addQuestion = useTestContext((state) => state.addQuestion);
  const { categories } = useTestContext((state) => state.testConfiguration);
  const updateQuestion = useTestContext((state) => state.updateQuestion);

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: currentQuestion ? currentQuestion : { ...initialQuestion },
    shouldUnregister: true,
  });

  const { control, watch } = form;
  const { questionType } = watch();

  useEffect(() => {
    if (currentQuestion) {
      form.reset(currentQuestion);
    }
  }, [currentQuestion]);

  const handleQuestionTypeSubmit = (
    data: z.infer<typeof questionTypeSchema>
  ) => {
    if (!currentQuestionGroupId) return;

    if (currentQuestion) {
      updateQuestion(currentQuestionGroupId, currentQuestion.id, data);
      form.reset({ ...initialQuestion });
      return;
    }

    const questionId = randomBytes(16).toString('hex');
    const questionWithId: TestCreatorQuestion = {
      ...data,
      id: questionId,
      groupId: currentQuestionGroupId,
    };

    addQuestion(questionWithId);
    form.reset({ ...initialQuestion });
  };

  const SelectedQuestionForm = (() => {
    switch (questionType) {
      case 'SINGLE_CHOICE':
        return SingleChoiceQuestionForm;
      case 'OPEN':
        return OpenEndedQuestionForm;
      case 'NUMERIC':
        return NumericQuestionForm;
      case 'MULTIPLE_CHOICE':
        return MultipleChoiceQuestionForm;
      case 'BOOLEAN':
        return BooleanQuestionForm;
      case 'ORDER':
        return OrderQuestionForm;
      default:
        return React.Fragment;
    }
  })();

  return (
    <Card className={cn('p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pytanie</h2>
        <Button
          onClick={() =>
            setIsQuestionConfiguratorOpen(!isQuestionConfiguratorOpen)
          }
          variant="ghost"
          size="sm"
        >
          {isQuestionConfiguratorOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isQuestionConfiguratorOpen && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleQuestionTypeSubmit)}
              className="space-y-8"
            >
              <FormField
                control={control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ pytania</FormLabel>
                    <Select
                      key={`${!!field.value}`}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
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
                control={control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Punkty</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        min={0}
                        step={1}
                        placeholder="Liczba punktów"
                      />
                    </FormControl>
                    <FormDescription>
                      Określ liczbę punktów za poprawną odpowiedź
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
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
                        Zaznacz, jeśli pytanie ma być publiczne.
                      </FormDescription>
                    </div>
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
                      key={`${!!field.value}`}
                      value={field.value}
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
                    <FormDescription>
                      Wybierz kategorię dla swojego testu.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType && (
                <div className="mt-6">
                  <FormProvider {...form}>
                    <SelectedQuestionForm />
                  </FormProvider>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" /> Zapisz pytanie
              </Button>
            </form>
          </Form>
        </>
      )}
    </Card>
  );
};

export default TestCreatorQuestionsForm;
