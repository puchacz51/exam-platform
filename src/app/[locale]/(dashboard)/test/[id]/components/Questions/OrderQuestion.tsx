'use client';

import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
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
  arrayMove,
} from '@dnd-kit/sortable';

import SortableItem from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/SortableItem';
import {
  type OrderQuestion,
  OrderQuestionWithoutAnswer,
} from '@/types/questions/orderQuestion';
import { TestAttemptFormDataOrder } from '@/types/forms/testAttemptForm';

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
  const { id } = question;
  const { setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataOrder>();

  // Track the current order of items in component state
  const [orderedItems, setOrderedItems] = React.useState(question.orderItems);

  // Initialize form on first render for 'solve' mode
  React.useEffect(() => {
    if (mode === 'solve') {
      setValue(
        `questions.${id}.items`,
        question.orderItems.map((item, index) => ({
          itemId: item.id,
          order: index + 1,
        }))
      );
      setOrderedItems(question.orderItems);
    }
  }, [id, mode, question.orderItems, setValue]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && mode === 'solve') {
      const oldIndex = orderedItems.findIndex((item) => item.id === active.id);
      const newIndex = orderedItems.findIndex((item) => item.id === over.id);

      // Update the ordered items state
      const newOrderedItems = arrayMove(orderedItems, oldIndex, newIndex);
      setOrderedItems(newOrderedItems);

      // Update form values with new orders
      setValue(
        `questions.${id}.items`,
        newOrderedItems.map((item, index) => ({
          itemId: item.id,
          order: index + 1,
        }))
      );
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
        items={orderedItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {orderedItems.map((item, index) => (
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
