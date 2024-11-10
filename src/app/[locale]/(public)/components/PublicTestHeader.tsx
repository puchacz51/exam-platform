
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface PublicTestHeaderProps {
  title: string;
  description: string;
}

export function PublicTestHeader({ title, description }: PublicTestHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
        {description && (
          <CardDescription className="mt-2 text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}