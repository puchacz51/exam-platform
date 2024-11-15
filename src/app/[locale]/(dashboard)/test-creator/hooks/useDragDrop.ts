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

import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

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

  const findContainer = (id: string | number): string | null => {
    const groupId = questionGroups.find(
      (group) => group.id === id.toString()
    )?.id;
    if (groupId) return groupId;

    return (
      questionGroups.find((group) =>
        group.questions.some((question) => question.id === id)
      )?.id || null
    );
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
    const container = findContainer(active.id);
    setActiveGroup(container as unknown as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    // Skip dragOver handling for groups
    if (active.data.current?.type === 'group') {
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeContainer = findContainer(activeId);
    const overContainer =
      over.data.current?.type === 'container'
        ? over.data.current.id
        : findContainer(overId);

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

      const [movedQuestion] = activeGroup.questions.splice(
        activeGroup.questions.findIndex((q) => q.id === activeId),
        1
      );

      overGroup.questions.push(movedQuestion);

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

    // Handle group reordering
    if (active.data.current?.type === 'group') {
      if (active.id !== over.id) {
        setQuestionGroups((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer =
      over.data.current?.type === 'container'
        ? over.id.toString()
        : findContainer(over.id);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    // Handling question sorting/moving
    if (activeContainer === overContainer) {
      setQuestionGroups((prev) => {
        const groupIndex = prev.findIndex((g) => g.id === activeContainer);
        if (groupIndex === -1) return prev;

        const newGroups = [...prev];
        const group = { ...newGroups[groupIndex] };
        const questions = [...group.questions];

        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);

        // Upewnij się, że oba indeksy istnieją
        if (oldIndex !== -1 && newIndex !== -1) {
          group.questions = arrayMove(questions, oldIndex, newIndex);
          newGroups[groupIndex] = group;
          return newGroups;
        }

        return prev;
      });
    }
    // Przenoszenie między grupami tylko jeśli kontenery są różne i istnieją
    else if (
      activeContainer &&
      overContainer &&
      activeContainer !== overContainer
    ) {
      setQuestionGroups((prev) => {
        const activeGroupIndex = prev.findIndex(
          (g) => g.id === activeContainer
        );
        const overGroupIndex = prev.findIndex((g) => g.id === overContainer);

        if (activeGroupIndex === -1 || overGroupIndex === -1) return prev;

        const newGroups = [...prev];
        const activeGroup = { ...newGroups[activeGroupIndex] };
        const overGroup = { ...newGroups[overGroupIndex] };

        const movedQuestionIndex = activeGroup.questions.findIndex(
          (q) => q.id === active.id
        );

        if (movedQuestionIndex === -1) return prev;

        const [movedQuestion] = activeGroup.questions.splice(
          movedQuestionIndex,
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
