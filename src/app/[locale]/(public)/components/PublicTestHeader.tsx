import { BookOpen } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PublicTestHeaderProps {
  title: string;
  description: string;
}

export const PublicTestHeader = ({
  title,
  description,
}: PublicTestHeaderProps) => {
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
};
