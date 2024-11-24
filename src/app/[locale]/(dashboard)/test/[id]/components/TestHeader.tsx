import { BookOpen, Calendar } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TestHeaderProps {
  title: string;
  description: string;
  createdAt: Date;
  questionsCount?: number;
}

export const TestHeader = ({
  title,
  description,
  createdAt,
  questionsCount,
}: TestHeaderProps) => (
  <Card>
    <CardHeader className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>
          {description && (
            <CardDescription className="max-w-2xl text-base">
              {description}
            </CardDescription>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(createdAt).toLocaleDateString()}
            {questionsCount !== undefined && (
              <span className="flex items-center gap-1">
                • <BookOpen className="h-4 w-4" /> {questionsCount} questions
              </span>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
);
