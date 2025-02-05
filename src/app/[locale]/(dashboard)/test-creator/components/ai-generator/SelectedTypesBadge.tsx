import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

interface SelectedTypesBadgeProps {
  type: string;
  count: number;
  onCountUpdate: (type: string, newCount: number) => void;
  onRemove: (type: string) => void;
  disableIncrement: boolean;
}

export const SelectedTypesBadge = ({
  type,
  count,
  onCountUpdate,
  onRemove,
  disableIncrement,
}: SelectedTypesBadgeProps) => {
  const t = useTranslations('aiGenerator');
  const Icon = questionTypeIcons[type as keyof typeof questionTypeIcons];

  return (
    <Badge
      variant="secondary"
      className={`p-2 ${questionTypeColors[type as keyof typeof questionTypeColors]}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="font-medium">{type.replace(/_/g, ' ')}</span>
        <div className="ml-2 flex items-center gap-1 rounded-md bg-white/50 px-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-white/50"
            onClick={() => onCountUpdate(type, Math.max(1, count - 1))}
            disabled={count === 1}
            title={t('selectedType.decrease')}
          >
            -
          </Button>
          <span className="w-4 text-center font-bold">{count}</span>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-white/50"
            onClick={() => onCountUpdate(type, count + 1)}
            disabled={disableIncrement}
            title={t('selectedType.increase')}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="ml-1 h-6 w-6 p-0 hover:bg-white/50"
          onClick={() => onRemove(type)}
          title={t('selectedType.remove')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Badge>
  );
};

export default SelectedTypesBadge;
