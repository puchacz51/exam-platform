'use client';

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useToast } from '@/hooks/useToast';
import { useTests } from '@/hooks/useTests';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  testAccessFormSchema,
  TestAccessFormValues,
} from '@/app/[locale]/(dashboard)/test-assignment/schema/TestAccessSchema';
import { AccessTypeSection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/AccessTypeSection';
import { DateTimeSection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/DateTimeSection';
import { LimitsSection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/LimitsSection';
import { TestPreview } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/TestPreview';
import { createTestAssignmentAction } from '@actions/test-assigment/createTestAssignment';
import { OwnedTest } from '@actions/test/getAllTests';
import { CompleteTest } from '@/types/test/test';
import { UserGroups } from '@actions/groups/getGroup';

interface TestAccessFormProps {
  initialGroups?: NonNullable<UserGroups['data']>;
  test?: OwnedTest | CompleteTest | null;
  hideTestSelection?: boolean;
}

export const TestAccessForm = ({
  initialGroups = [],
  test: initialTest,
  hideTestSelection = false,
}: TestAccessFormProps) => {
  const t = useTranslations('dashboard.testAssignment');
  const { toast } = useToast();
  const { data, isLoading } = useTests();
  const [selectedTest, setSelectedTest] = useState<
    OwnedTest | CompleteTest | null
  >(initialTest ?? null);
  const methods = useForm<TestAccessFormValues>({
    resolver: zodResolver(testAccessFormSchema),
    defaultValues: {
      accessType: 'CODE',
      accessCode: '',
      groupIds: [],
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 86400000),
      startTime: '00:00',
      endTime: '23:59',
      teamsIds: [],
    },
  });

  const router = useRouter();

  async function onSubmit(data: TestAccessFormValues) {
    if (!selectedTest && !hideTestSelection) {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('pleaseSelectTest'),
      });
      return;
    }

    const result = await createTestAssignmentAction(
      selectedTest?.id || initialTest?.id || '',
      data
    );

    if (result.success) {
      toast({
        title: t('success'),
        description: t('testAssignmentCreated'),
      });

      methods.reset();
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: result.error || t('failedToCreateTestAssignment'),
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('testAccessSettings')}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {!hideTestSelection && !isLoading && data && (
                <Select
                  onValueChange={(value) => {
                    const test = data.tests?.find((t) => t.id === value);
                    setSelectedTest(test || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectTest')} />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.tests?.map((test) => (
                      <SelectItem
                        key={test.id}
                        value={test.id}
                      >
                        {test.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {(selectedTest || hideTestSelection) && (
                <div className="space-y-6">
                  <AccessTypeSection initialGroups={initialGroups || []} />
                  <DateTimeSection />
                  <LimitsSection />
                  <Button type="submit">{t('saveSettings')}</Button>
                  {selectedTest && <TestPreview test={selectedTest} />}
                </div>
              )}
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
