import { QuestionItem } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionItem';
import { Question } from '@/types/questions';
import { getAssignmentWithTest } from '@actions/test/getAssignmentWithTest';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const assignment = await getAssignmentWithTest(params.id);
  const { questionGroups } = assignment;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Test Assignment Data</h1>
      <pre className="overflow-auto rounded-lg bg-gray-100 p-4">
        {questionGroups.map((group, groupIndex) => (
          <QuestionItem
            key={group.id}
            question={group as Question}
            questionIndex={groupIndex}
            mode="solve"
          />
        ))}
      </pre>
    </div>
  );
};

export default TestAttemptPage;
