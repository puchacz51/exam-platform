import { FC } from 'react';

import { SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import DroppableContainer from './DroppableContainer';

interface Question {
  id: string;
  text: string;
}

interface QuestionGroupProps {
  id: string;
  name: string;
  items: Question[];
  isOver: boolean;
}

const QuestionGroup: FC<QuestionGroupProps> = ({ id, name, items, isOver }) => {
  return (
    <div
      className={`w-64 rounded-lg p-4 ${isOver ? 'border-2 border-blue-300 bg-blue-50' : 'bg-gray-100'}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">{name}</h3>
      </div>
      <DroppableContainer id={id}>
        <SortableContext items={items.map((item) => item.id)}>
          <div className="min-h-[150px] space-y-2 rounded bg-gray-50/50 p-2">
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                text={item.text}
              />
            ))}
            {items.length === 0 && (
              <div className="flex h-full min-h-[100px] items-center justify-center rounded border-2 border-dashed text-gray-400">
                Przeciągnij tutaj pytanie
              </div>
            )}
          </div>
        </SortableContext>
      </DroppableContainer>
    </div>
  );
};

export default QuestionGroup;
