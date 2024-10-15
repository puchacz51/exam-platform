'use client';
import React, { FC, HTMLAttributes } from 'react';

import { randomBytes } from 'crypto';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { questionTypeEnum } from '@schema/questions';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { SingleChoiceQuestionForm } from './SingleChoiceQuestionForm';
import { OpenEndedQuestionForm } from './OpenQuestionForm';
import NumericQuestionForm from './NumericQuestionForm';
import { useTestContext } from '../../store/storeContext';
import { questionTypeSchema } from '../../schemas/questionTypeSchema';
import { TestCreatorQuestion } from '../../types/question';

export type QuestionType = z.infer<typeof questionTypeSchema>;

interface TestCreatorQuestionsFormProps
  extends HTMLAttributes<HTMLDivElement> {}

const TestCreatorQuestionsForm: FC<TestCreatorQuestionsFormProps> = ({
  className,
}) => {
  const isQuestionConfiguratorOpen = useTestContext(
    (state) => state.isQuestionConfiguratorOpen
  );
  const setIsQuestionConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionConfiguratorOpen
  );
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroup
  );
  const addQuestion = useTestContext((state) => state.addQuestion);
  const { categories } = useTestContext((state) => state.testConfiguration);
  const form = useForm<QuestionType>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: {
      text: '',
      isPublic: false,
    },
  });
  const { control, watch } = form;
  const { questionType } = watch();

  const handleQuestionTypeSubmit = (
    data: z.infer<typeof questionTypeSchema>
  ) => {
    const questionId = randomBytes(16).toString('hex');
    const questionWithId: TestCreatorQuestion = {
      ...data,
      id: questionId,
      groupId: currentQuestionGroup?.id,
    };

    addQuestion(questionWithId, currentQuestionGroup?.id);

    form.reset();
  };

  const SelectedQuestionForm = (() => {
    switch (questionType) {
      case 'SINGLE_CHOICE':
        return SingleChoiceQuestionForm;
      case 'OPEN':
        return OpenEndedQuestionForm;
      case 'NUMERIC':
        return NumericQuestionForm;
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
                Zapisz pytanie
              </Button>
            </form>
          </Form>
        </>
      )}
    </Card>
  );
};

export default TestCreatorQuestionsForm;
