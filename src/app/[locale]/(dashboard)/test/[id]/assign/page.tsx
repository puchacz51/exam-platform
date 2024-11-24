import { notFound } from 'next/navigation';

import { getUserGroups } from '@actions/groups/getGroup';
import { getTest } from '@actions/test/getTest';
import { Group } from '@/types/group/group';
import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm';

const TestAssignmentPage = async ({ params }: { params: { id: string } }) => {
  const [groupsResponse, test] = await Promise.all([
    getUserGroups(),
    getTest(params.id),
  ]);

  if (!test) {
    return notFound();
  }

  const groups = groupsResponse.success ? groupsResponse.data : [];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <TestAccessForm
        initialGroups={groups as Group[]}
        test={test}
      />
    </div>
  );
};

export default TestAssignmentPage;
