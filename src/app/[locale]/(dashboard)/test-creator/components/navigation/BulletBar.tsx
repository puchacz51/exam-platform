import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { cn } from '@/lib/utils';

import { useTestContext } from '../../store/storeContext';
import TestCreatorQuestionGroupForm from '../TestCreatorQuestionsGroupForm';
import { useDragEndHandler } from '../../hooks/useDragEndHandler';
import GroupList from './GroupList';
import QuestionList from './QuestionList';

const BulletBar = () => {
  const { currentQuestionGroup, isQuestionGroupConfiguratorOpen } =
    useTestContext((state) => state);

  const onDragEnd = useDragEndHandler();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={cn(
          'grid gap-6',
          isQuestionGroupConfiguratorOpen && 'md:grid-cols-2'
        )}
      >
        <GroupList />
        {currentQuestionGroup && <QuestionList />}
        {isQuestionGroupConfiguratorOpen && <TestCreatorQuestionGroupForm />}
      </div>
    </DragDropContext>
  );
};

export default BulletBar;
