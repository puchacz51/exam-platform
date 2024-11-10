import { Card, CardContent } from '@/components/ui/card';
import { Clock, Book, Users, Award, Brain, Target } from 'lucide-react';
import { SelectTestSettings } from '@schema/testSettings';

import { cn } from '@/lib/utils';
import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

interface TestStatsProps {
  duration: string;
  questionCount: number;
  settings: SelectTestSettings;
  questions: Array<{ questionType: keyof typeof questionTypeIcons }>;
}

const countQuestionTypes = (questions: TestStatsProps['questions']) => {
  return questions?.reduce(
    (acc, question) => {
      acc[question.questionType] = (acc[question.questionType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};

export function TestStats({
  duration,
  questionCount,
  settings,
  questions,
}: TestStatsProps) {
  const questionTypes = countQuestionTypes(questions);

  const mainStats = [
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      label: 'Duration',
      value: duration,
    },
    {
      icon: <Book className="h-8 w-8 text-green-500" />,
      label: 'Questions',
      value: questionCount,
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      label: 'Max Points',
      value: `${questionCount * 1}pts`,
    },
    {
      icon: <Brain className="h-8 w-8 text-yellow-500" />,
      label: 'Scoring System',
      value: settings.scoringSystem,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center p-6">
              {item.icon}
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-xl font-semibold">{item.value}</p>
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
            <Card key={type}>
              <CardContent
                className={cn(
                  'flex items-center p-4 transition-colors',
                  questionTypeColors[type as keyof typeof questionTypeColors]
                )}
              >
                <Icon className="h-6 w-6" />
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {type.replace('_', ' ')}
                  </p>
                  <p className="text-lg font-semibold">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
