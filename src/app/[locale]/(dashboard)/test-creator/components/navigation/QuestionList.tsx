import { FC } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import { cn } from '@/lib/utils';

import { useTestContext } from '../../store/storeContext';
import QuestionBullet from './QuestionBullet';
import { TestCreatorQuestion } from '../../types/question';

const QuestionList = () => {
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const isQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.isQuestionGroupConfiguratorOpen
  );
  const questionGroups = useTestContext((state) => state.questionGroups);
  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );
  const hasQuestions = (currentQuestionGroup?.questions?.length || 0) > 0;

  return (
    <Droppable
      droppableId="question-droppable"
      type="question"
    >
      {(provided) => (
        <div
          className={cn(
            'flex flex-col space-y-4',
            isQuestionGroupConfiguratorOpen && 'col-start-1'
          )}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {!hasQuestions ? (
            <p className="text-gray-500">Lista pytań jest pusta</p>
          ) : (
            currentQuestionGroup?.questions?.map((question, index) => (
              <DraggableQuestionItem
                key={question.id}
                question={question}
                index={index}
              />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

interface DraggableQuestionItemProps {
  question: TestCreatorQuestion;
  index: number;
}

const DraggableQuestionItem: FC<DraggableQuestionItemProps> = ({
  question,
  index,
}) => (
  <Draggable
    draggableId={question.id}
    index={index}
  >
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <QuestionBullet
          questionNumber={index + 1}
          isActive={false}
        />
      </div>
    )}
  </Draggable>
);

export default QuestionList;
