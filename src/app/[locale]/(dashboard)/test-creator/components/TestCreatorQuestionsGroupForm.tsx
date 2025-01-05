import { FC, HTMLAttributes, useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { questionGroupSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionsGroup';
import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

interface TestCreatorQuestionGroupFormProps
  extends HTMLAttributes<HTMLDivElement> {}

export const TestCreatorQuestionGroupForm: FC<
  TestCreatorQuestionGroupFormProps
> = ({ className }) => {
  const t = useTranslations('testCreator.modals.groupSettings');
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const questionGroups = useTestContext((state) => state.questionGroups);
  const updateQuestionGroup = useTestContext(
    (state) => state.updateQuestionGroup
  );
  const setIsQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionGroupConfiguratorOpen
  );
  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );

  const form = useForm<TestCreatorQuestionGroup>({
    resolver: zodResolver(questionGroupSchema),
    defaultValues: {
      id: currentQuestionGroup?.id,
      name: currentQuestionGroup?.name,
      order: currentQuestionGroup?.order,
    },
  });

  useEffect(() => {
    form.reset({
      id: currentQuestionGroup?.id,
      name: currentQuestionGroup?.name,
      order: currentQuestionGroup?.order,
    });
  }, [currentQuestionGroup]);

  const onSubmit = (data: TestCreatorQuestionGroup) => {
    updateQuestionGroup(data);
    setIsQuestionGroupConfiguratorOpen(false);
  };

  return (
    <Card className={cn('relative w-full', className)}>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <Button
          className="absolute right-2 top-2"
          onClick={() => setIsQuestionGroupConfiguratorOpen(false)}
        >
          {t('cancel')}
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('groupName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('namePlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('order')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
            >
              {t('save')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TestCreatorQuestionGroupForm;
