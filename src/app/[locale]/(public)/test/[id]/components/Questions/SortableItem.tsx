import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableItemProps {
  id: string;
  text: string;
  index: number;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, text, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm',
        isDragging && 'z-10 border-primary shadow-lg',
        !isDragging && 'border-gray-200'
      )}
    >
      <div
        {...listeners}
        className="cursor-grab touch-none"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex flex-1 items-center gap-3">
        <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
};

export default SortableItem;
