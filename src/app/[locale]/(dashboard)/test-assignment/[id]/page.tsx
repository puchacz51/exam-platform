import { NextPage } from 'next';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import TestAssignmentAttemptList from '@/app/[locale]/(dashboard)/test-assignment/[id]/components/TestAssignmentAttemptList';
import { getTestAttempts } from '@actions/attempt/getTestAttempts';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestAccessAttemptsPageProps {
  params: {
    id: string;
  };
}

const TestAccessAttemptsPage: NextPage<TestAccessAttemptsPageProps> = async ({
  params,
}) => {
  const testAttempts = await getTestAttempts(params.id, 1, 10);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-medium">Test Attempts</h3>
        <p className="text-sm text-muted-foreground">
          View all attempts for this test assignment.
        </p>
      </div>
      <Separator />
      <Card>
        <CardContent className="p-6">
          <TestAssignmentAttemptList initialData={testAttempts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAccessAttemptsPage;
