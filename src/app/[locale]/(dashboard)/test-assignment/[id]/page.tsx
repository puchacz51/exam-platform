import { NextPage } from 'next';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import TestAssignmentAttemptList from '@/app/[locale]/(dashboard)/test-assignment/[id]/components/TestAssignmentAttemptList';
import { getTestAttempts } from '@actions/attempt/getTestAttempts';
import { getTestAccessInfo } from '@actions/test-access/getTestAccessInfo';
import CopyButton from '@/components/CopyButton';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestAccessAttemptsPageProps {
  params: {
    id: string;
  };
}
export const dynamic = 'force-dynamic';
const APP_URL = process.env.NEXT_PUBLIC_URL;

const TestAccessAttemptsPage: NextPage<TestAccessAttemptsPageProps> = async ({
  params,
}) => {
  const [testAttempts, testAccess] = await Promise.all([
    getTestAttempts(params.id, 1, 100),
    getTestAccessInfo(params.id),
  ]);

  if (!testAttempts || !testAccess) {
    return <div>Test not found</div>;
  }

  const maxPoints = testAccess?.test.QG.flatMap((qg) =>
    qg.qOnQG.flatMap((qOnQG) => qOnQG.question.points)
  ).reduce((a, b) => a + b, 0);
  const { accessCode } = testAccess;
  const link = `${APP_URL}/test-attempt/start-screen/${testAccess.id}${!!accessCode ? `?accessCode=${accessCode}` : ''}`;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-medium">Podejścia użytkowników do testu</h3>

        <CopyButton text={link} />
      </div>
      <Separator />
      <Card>
        <CardContent className="p-6">
          {testAttempts.attempts.length != 0 ? (
            <TestAssignmentAttemptList
              maxPoints={maxPoints}
              initialData={testAttempts}
              testAccessId={params.id}
            />
          ) : (
            <div className="text-center text-muted-foreground">
              No attempts found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAccessAttemptsPage;
