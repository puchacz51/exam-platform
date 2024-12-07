import { notFound } from 'next/navigation';

import { getUserGroups } from '@actions/groups/getGroup';
import { TestAccessList } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessList';

const TestAssignmentPage = async () => {
  const [groupsResponse] = await Promise.all([getUserGroups()]);

  if (!groupsResponse.success) {
    return notFound();
  }

  return (
    <div className="w container mx-auto flex w-full items-center space-y-6 py-8">
      <TestAccessList className="w-full flex-grow" />
    </div>
  );
};

export default TestAssignmentPage;
