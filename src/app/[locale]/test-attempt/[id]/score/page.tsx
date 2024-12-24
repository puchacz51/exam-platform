import Link from 'next/link';

import { auth } from '@/next-auth/auth';
import { getUserPoints } from '@actions/attempt/helpers/getUserPoints';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const TestScorePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const { data, error } = await getUserPoints(params.id);

  if (!session?.user.userID) {
    return <div>Unauthorized</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Attempt not found</div>;
  }

  const { firstname, lastname } = session.user;
  const {
    receivedPoints,
    receivedPointsPercentage,
    pointsFromOpenQuestions,
    pointsFromClosedQuestions,
    receivedPointsPercentageWithoutOpenQuestions,
  } = data;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold">Test Results</h1>
            <Badge
              variant="secondary"
              className="text-base"
            >
              {firstname} {lastname}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-5xl font-bold text-primary">
                    {receivedPoints}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Score ({receivedPointsPercentage}%)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Closed Questions
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-primary">
                      {pointsFromClosedQuestions}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({receivedPointsPercentageWithoutOpenQuestions}%)
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Open Questions</TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-primary">
                      {pointsFromOpenQuestions}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default TestScorePage;
