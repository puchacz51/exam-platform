import { FC } from 'react';

import { X } from 'lucide-react';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  MeasuringStrategy,
  pointerWithin,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

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

  const getDragOverlayContent = (id: string) => {
    // Check if it's a group being dragged
    const group = items.find((group) => group.id === id);
    if (group) {
      return (
        <div className="w-64 rounded border bg-white p-3 text-sm shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold">{group.name}</span>
          </div>
        </div>
      );
    }

    // Otherwise it's a question being dragged
    const containerIndex = findContainer(id);
    return containerIndex !== -1 ? (
      <div className="w-60 rounded border bg-white p-2 text-sm shadow-lg">
        {items[containerIndex]?.questions.find((item) => item.id === id)?.text}
      </div>
    ) : null;
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
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
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <div className="flex w-full gap-6 overflow-y-auto p-4">
          <SortableContext
            items={items.map((group) => group.id)}
            strategy={horizontalListSortingStrategy}
          >
            {items.map(({ id, name, questions }) => (
              <QuestionGroup
                key={id}
                id={id}
                name={name}
                items={questions}
                isOver={id === activeGroup}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId && getDragOverlayContent(activeId)}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragDropQuestionGroups;
