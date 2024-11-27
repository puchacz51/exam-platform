import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTestOwnerAssignments } from '@actions/test-assigment/getTestOwnerAssignments';

const TestAssignmentListPage = async () => {
  const assignments = await getTestOwnerAssignments();

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Test Assignments</h1>
      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <Card
            key={`${assignment.testId}-${assignment.groupId ?? 'no-group'}`}
          >
            <CardHeader>
              <CardTitle>{assignment.testTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">{assignment.testDescription}</p>
                <div className="flex flex-col gap-1">
                  <p>
                    <span className="font-semibold">Access Type:</span>{' '}
                    {assignment.accessType}
                  </p>
                  {assignment.accessCode && (
                    <p>
                      <span className="font-semibold">Access Code:</span>{' '}
                      {assignment.accessCode}
                    </p>
                  )}
                  {assignment.groupName && (
                    <p>
                      <span className="font-semibold">Assigned Group:</span>{' '}
                      {assignment.groupName}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestAssignmentListPage;
