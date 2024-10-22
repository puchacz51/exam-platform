// useDragDrop.ts
import { useState } from 'react';

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export interface Question {
  id: string;
  text: string;
}

export interface QuestionGroupData {
  name: string;
  items: Question[];
}

interface UseDragDropProps {
  initialItems: Record<string, QuestionGroupData>;
}

const useDragDrop = ({ initialItems }: UseDragDropProps) => {
  const [items, setItems] =
    useState<Record<string, QuestionGroupData>>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id: string) => {
    if (id in items) return id;
    for (const [groupId, group] of Object.entries(items)) {
      if (group.items.some((item) => item.id === id)) return groupId;
    }
    return null;
  };

  const handleDragStart = ({ active }: { active: { id: string } }) => {
    setActiveId(active.id);
    setActiveGroup(findContainer(active.id));
  };

  const handleDragOver = ({
    active,
    over,
  }: {
    active: { id: string };
    over: { id: string } | null;
  }) => {
    if (!over) return;

    const overId = over.id;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(overId) || overId;

    if (!overContainer || !activeContainer || activeContainer === overContainer)
      return;

    setItems((prev) => {
      const activeItems = [...prev[activeContainer].items];
      const overItems = [...prev[overContainer].items];
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id === overId);

      const item = activeItems[activeIndex];
      activeItems.splice(activeIndex, 1);

      if (overId in prev) {
        overItems.push(item);
      } else {
        overItems.splice(
          overIndex >= 0 ? overIndex : overItems.length,
          0,
          item
        );
      }

      return {
        ...prev,
        [activeContainer]: { ...prev[activeContainer], items: activeItems },
        [overContainer]: { ...prev[overContainer], items: overItems },
      };
    });

    setActiveGroup(overContainer);
  };

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: { id: string };
    over: { id: string } | null;
  }) => {
    if (!over) {
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id) || over.id;

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setActiveGroup(null);
      return;
    }

    if (activeContainer === overContainer) {
      const containerItems = items[activeContainer].items;
      const oldIndex = containerItems.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = containerItems.findIndex((item) => item.id === over.id);

      if (oldIndex !== newIndex && newIndex !== -1) {
        setItems((prev) => ({
          ...prev,
          [activeContainer]: {
            ...prev[activeContainer],
            items: arrayMove(containerItems, oldIndex, newIndex),
          },
        }));
      }
    }

    setActiveId(null);
    setActiveGroup(null);
  };

  return {
    items,
    activeId,
    activeGroup,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragDrop;
