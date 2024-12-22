import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft, Link as LinkIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import TestViewer from '@/app/[locale]/(dashboard)/test/[id]/components/TestViewer';
import { getTest } from '@actions/test/getTest';
import { TestHeader } from '@/app/[locale]/(dashboard)/test/[id]/components/TestHeader';
import { TestStats } from '@/app/[locale]/(dashboard)/test/[id]/components/TestStats';
import { TestDetails } from '@/app/[locale]/(dashboard)/test/[id]/components/TestDetails';
import { CompleteTest } from '@/types/test/test';
import { Link } from '@/i18n/routing';

interface TestPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  return {
    title: `Test: ${params.id}`,
  };
}

const TestPage: NextPage<TestPageProps> = async ({ params }) => {
  const t = await getTranslations('dashboard.testPage');
  const test = await getTest(params.id);

  if (!test) {
    return notFound();
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 hover:bg-secondary"
          asChild
        >
          <Link href="/test">
            <ChevronLeft className="h-4 w-4" />
            {t('backToTests')}
          </Link>
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          asChild
        >
          <Link
            href={{
              pathname: '/test/[id]/assign',
              params: { id: params.id },
            }}
          >
            <LinkIcon className="h-4 w-4" />
            {t('assignTest')}
          </Link>
        </Button>
      </div>
      <div className="space-y-8">
        <TestHeader
          title={test.title}
          description={test.description || ''}
          createdAt={test.createdAt}
          questionsCount={test.QG.length}
        />
        <TestStats test={test as unknown as CompleteTest} />
        <TestDetails settings={test.settings} />
        <TestViewer testId={test.id} />
      </div>
    </div>
  );
};

export default TestPage;
