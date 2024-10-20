// GroupList.jsx
import React, { FC } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import TestConfigurationBullet from './TestConfigurationBullet';
import QuestionGroupBullet from './QuestionGroupBullet';
import { TestCreatorQuestionGroup } from '../../types/questionGroup';
import { useTestContext } from '../../store/storeContext';

interface GroupListProps {}

const GroupList: FC<GroupListProps> = () => {
  const questionGroups = useTestContext((state) => state.questionGroups);
  const isQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.isQuestionGroupConfiguratorOpen
  );
  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);
  const isSingleGroup = questionGroups.length <= 1;

  return (
    <Droppable
      droppableId="group-droppable"
      type="group"
      direction="horizontal"
    >
      {(provided) => (
        <div
          className={cn(
            'flex items-center space-x-4',
            isQuestionGroupConfiguratorOpen && 'col-start-1'
          )}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <TestConfigurationBullet />

          {!isSingleGroup && (
            <>
              {questionGroups.map((group, index) => (
                <DraggableGroupItem
                  key={group.id}
                  group={group}
                  index={index}
                />
              ))}
            </>
          )}
          {provided.placeholder}
          <Button
            className="cursor-default"
            onClick={addQuestionGroup}
          >
            {isSingleGroup ? 'Podziel test na grupy' : 'Dodaj Grupę Pytań'}
          </Button>
        </div>
      )}
    </Droppable>
  );
};

interface DraggableGroupItemProps {
  group: TestCreatorQuestionGroup;
  index: number;
}

const DraggableGroupItem: FC<DraggableGroupItemProps> = ({ group, index }) => (
  <Draggable
    draggableId={group.id}
    index={index}
  >
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <QuestionGroupBullet questionGroup={group} />
      </div>
    )}
  </Draggable>
);

export default GroupList;
