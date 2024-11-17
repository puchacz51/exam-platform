import React, { FC, HTMLAttributes, useState } from 'react';

import { Form, FormProvider, useForm } from 'react-hook-form';
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
  const [activeTab, setActiveTab] = useState('basic');

  const form = useForm<TestCreatorTest>({
    defaultValues: {
      ...test,
    },
    resolver: zodResolver(testSchema),
  });

  const handleSubmit = (data: TestCreatorTest) => {
    console.log(data);
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
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-6">
            <TabsTrigger
              value="basic"
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4" />
              Podstawowe
            </TabsTrigger>
            <TabsTrigger
              value="navigation"
              className="flex items-center gap-2"
            >
              <Layout className="h-4 w-4" />
              Nawigacja
            </TabsTrigger>
            <TabsTrigger
              value="scoring"
              className="flex items-center gap-2"
            >
              <Medal className="h-4 w-4" />
              Punktacja
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Wyświetlanie
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Wyniki
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormProvider {...form}>
                <TestCreatorTestBasic />
                <TestCreatorTestNavigation />
                <TestCreatorTestScoring />
                <TestCreatorTestDisplay />
                <TestCreatorTestResults />
              </FormProvider>
              <div className="flex justify-end border-t pt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Zapisz konfigurację
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestCreatorForm;
