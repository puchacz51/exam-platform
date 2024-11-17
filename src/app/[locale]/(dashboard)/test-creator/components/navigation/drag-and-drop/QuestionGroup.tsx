import { FC } from 'react';

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { cn } from '@/lib/utils';
import SortableItem from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/SortableItem';
import DroppableContainer from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/DroppableContainer';
import { Question } from '@/types/test-creator/question';

interface QuestionGroupProps {
  id: string;
  name: string;
  items: Question[];
  isOver: boolean;
}

const QuestionGroup: FC<QuestionGroupProps> = ({
  id,
  name,
  items = [],
  isOver,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'group',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const validItems =
    items?.filter((item) => item && typeof item.id === 'string') ?? [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'w-64 rounded-lg p-3',
        isOver ? 'border-2 border-blue-300 bg-blue-50' : 'bg-gray-100'
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold">{name}</h3>
        <button
          className="cursor-move rounded p-1 hover:bg-gray-200"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      <DroppableContainer id={id}>
        <div className="flex h-[60vh] w-full flex-col rounded bg-gray-50/50 p-2">
          <div className="h-full w-full overflow-y-auto">
            {validItems.length > 0 ? (
              <SortableContext items={validItems.map((item) => item.id)}>
                {validItems.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    type={item.questionType}
                  />
                ))}
              </SortableContext>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded border-2 border-dashed text-sm text-gray-400">
                Przeciągnij tutaj pytanie
              </div>
            )}
          </div>
        </div>
      </DroppableContainer>
    </div>
  );
};

export default QuestionGroup;
