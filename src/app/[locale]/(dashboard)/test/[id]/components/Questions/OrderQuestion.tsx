'use client';

import { FC, useState } from 'react';

import { useFormContext, UseFormGetValues } from 'react-hook-form';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
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

const getInitialOrderedItems = (
  mode: 'view' | 'solve',
  getValues: UseFormGetValues<TestAttemptFormDataOrder>,
  id: string,
  orderItems: OrderQuestionWithoutAnswer[]
) => {
  if (mode === 'solve') {
    const savedOrder = getValues(`questions.${id}.items`) as {
      itemId: string;
      position: number;
    }[];

    const savedOrderSorted = savedOrder
      ? (savedOrder
          .sort((a, b) => a.position - b.position)
          .map((item) =>
            orderItems.find((orderItem) => orderItem.id === item.itemId)
          ) as OrderQuestionWithoutAnswer[])
      : orderItems;

    return savedOrderSorted.length === orderItems.length
      ? savedOrderSorted
      : orderItems;
  }
  return orderItems;
};

const OrderQuestion: FC<OrderQuestionProps> = ({ question, mode = 'view' }) => {
  const { id } = question;
  const { setValue, getValues } = useFormContext<TestAttemptFormDataOrder>();

  const initialOrderedItems = getInitialOrderedItems(
    mode,
    getValues,
    id,
    question.orderItems as unknown as OrderQuestionWithoutAnswer[]
  );
  console.log(initialOrderedItems);
  const [orderedItems, setOrderedItems] = useState(initialOrderedItems);

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

      const newOrderedItems = arrayMove(orderedItems, oldIndex, newIndex);
      setOrderedItems(newOrderedItems);
      console.log(newOrderedItems);
      setValue(
        `questions.${id}.items`,
        newOrderedItems.map((item, index) => ({
          itemId: item.id,
          position: index + 1,
        }))
      );
    }
  };

  return (
    <div>
      {mode === 'solve'}
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
    </div>
  );
};

export default OrderQuestion;
