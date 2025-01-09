import { FC, ReactNode } from 'react';

import { useDroppable } from '@dnd-kit/core';

interface DroppableContainerProps {
  id: string;
  children: ReactNode;
}

const DroppableContainer: FC<DroppableContainerProps> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'container',
      accepts: ['question'],
      id: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full w-full flex-1 ${isOver ? 'bg-blue-50' : ''}`}
    >
      {children}
    </div>
  );
};

export default DroppableContainer;
