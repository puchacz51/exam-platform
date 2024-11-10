
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Book, Target } from 'lucide-react';

interface PublicTestInfoProps {
  duration: number;
  questionsCount: number;
  maxPoints: number;
}

export function PublicTestInfo({ duration, questionsCount, maxPoints }: PublicTestInfoProps) {
  const stats = [
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      label: 'Duration',
      value: `${duration} min`,
    },
    {
      icon: <Book className="h-8 w-8 text-green-500" />,
      label: 'Questions',
      value: questionsCount,
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      label: 'Max Points',
      value: `${maxPoints} pts`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <Card key={item.label} className="transition-colors hover:bg-secondary/5">
          <CardContent className="flex items-center p-6">
            {item.icon}
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}