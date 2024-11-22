'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  testAccessFormSchema,
  TestAccessFormValues,
} from '@/app/[locale]/(dashboard)/test-assigment/schema/TestAccessSchema';
import { AccessTypeSection } from '@/app/[locale]/(dashboard)/test-assigment/components/TestAccessForm/AccessTypeSection';
import { DateTimeSection } from '@/app/[locale]/(dashboard)/test-assigment/components/TestAccessForm/DateTimeSection';
import { LimitsSection } from '@/app/[locale]/(dashboard)/test-assigment/components/TestAccessForm/LimitsSection';
import { OptionsSection } from '@/app/[locale]/(dashboard)/test-assigment/components/TestAccessForm/OptionsSection';
import { Group } from '@/types/group/group';

interface TestAccessFormProps {
  initialGroups: Group[];
}

export const TestAccessForm = ({ initialGroups }: TestAccessFormProps) => {
  const methods = useForm<TestAccessFormValues>({
    resolver: zodResolver(testAccessFormSchema),
    defaultValues: {
      accessType: 'CODE',
      accessCode: '',
      groupIds: [],
      startTime: undefined,
      endTime: undefined,
      requiresRegistration: true,
      showResultsAfterSubmission: true,
    },
  });

  async function onSubmit(data: TestAccessFormValues) {
    const submitData: TestAccessFormValues = {
      ...data,
      // Remove temporary form fields
      startTime: undefined,
      endTime: undefined,
    };
    console.log(submitData);
    // TODO: Implement form submission
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Access Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <AccessTypeSection initialGroups={initialGroups} />
              <DateTimeSection />
              <LimitsSection />
              <OptionsSection />
              <Button type="submit">Save Settings</Button>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
