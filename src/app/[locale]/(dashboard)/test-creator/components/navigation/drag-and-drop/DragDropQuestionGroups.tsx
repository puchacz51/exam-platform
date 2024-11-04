import React, { FC } from 'react';

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import useDragDrop from '@/app/[locale]/(dashboard)/test-creator/hooks/useDragDrop';
import QuestionGroup from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/QuestionGroup';

export interface Question {
  id: string;
  text: string;
}

export interface QuestionGroupData {
  name: string;
  questions: Question[];
}

const DragDropQuestionGroups: FC = () => {
  const {
    items,
    activeId,
    activeGroup,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragDrop();

  const findContainer = (id: string) => {
    return items.findIndex((group) =>
      group.questions.some((question) => question.id === id)
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full gap-6 overflow-y-auto p-4">
        {items.map(({ id, name, questions }) => (
          <QuestionGroup
            key={id}
            id={id}
            name={name}
            items={questions}
            isOver={id === activeGroup}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="scale-105 transform rounded border bg-white p-4 shadow-lg">
            {
              items[findContainer(activeId)]?.questions.find(
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
