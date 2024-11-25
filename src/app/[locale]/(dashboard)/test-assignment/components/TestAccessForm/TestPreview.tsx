
import { TestHeader } from '@/app/[locale]/(dashboard)/test/[id]/components/TestHeader';
import { TestStats } from '@/app/[locale]/(dashboard)/test/[id]/components/TestStats';
import { TestDetails } from '@/app/[locale]/(dashboard)/test/[id]/components/TestDetails';
import { Card } from '@/components/ui/card';
import { CompleteTest } from '@/types/test/test';

interface TestPreviewProps {
  test: CompleteTest;
}

export const TestPreview = ({ test }: TestPreviewProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <TestHeader
          title={test.title}
          description={test.description || ''}
          createdAt={test.createdAt}
          questionsCount={test.questionGroups.length}
        />
        <TestStats test={test} />
        <TestDetails settings={test.settings} />
      </div>
    </Card>
  );
};