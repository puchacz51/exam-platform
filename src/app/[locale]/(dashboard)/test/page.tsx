import { TestList } from '@/app/[locale]/(dashboard)/test/components/test-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserTests } from '@actions/test/getUserTests';

interface TestsPageProps {
  searchParams: { page?: string };
}

const TestsPage = async ({ searchParams }: TestsPageProps) => {
  const page = Number(searchParams.page) || 1;
  const initialData = await getUserTests(page);

  async function handlePageChange(newPage: number) {
    'use server';
    return await getUserTests(newPage);
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <TestList
            initialData={initialData}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestsPage;
