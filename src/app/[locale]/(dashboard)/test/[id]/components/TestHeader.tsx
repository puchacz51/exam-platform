import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { BookOpen, Bookmark, ArrowLeft, Calendar } from 'lucide-react';

interface TestHeaderProps {
  title: string;
  description: string;
  category?: { name: string };
  isChangeable: boolean;
  createdAt: Date;
  questionsCount?: number;
}

export const TestHeader = ({
  title,
  description,
  category,
  isChangeable,
  createdAt,
  questionsCount,
}: TestHeaderProps) => (
  <div className="space-y-4">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
        {description && (
          <CardDescription className="max-w-2xl">{description}</CardDescription>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(createdAt).toLocaleDateString()}
          {questionsCount !== undefined && (
            <span>• {questionsCount} questions</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Bookmark className="h-3 w-3" />
            {category.name}
          </Badge>
        )}
        {isChangeable && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            No Going Back Mode
          </Badge>
        )}
      </div>
    </div>
  </div>
);
