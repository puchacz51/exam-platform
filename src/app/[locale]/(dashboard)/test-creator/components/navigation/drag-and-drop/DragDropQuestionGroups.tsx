import { FC } from 'react';

import { X } from 'lucide-react';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import useDragDrop from '@/app/[locale]/(dashboard)/test-creator/hooks/useDragDrop';
import QuestionGroup from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/QuestionGroup';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

export interface Question {
  id: string;
  text: string;
}

export interface QuestionGroupData {
  name: string;
  questions: Question[];
}

const DragDropQuestionGroups: FC = () => {
  const setIsSortFormOpen = useTestContext((state) => state.setIsSortFormOpen);
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
    <div className="relative">
      <button
        onClick={() => setIsSortFormOpen(false)}
        className="absolute right-4 top-4 rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200"
      >
        <X className="h-5 w-5 text-gray-700" />
      </button>
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
    </div>
  );
};

export default DragDropQuestionGroups;
