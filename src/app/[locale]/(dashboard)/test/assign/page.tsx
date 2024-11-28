import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/index';
import { getUserGroups } from '@actions/groups/getGroup';

const TestAssignmentPage = async () => {
  const groupsResponse = await getUserGroups();
  const groups = groupsResponse.success ? groupsResponse.data : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:space-y-8 sm:py-8">
      <h1 className="text-2xl font-bold">Assign Test Access</h1>
      <div className="mx-auto max-w-5xl">
        <TestAccessForm initialGroups={groups} />
      </div>
    </div>
  );
};

export default TestAssignmentPage;
