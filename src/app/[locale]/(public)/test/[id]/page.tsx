import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft, Clock, Book, Users, Award, Calendar } from 'lucide-react';
import { eq } from 'drizzle-orm';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import db from '@/lib/db';
import { testsTable } from '@schema/test';
import TestViewer from './components/TestViewer';

interface TestPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const result = await db
    .select()
    .from(testsTable)
    .where(eq(testsTable.id, params.id))
    .limit(1);

  const test = result[0];

  if (!test) {
    return {
      title: 'Test not found',
    };
  }

  return {
    title: `Test: ${test.title}`,
    description: test.description || 'View test details',
  };
}

const TestPage: NextPage<TestPageProps> = async ({ params }) => {
  const result = await db
    .select()
    .from(testsTable)
    .where(eq(testsTable.id, params.id))
    .limit(1);

  const test = result[0];
  if (!test) {
    return notFound();
  }

  const testStats = {
    duration: '45 min',
    questions: 25,
    participants: 150,
    avgScore: '78%',
    lastUpdated: new Date().toLocaleDateString(),
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="gap-2 hover:bg-gray-200"
            asChild
          >
            <a href="/tests">
              <ChevronLeft className="h-4 w-4" />
              Back to tests
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {test.title}
                </h1>
                <p className="mt-1 text-gray-500">
                  {test.description || 'View test details and questions'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant="secondary"
                  className="text-sm"
                >
                  Active
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm"
                >
                  Multiple Choice
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <Clock className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-xl font-semibold">{testStats.duration}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <Book className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Questions</p>
                  <p className="text-xl font-semibold">{testStats.questions}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <Users className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Participants
                  </p>
                  <p className="text-xl font-semibold">
                    {testStats.participants}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <Award className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Avg. Score
                  </p>
                  <p className="text-xl font-semibold">{testStats.avgScore}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold">Test Content</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {testStats.lastUpdated}</span>
              </div>
            </div>
            <TestViewer testId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
