import React from 'react';

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import QuestionGroup from './QuestionGroup';
import useDragDrop from '../../../hooks/useDragDrop';

export interface Question {
  id: string;
  text: string;
}

export interface QuestionGroupData {
  name: string;
  items: Question[];
}

const initialItems: Record<string, QuestionGroupData> = {
  'group-1': {
    name: 'Group 1',
    items: [
      { id: 'q1', text: 'Question 1' },
      { id: 'q2', text: 'Question 2' },
    ],
  },
  'group-2': {
    name: 'Group 2',
    items: [
      { id: 'q3', text: 'Question 3' },
      { id: 'q4', text: 'Question 4' },
    ],
  },
  'group-3': {
    name: 'Group 3',
    items: [],
  },
};

const DragDropQuestionGroups: React.FC = () => {
  const {
    items,
    activeId,
    activeGroup,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragDrop({ initialItems });

  const findContainer = (id: string) => {
    if (id in items) return id;
    for (const [groupId, group] of Object.entries(items)) {
      if (group.items.some((item) => item.id === id)) return groupId;
    }
    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-4">
        {Object.entries(items).map(([groupId, group]) => (
          <QuestionGroup
            key={groupId}
            id={groupId}
            name={group.name}
            items={group.items}
            isOver={groupId === activeGroup}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="scale-105 transform rounded border bg-white p-4 shadow-lg">
            {
              items[findContainer(activeId)]?.items.find(
                (item) => item.id === activeId
              )?.text
            }
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragDropQuestionGroups;
