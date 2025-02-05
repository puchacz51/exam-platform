import React, { FC, HTMLAttributes } from 'react';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { questionTypeEnum } from '@schema/questions';
import {
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
import { Input } from '@/components/ui/input';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { SingleChoiceQuestionForm } from '@/app/[locale]/(dashboard)/test-creator/components/questions/SingleChoiceQuestionForm';
import { NumericQuestionForm } from '@/app/[locale]/(dashboard)/test-creator/components/questions/NumericQuestionForm';
import { MultipleChoiceQuestionForm } from '@/app/[locale]/(dashboard)/test-creator/components/questions/MultipleChoiceQuestionForm';
import { BooleanQuestionForm } from '@/app/[locale]/(dashboard)/test-creator/components/questions/BooleanQuestionForm';
import { OrderQuestionForm } from '@/app/[locale]/(dashboard)/test-creator/components/questions/OrderQuestionForm';
import MatchingQuestionForm from '@/app/[locale]/(dashboard)/test-creator/components/questions/MatchingQuestionForm';
// import OpenEndedQuestionForm from '@/app/[locale]/(dashboard)/test-creator/components/questions/OpenQuestionForm';
import BooleanGroupQuestionForm from '@/app/[locale]/(dashboard)/test-creator/components/questions/BooleanGroupQuestionForm';
import NumericGroupQuestionForm from '@/app/[locale]/(dashboard)/test-creator/components/questions/NumericGroupQuestionForm';
import { cn } from '@/lib/utils';
import { QuestionType } from '@/types/test-creator/answers';
import { Button } from '@/components/ui/button';

interface TestCreatorQuestionsFormProps
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit: (data: QuestionType) => void;
}

const TestCreatorQuestionsForm: FC<TestCreatorQuestionsFormProps> = ({
  className,
  ...props
}) => {
  const t = useTranslations('testCreator.questions');
  const { categories } = useTestContext((state) => state.testConfiguration);

  const form = useFormContext<QuestionType>();
  const { control, watch, handleSubmit } = form;
  const questionType = watch('questionType');

  const SelectedQuestionForm = (() => {
    switch (questionType) {
      case 'SINGLE_CHOICE':
        return SingleChoiceQuestionForm;
      // case 'OPEN':
      //   return OpenEndedQuestionForm;
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
    <form
      onSubmit={handleSubmit(props.handleSubmit)}
      className={cn('space-y-6', className)}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="questionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {t('questionType')}
              </FormLabel>
              <Select
                key={`${!!field.value}`}
                value={field.value}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t('selectQuestionType')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {questionTypeEnum.enumValues.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                    >
                      {t(
                        `types.${type.toLowerCase()}` as 'types.single_choice'
                      )}
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
                {t('points')}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min={0}
                  step={1}
                  placeholder={t('enterPoints')}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-500">
                {t('pointsDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              {t('category')}
            </FormLabel>
            <Select
              key={`${!!field.value}`}
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={t('categoryDescription')} />
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
              {t('categoryDescription')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {questionType && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <SelectedQuestionForm />
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        {t('createQuestion')}
      </Button>
    </form>
  );
};

export default TestCreatorQuestionsForm;
