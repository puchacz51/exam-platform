import { BookOpen, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
}: TestHeaderProps) => {
  const t = useTranslations('test.header');

  return (
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
              {t('createdAt', {
                date: new Date(createdAt).toLocaleDateString(),
              })}
              {questionsCount !== undefined && (
                <span className="flex items-center gap-1">
                  • <BookOpen className="h-4 w-4" />{' '}
                  {t('questionsCount', { count: questionsCount })}
                </span>
              )}
            </div>
          </div>
          {/* {category && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Bookmark className="h-3 w-3" />
              {category.name}
            </Badge>
          )} */}
        </div>
      </CardHeader>
    </Card>
  );
};
