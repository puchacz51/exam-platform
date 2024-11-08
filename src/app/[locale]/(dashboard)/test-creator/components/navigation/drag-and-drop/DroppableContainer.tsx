import { FC, ReactNode } from 'react';

import { useDroppable } from '@dnd-kit/core';

interface DroppableContainerProps {
  id: string;
  children: ReactNode;
}

const DroppableContainer: FC<DroppableContainerProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="h-full"
    >
      {children}
    </div>
  );
};

export default DroppableContainer;
