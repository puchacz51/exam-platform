'use client';

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';
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
import { OptionsSection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/OptionsSection';
import { Group } from '@/types/group/group';
import { CompleteTest } from '@/types/test/test';
import { MultiGroupSelection } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/MultiGroupSelection';
import { TestPreview } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/TestPreview';
import { createTestAssignmentAction } from '@actions/test-assigment/createTestAssignment';

interface TestAccessFormProps {
  initialGroups: Group[];
  test?: CompleteTest | null;
  hideTestSelection?: boolean;
}

export const TestAccessForm = ({
  initialGroups,
  test: initialTest,
  hideTestSelection = false,
}: TestAccessFormProps) => {
  const { toast } = useToast();
  const { data: tests = [], isLoading } = useTests();

  const [selectedTest, setSelectedTest] = useState<CompleteTest | null>(
    initialTest ?? null
  );

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

  const router = useRouter();

  async function onSubmit(data: TestAccessFormValues) {
    if (!selectedTest && !hideTestSelection) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a test first',
      });
      return;
    }

    const result = await createTestAssignmentAction(
      selectedTest?.id || initialTest?.id || '',
      data
    );

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Test assignment created successfully',
      });
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to create test assignment',
      });
    }
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
              {!hideTestSelection && !isLoading && tests && (
                <Select
                  onValueChange={(value) => {
                    const test = tests?.find((t) => t.id === value);
                    setSelectedTest(test || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test" />
                  </SelectTrigger>
                  <SelectContent>
                    {tests.map((test) => (
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
                  <MultiGroupSelection initialGroups={initialGroups} />
                  <AccessTypeSection initialGroups={initialGroups} />
                  <DateTimeSection />
                  <LimitsSection />
                  <OptionsSection />
                  <Button type="submit">Save Settings</Button>
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
