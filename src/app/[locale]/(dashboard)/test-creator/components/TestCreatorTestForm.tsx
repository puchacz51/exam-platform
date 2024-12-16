import React, { FC, HTMLAttributes, useState } from 'react';

import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Eye, Layout, Medal, Save, Settings2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCreatorTestScoring from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestScoring';
import TestCreatorTestBasic from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestBasic';
import TestCreatorTestNavigation from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestNavigation';
import TestCreatorTestDisplay from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestDisplay';
import TestCreatorTestResults from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestResults';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { TestCreatorTest } from '@/types/test-creator/test';
import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';

const TestCreatorForm: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const test = useTestContext((state) => state.test);
  const isAddedGeneralConfiguration = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );

  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);
  const setIsTestConfiguratorOpen = useTestContext(
    (state) => state.setIsTestConfiguratorOpen
  );
  const setTest = useTestContext((state) => state.setTest);
  const setIsAddedGeneralConfiguration = useTestContext(
    (state) => state.setIsAddedGeneralConfiguration
  );

  const [activeTab, setActiveTab] = useState('basic');

  const form = useForm<TestCreatorTest>({
    defaultValues: {
      ...test,
    },
    resolver: zodResolver(testSchema),
  });

  const handleSubmit: SubmitHandler<TestCreatorTest> = (data) => {
    if (!isAddedGeneralConfiguration) {
      addQuestionGroup();
    }
    setIsAddedGeneralConfiguration(true);
    setTest(data);
    setIsTestConfiguratorOpen(false);
  };

  return (
    <Card className={cn('bg-white shadow-lg', className)}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <CardTitle>Konfiguracja testu</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative mx-auto mb-4 w-full overflow-x-auto sm:mb-6">
            <TabsList className="flex h-max w-max items-center gap-2 xl:w-full xl:justify-center [&>*]:flex-shrink-0">
              <TabsTrigger
                value="basic"
                className="flex items-center justify-start gap-2 rounded-lg px-4 py-3 sm:min-w-[180px]"
              >
                <Settings2 className="h-5 w-5" />
                <span className="text-base">Podstawowe</span>
              </TabsTrigger>
              <TabsTrigger
                value="navigation"
                className="flex items-center justify-start gap-2 rounded-lg px-4 py-3 sm:min-w-[180px]"
              >
                <Layout className="h-5 w-5" />
                <span className="text-base">Nawigacja</span>
              </TabsTrigger>
              <TabsTrigger
                value="scoring"
                className="flex items-center justify-start gap-2 rounded-lg px-4 py-3 sm:min-w-[180px]"
              >
                <Medal className="h-5 w-5" />
                <span className="text-base">Punktacja</span>
              </TabsTrigger>
              <TabsTrigger
                value="display"
                className="flex items-center justify-start gap-2 rounded-lg px-4 py-3 sm:min-w-[180px]"
              >
                <Eye className="h-5 w-5" />
                <span className="text-base">Wyświetlanie</span>
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="flex items-center justify-start gap-2 rounded-lg px-4 py-3 sm:min-w-[180px]"
              >
                <Save className="h-5 w-5" />
                <span className="text-base">Wyniki</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <FormProvider {...form}>
            <Form
              className="space-y-4 sm:space-y-6"
              onSubmit={() => {
                form.handleSubmit(handleSubmit)();
              }}
            >
              <TestCreatorTestBasic />
              <TestCreatorTestNavigation />
              <TestCreatorTestScoring />
              <TestCreatorTestDisplay />
              <TestCreatorTestResults />
              <div className="flex justify-end border-t pt-4 sm:pt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Zapisz konfigurację
                </Button>
              </div>
            </Form>
          </FormProvider>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestCreatorForm;
