import { notFound } from 'next/navigation';

import { getUserGroups } from '@actions/groups/getGroup';
import { getTest } from '@actions/test/getTest';
import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm';
import { getTestTestAccess } from '@actions/test-access/getTestTestAccess';

const TestAssignmentPage = async ({ params }: { params: { id: string } }) => {
  const [groupsResponse, test] = await Promise.all([
    getUserGroups(),
    getTest(params.id),
    getTestTestAccess(params.id),
  ]);

  if (!test) {
    return notFound();
  }

  const groups = groupsResponse.success ? groupsResponse.data : [];

  return (
    <div className="xs:px-2 container mx-auto space-y-6 px-2 py-8">
      <TestAccessForm
        initialGroups={groups}
        test={test}
      />
    </div>
  );
};

export default TestAssignmentPage;
