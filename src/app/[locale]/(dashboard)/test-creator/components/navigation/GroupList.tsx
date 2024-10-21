// GroupList.jsx
import React, { FC } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import TestConfigurationBullet from './TestConfigurationBullet';
import QuestionGroupBullet from './QuestionGroupBullet';
import { useTestContext } from '../../store/storeContext';

interface GroupListProps {}

const GroupList: FC<GroupListProps> = () => {
  const questionGroups = useTestContext((state) => state.questionGroups);
  const isQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.isQuestionGroupConfiguratorOpen
  );
  const isInitialConfig = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );
  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);
  const isSingleGroup = questionGroups.length <= 1;

  return (
    <Droppable
      droppableId="groups"
      type="group"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <div
          className={cn(
            'flex min-h-[60px] items-center space-x-4',
            isQuestionGroupConfiguratorOpen && 'col-start-1',
            snapshot.isDraggingOver && 'rounded-lg bg-gray-50'
          )}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <TestConfigurationBullet />
          {!isSingleGroup &&
            questionGroups.map((group, index) => (
              <Draggable
                key={group.id}
                draggableId={group.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      'transition-transform',
                      snapshot.isDragging && 'scale-105'
                    )}
                  >
                    <QuestionGroupBullet questionGroup={group} />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
          {isInitialConfig && (
            <Button
              className="cursor-pointer whitespace-nowrap"
              onClick={addQuestionGroup}
            >
              {isSingleGroup ? 'Podziel test na grupy' : 'Dodaj Grupę Pytań'}
            </Button>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default GroupList;
