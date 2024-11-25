import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/index';
import { getUserGroups } from '@actions/groups/getGroup';

const TestAssignmentPage = async () => {
  const groupsResponse = await getUserGroups();
  const groups = groupsResponse.success ? groupsResponse.data : [];

  return (
    <div className="space-y-6">
      <TestAccessForm initialGroups={groups} />
    </div>
  );
};

export default TestAssignmentPage;
