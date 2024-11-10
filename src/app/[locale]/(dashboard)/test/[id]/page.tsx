import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { eq } from 'drizzle-orm';

import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { testsTable } from '@schema/test';
import { TestHeader } from './components/TestHeader';
import { TestStats } from './components/TestStats';
import { TestDetails } from './components/TestDetails';
import { TestContent } from './components/TestContent';
import TestViewer from '@/app/[locale]/(dashboard)/test/[id]/components/TestViewer';

interface TestPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const result = await db
    .select()
    .from(testsTable)
    .where(eq(testsTable.id, params.id))
    .limit(1);

  const test = result[0];

  if (!test) {
    return {
      title: 'Test not found',
    };
  }

  return {
    title: `Test: ${test.title}`,
    description: test.description || 'View test details',
  };
}

const TestPage: NextPage<TestPageProps> = async ({ params }) => {
  const test = await db.query.tests.findFirst({
    where: eq(testsTable.id, params.id),
    with: {
      category: true,
      settings: true,
      questionGroups: {
        with: {
          questions: true,
        },
      },
    },
  });

  if (!test) {
    return notFound();
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <Button
        variant="ghost"
        className="gap-2"
        asChild
      >
        <a href="/tests">
          <ChevronLeft className="h-4 w-4" />
          Back to tests
        </a>
      </Button>

      <div className="space-y-6">
        <TestHeader
          title={test.title}
          description={test.description || ''}
          category={test.category}
          isChangeable={!test.settings.allowGoBack}
          createdAt={test.createdAt}
          questionsCount={test.questionGroups.length}
        />

        <TestStats
          duration="45 min"
          questionCount={test.questionGroups.reduce(
            (acc, group) => acc + group.questions.length,
            0
          )}
          settings={test.settings}
        />

        <TestDetails settings={test.settings} />

        <TestViewer testId={test.id} />
      </div>
    </div>
  );
};

export default TestPage;
