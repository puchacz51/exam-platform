import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TestCreatorQuestion } from '@/app/[locale]/(dashboard)/test-creator/types/question';

interface SortableQuestionProps {
  question: TestCreatorQuestion;
  groupId: string;
}

const SortableQuestion: React.FC<SortableQuestionProps> = ({
  question,
  groupId,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `${groupId}-${question.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded border bg-white p-2"
    >
      {question.text}
    </div>
  );
};

export default SortableQuestion;
