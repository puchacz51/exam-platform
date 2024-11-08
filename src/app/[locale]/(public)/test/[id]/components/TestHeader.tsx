import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';

interface TestHeaderProps {
  title: string;
  description: string;
  accessType: string;
  category?: { name: string };
  isChangeable: boolean;
}

export const TestHeader = ({
  title,
  description,
  accessType,
  category,
  isChangeable,
}: TestHeaderProps) => (
  <div className="flex items-start justify-between">
    <div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </div>
    <div className="flex flex-col gap-2">
      <Badge>{accessType}</Badge>
      {category && <Badge variant="secondary">{category.name}</Badge>}
      {isChangeable && <Badge variant="destructive">No Going Back Mode</Badge>}
    </div>
  </div>
);
