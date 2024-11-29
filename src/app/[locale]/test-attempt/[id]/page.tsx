import { getAssignmentWithTest } from '@actions/test/getAssignmentWithTest';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const assignment = await getAssignmentWithTest(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Test Assignment Data</h1>
      <pre className="overflow-auto rounded-lg bg-gray-100 p-4">
        {JSON.stringify(assignment, null, 2)}
      </pre>
    </div>
  );
};

export default TestAttemptPage;
