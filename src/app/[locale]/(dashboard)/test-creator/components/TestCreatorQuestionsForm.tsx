import React, { FC, useEffect } from 'react';

import { randomBytes } from 'crypto';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown, ChevronUp, HelpCircle, Save } from 'lucide-react';

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
import MatchingQuestionForm from './questions/MatchingQuestionForm';
import BooleanGroupQuestionForm from './questions/BooleanGroupQuestionForm';
import NumericGroupQuestionForm from './questions/NumericGroupQuestionForm';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );
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
    // setCurrentQuestion(currentQuestionGroupId, null);
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
      case 'MATCHING':
        return MatchingQuestionForm;
      case 'BOOLEAN_GROUP':
        return BooleanGroupQuestionForm;
      case 'NUMERIC_GROUP':
        return NumericGroupQuestionForm;

      default:
        return React.Fragment;
    }
  })();

  return (
    <Card
      className={cn(
        'overflow-hidden border-t-4 border-t-blue-500 p-6 shadow-lg',
        className
      )}
    >
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Question
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 cursor-help text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">
                  Create and configure your test question here. Choose the type,
                  set points, and add your content.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          onClick={() =>
            setIsQuestionConfiguratorOpen(!isQuestionConfiguratorOpen)
          }
          variant="ghost"
          size="sm"
          className="hover:bg-gray-100"
        >
          {isQuestionConfiguratorOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {isQuestionConfiguratorOpen && (
        <div className="duration-300 animate-in slide-in-from-top">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleQuestionTypeSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Question Type
                      </FormLabel>
                      <Select
                        key={`${!!field.value}`}
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select question type" />
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Points
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          min={0}
                          step={1}
                          placeholder="Enter points"
                          className="bg-white"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Specify points for correct answer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Public Question
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Check if this question should be publicly available
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Category
                    </FormLabel>
                    <Select
                      key={`${!!field.value}`}
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select category" />
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
                    <FormDescription className="text-xs text-gray-500">
                      Choose a category for your test
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType && (
                <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <FormProvider {...form}>
                    <SelectedQuestionForm />
                  </FormProvider>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
              >
                <Save className="mr-2 h-4 w-4" /> Save Question
              </Button>
            </form>
          </Form>
        </div>
      )}
    </Card>
  );
};

export default TestCreatorQuestionsForm;
