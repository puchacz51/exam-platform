import { useState } from 'react';

import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useTestContext } from '../store/storeContext';

export interface Question {
  id: string;
  text: string;
}

export interface QuestionGroup {
  id: string;
  title: string;
  questions: Question[];
}

const useDragDrop = () => {
  const questionGroups = useTestContext((state) => state.questionGroups);
  const setQuestionGroups = useTestContext((state) => state.setQuestionGroups);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id: string): string | null => {
    if (questionGroups.some((group) => group.id === id)) {
      return id;
    }
    return (
      questionGroups.find((group) =>
        group.questions.some((question) => question.id === id)
      )?.id || null
    );
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
    setActiveGroup(findContainer(active.id as string));
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string) || over.id;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setQuestionGroups((prev) => {
      const activeGroupIndex = prev.findIndex((g) => g.id === activeContainer);
      const overGroupIndex = prev.findIndex((g) => g.id === overContainer);

      if (activeGroupIndex === -1 || overGroupIndex === -1) return prev;

      const newGroups = [...prev];
      const activeGroup = { ...newGroups[activeGroupIndex] };
      const overGroup = { ...newGroups[overGroupIndex] };

      const activeQuestionIndex = activeGroup.questions.findIndex(
        (q) => q.id === active.id
      );

      if (activeQuestionIndex === -1) return prev;

      const [movedQuestion] = activeGroup.questions.splice(
        activeQuestionIndex,
        1
      );

      if (over.id === overContainer && overGroup.questions.length === 0) {
        overGroup.questions.push(movedQuestion);
      } else {
        const overQuestionIndex = overGroup.questions.findIndex(
          (q) => q.id === over.id
        );

        overGroup.questions.splice(
          overQuestionIndex >= 0
            ? overQuestionIndex
            : overGroup.questions.length,
          0,
          movedQuestion
        );
      }

      newGroups[activeGroupIndex] = activeGroup;
      newGroups[overGroupIndex] = overGroup;

      return newGroups;
    });

    setActiveGroup(overContainer);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string) || over.id;

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    if (activeContainer === overContainer) {
      setQuestionGroups((prev) => {
        const groupIndex = prev.findIndex((g) => g.id === activeContainer);
        if (groupIndex === -1) return prev;

        const newGroups = [...prev];
        const group = { ...newGroups[groupIndex] };
        const questions = [...group.questions];

        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          group.questions = arrayMove(questions, oldIndex, newIndex);
          newGroups[groupIndex] = group;
          return newGroups;
        }

        return prev;
      });
    } else {
      setQuestionGroups((prev) => {
        const activeGroupIndex = prev.findIndex(
          (g) => g.id === activeContainer
        );
        const overGroupIndex = prev.findIndex((g) => g.id === overContainer);

        if (activeGroupIndex === -1 || overGroupIndex === -1) return prev;

        const newGroups = [...prev];
        const activeGroup = { ...newGroups[activeGroupIndex] };
        const overGroup = { ...newGroups[overGroupIndex] };

        const activeQuestionIndex = activeGroup.questions.findIndex(
          (q) => q.id === active.id
        );

        if (activeQuestionIndex === -1) return prev;

        const [movedQuestion] = activeGroup.questions.splice(
          activeQuestionIndex,
          1
        );
        overGroup.questions.push(movedQuestion);

        newGroups[activeGroupIndex] = activeGroup;
        newGroups[overGroupIndex] = overGroup;

        return newGroups;
      });
    }

    setActiveId(null);
    setActiveGroup(null);
  };

  return {
    items: questionGroups,
    activeId,
    activeGroup,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragDrop;
