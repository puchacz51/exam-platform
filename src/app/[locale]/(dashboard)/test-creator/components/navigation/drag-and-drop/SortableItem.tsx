import { FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';
import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

interface SortableItemProps {
  id: string;
  text: string;
  type: QuestionType['questionType'];
}

const SortableItem: FC<SortableItemProps> = ({ id, text, type }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { text } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = questionTypeIcons[type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-1.5 cursor-move rounded border p-2 text-sm shadow ${questionTypeColors[type]}`}
      {...attributes}
      {...listeners}
    >
      <Icon className="mr-1.5 h-3.5 w-3.5 inline-block" />
      {text}
    </div>
  );
};

export default SortableItem;
