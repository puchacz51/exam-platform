import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assigment/components/TestAccessForm/index';
import db from '@/lib/db';
import { Group } from '@/types/group/group';

const TestAssignmentPage = async () => {
  const initialGroups = await db.query.groups.findMany({
    with: {
      userGroups: true,
    },
  });

  return (
    <div>
      <TestAccessForm initialGroups={initialGroups as unknown as Group[]} />
    </div>
  );
};

export default TestAssignmentPage;
