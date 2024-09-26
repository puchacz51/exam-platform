'use client';
import React, { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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

import { SingleChoiceQuestionForm } from './SingleChoiceQuestionForm';
import { OpenEndedQuestionForm } from './OpenQuestionForm';
import NumericQuestionForm from './NumericQuestionForm';

// export const questionsTable = pgTable('questions', {
//   id: serial('id').primaryKey(),
//   groupID: integer('group_id').references(() => questionGroupsTable.id),
//   text: text('text').notNull(),
//   questionType: questionTypeEnum('question_type').notNull(),
//   order: integer('order'),
//   isPublic: boolean('is_public').default(false),
//   categoryID: integer('category_id').references(() => categoriesTable.id),
// });

const questionTypeSchema = z.object({
  text: z.string().nonempty(),
  questionType: z.enum(questionTypeEnum.enumValues),
  isPublic: z.boolean(),
  categoryID: z.number().nullable(),
});
type QuestionType = z.infer<typeof questionTypeSchema>;

const TestCreatorQuestionsForm: FC = () => {
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
  ) => {};

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
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {questionType && (
        <FormProvider {...form}>{<SelectedQuestionForm />}</FormProvider>
      )}
    </>
  );
};

export default TestCreatorQuestionsForm;
