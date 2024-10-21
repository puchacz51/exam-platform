import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';

import { InsertTest } from '@schema/test';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

import { TestCreatorQuestion } from '../types/question';
import { TestCreatorQuestionGroup } from '../types/questionGroup';

export type TestCreatorAnswer = {
  text: string;
  isCorrect?: boolean;
};

type Test = Omit<InsertTest, 'questions' | 'id'>;

export interface TestProps {
  testConfiguration: TestConfiguration;
  test: Test;
  questionGroups: TestCreatorQuestionGroup[];
  currentQuestion: TestCreatorQuestion | null | EmptyObject;
  currentQuestionGroupId: string | null;
  isTestConfiguratorShowed: boolean;
  isQuestionConfiguratorOpen: boolean;
  isQuestionGroupConfiguratorOpen: boolean;
  isAddedGeneralConfiguration: boolean;
}

export interface TestState extends TestProps {
  setTest: (test: Omit<Test, 'questions'>) => void;
  addQuestionGroup: () => void;
  updateQuestionGroup: (group: TestCreatorQuestionGroup) => void;
  removeQuestionGroup: (groupId: string) => void;
  addQuestion: (question: TestCreatorQuestion, groupId?: string | null) => void;
  updateQuestion: (
    groupId: string,
    questionId: string,
    question: TestCreatorQuestion
  ) => void;
  removeQuestion: (groupId: string, questionId: string) => void;
  resetTest: () => void;
  setIsTestConfiguratorShowed: (isOpen: boolean) => void;
  setIsQuestionConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionGroupConfiguratorOpen: (isOpen: boolean) => void;
  setCurrentQuestion: (groupId: string, questionId: string) => void;
  setCurrentQuestionGroup: (groupId: string) => void;
  setQuestionGroups: (questionGroups: TestCreatorQuestionGroup[]) => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: '',
    description: '',
    accessType: 'PUBLIC',
  },
  questionGroups: [],
  currentQuestion: null,
  currentQuestionGroupId: null,
  isTestConfiguratorShowed: true,
  isQuestionConfiguratorOpen: false,
  isQuestionGroupConfiguratorOpen: false,
  isAddedGeneralConfiguration: false,
};

const createTestStore = (initProps: Partial<TestProps> = {}) =>
  create<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setTest: (newTestData: Omit<Test, 'questions'>) =>
      set((state) => ({
        test: {
          ...state.test,
          ...newTestData,
        },
        isAddedGeneralConfiguration: true,
      })),
    addQuestionGroup: () =>
      set((state) => {
        const newGroup = {
          id: `group-${Date.now()}`,
          name: 'test',
          order: state.questionGroups.length + 1,
          maxQuestionPerPage: 1,
          questions: [],
        };

        return {
          questionGroups: [...state.questionGroups, newGroup],
          currentQuestionGroupId: newGroup.id,
        };
      }),
    updateQuestionGroup: (group) => {
      const groupId = group.id;
      return set((state) => ({
        questionGroups: state.questionGroups.map((g) =>
          g.id === groupId ? { ...g, ...group } : g
        ),
      }));
    },
    removeQuestionGroup: (groupId) =>
      set((state) => ({
        questionGroups: state.questionGroups.filter((g) => g.id !== groupId),
      })),
    addQuestion: (question) =>
      set((state) => {
        if (state.questionGroups.length === 0) {
          return {
            questionGroups: [
              {
                id: `group-${Date.now()}`,
                name: 'test',
                order: state.questionGroups.length + 1,
                maxQuestionPerPage: 1,
                questions: [question],
              },
            ],
          };
        }

        return {
          questionGroups: state.questionGroups.map((g) =>
            g.id === question.groupId
              ? { ...g, questions: [...(g.questions || []), question] }
              : g
          ),
          currentQuestion: question,
        };
      }),
    updateQuestion: (groupId, questionId, question) =>
      set((state) => ({
        questionGroups: state.questionGroups.map((g) =>
          g.id === groupId
            ? {
                ...g,
                questions: g.questions?.map((q) =>
                  q.id === questionId ? question : q
                ),
              }
            : g
        ),
      })),
    removeQuestion: (groupId, questionId) =>
      set((state) => ({
        questionGroups: state.questionGroups.map((g) =>
          g.id === groupId
            ? {
                ...g,
                questions: g.questions?.filter((q) => q.id !== questionId),
              }
            : g
        ),
      })),
    resetTest: () => set({ test: DEFAULT_PROPS.test, questionGroups: [] }),
    setIsTestConfiguratorShowed: (isOpen) =>
      set({ isTestConfiguratorShowed: isOpen }),
    setIsQuestionConfiguratorOpen: (isOpen) =>
      set({ isQuestionConfiguratorOpen: isOpen }),
    setIsQuestionGroupConfiguratorOpen: (isOpen) =>
      set({ isQuestionGroupConfiguratorOpen: isOpen }),
    setCurrentQuestion: (groupId, questionId) =>
      set((state) => ({
        currentQuestion:
          state.questionGroups
            ?.find((g) => g.id === groupId)
            ?.questions?.find((q) => q.id === questionId) || null,
        currentQuestionGroupId:
          state.questionGroups.find((g) => g.id === groupId)?.id || null,
      })),
    setCurrentQuestionGroup: (groupId) =>
      set((state) => ({
        currentQuestionGroupId:
          state.questionGroups.find((g) => g.id === groupId)?.id || null,
      })),
    setQuestionGroups: (questionGroups) => set({ questionGroups }),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
