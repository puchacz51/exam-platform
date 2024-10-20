import { DropResult } from 'react-beautiful-dnd';

import { useTestContext } from '../store/storeContext';

type UseDragEndHandler = () => (result: DropResult) => void;

export const useDragEndHandler: UseDragEndHandler = () => {
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroup
  );
  const questionGroups = useTestContext((state) => state.questionGroups);
  const setQuestionGroups = useTestContext((state) => state.setQuestionGroups);
  const updatedQuestionGroup = useTestContext(
    (state) => state.updateQuestionGroup
  );

  return (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'group') {
      const reorderedGroups = Array.from(questionGroups);
      const [removed] = reorderedGroups.splice(source.index, 1);
      reorderedGroups.splice(destination.index, 0, removed);
      setQuestionGroups(reorderedGroups);
      return;
    }

    if (type === 'question' && currentQuestionGroup) {
      const updatedQuestions = Array.from(currentQuestionGroup.questions || []);
      const [movedQuestion] = updatedQuestions.splice(source.index, 1);
      updatedQuestions.splice(destination.index, 0, movedQuestion);

      const updatedGroup = {
        ...currentQuestionGroup,
        questions: updatedQuestions,
      };

      updatedQuestionGroup(updatedGroup);
    }
  };
};
