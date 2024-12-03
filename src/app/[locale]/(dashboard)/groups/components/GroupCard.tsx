import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

interface GroupCardProps {
  id: string;
  displayName: string;
}

const GroupCard = ({ displayName }: GroupCardProps) => {
  const t = useTranslations('dashboard.groups'); // Change namespace to match existing structure

  return (
    <div className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary text-primary-foreground">
          {displayName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-gray-900">{displayName}</h3>
      </div>
    </div>
  );
};

export default GroupCard;
