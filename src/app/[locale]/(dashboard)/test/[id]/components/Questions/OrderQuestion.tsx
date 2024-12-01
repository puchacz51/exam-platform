'use client';

import React, { FC } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/SortableItem';
import {
  type OrderQuestion,
  OrderQuestionWithoutAnswer,
} from '@/types/questions/orderQuestion';

interface OrderQuestionViewProps {
  mode?: 'view';
  question: OrderQuestion;
}

interface OrderQuestionSolveProps {
  mode?: 'solve';
  question: OrderQuestionWithoutAnswer;
}

type OrderQuestionProps = OrderQuestionViewProps | OrderQuestionSolveProps;

const OrderQuestion: FC<OrderQuestionProps> = ({ question, mode = 'view' }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const items = question.orderItems || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = [...items];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        disabled={mode === 'view'}
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              text={item.text}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default OrderQuestion;
