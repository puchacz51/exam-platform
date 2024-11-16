import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import db from '@/lib/db';
import { testsTable } from '@schema/test';

import { PublicTestHeader } from '../../components/PublicTestHeader';
import { PublicTestInfo } from '../../components/PublicTestInfo';
import { StartTestButton } from '../../components/StartTestButton';

interface StartTestPageProps {
  params: {
    id: string;
  };
}

async function getTestData(testId: string) {
  try {
    const test = await db.query.tests.findFirst({
      where: eq(testsTable.id, testId),
      with: {
        questionGroups: {
          with: {
            questions: true,
          },
        },
        settings: true,
      },
    });

    if (!test) {
      notFound();
    }

    return test;
  } catch (error) {
    console.error('Error fetching test data:', error);
    notFound();
  }
}

export default async function StartTestPage({ params }: StartTestPageProps) {
  const test = await getTestData(params.id);

  const questionsCount = test.questionGroups.reduce(
    (acc, group) => acc + group.questions.length,
    0
  );

  const maxPoints = test.questionGroups.reduce(
    (acc, group) => acc + group.questions.reduce((sum, q) => sum + q.points, 0),
    0
  );

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <PublicTestHeader
          title={test.title}
          description={test.description}
        />

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-center text-2xl font-bold">
                  Test Overview
                </h2>
                <PublicTestInfo
                  duration={30}
                  questionsCount={questionsCount}
                  maxPoints={maxPoints}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t p-8">
            <StartTestButton testId={params.id} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
