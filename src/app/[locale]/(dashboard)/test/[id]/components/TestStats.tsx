import { Book, Brain, Clock, Target } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';
import { CompleteTest } from '@/types/test/test';

interface TestStatsProps {
  test: CompleteTest;
}

const countQuestionTypes = (test: CompleteTest) => {
  return test.QG.reduce(
    (acc, group) => {
      group.questions.forEach((question) => {
        acc[question.questionType] = (acc[question.questionType] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );
};

const formatDuration = (duration: number) => {
  if (duration >= 60) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
  }
  return `${duration}min`;
};

export const TestStats = ({ test }: TestStatsProps) => {
  const questionCount = test.QG.reduce(
    (acc, group) => acc + group.questions.length,
    0
  );
  const pointsCount = test.QG.reduce(
    (acc, group) =>
      acc + group.questions.reduce((acc, question) => acc + question.points, 0),
    0
  );
  const questionTypes = countQuestionTypes(test);

  const mainStats = [
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      label: 'Duration',
      value: formatDuration(30),
    },
    {
      icon: <Book className="h-8 w-8 text-green-500" />,
      label: 'Questions',
      value: questionCount,
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      label: 'Max Points',
      value: `${pointsCount}pts`,
    },
    {
      icon: <Brain className="h-8 w-8 text-yellow-500" />,
      label: 'Scoring System',
      value: test.settings.scoringSystem,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((item) => (
          <Card
            key={item.label}
            className="transition-colors hover:bg-secondary/5"
          >
            <CardContent className="flex items-center p-6">
              {item.icon}
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-xl font-semibold text-primary">
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Object.entries(questionTypes || {})?.map(([type, count]) => {
          const Icon =
            questionTypeIcons[type as keyof typeof questionTypeIcons];
          return (
            <Card
              key={type}
              className="transition-colors hover:bg-secondary/5"
            >
              <CardContent
                className={cn(
                  'flex items-center p-4',
                  questionTypeColors[type as keyof typeof questionTypeColors]
                )}
              >
                <Icon className="h-6 w-6" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {type.replace('_', ' ')}
                  </p>
                  <p className="text-lg font-semibold text-primary">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
