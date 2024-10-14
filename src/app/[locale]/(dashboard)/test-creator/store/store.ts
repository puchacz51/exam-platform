import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';

import { InsertQuestion } from '@schema/questions';
import { InsertTest } from '@schema/test';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

export type TestCreatorAnswer = {
  text: string;
  isCorrect?: boolean;
};

export type TestCreatorQuestion = InsertQuestion & {
  answers: TestCreatorAnswer[];
};

export type QuestionGroup = {
  id: string;
  name: string;
  order: number;
  maxQuestionPerPage: number;
  questions: TestCreatorQuestion[];
};

type Test = Omit<InsertTest, 'questions' | 'id'>;

export interface TestProps {
  testConfiguration: TestConfiguration;
  test: Test;
  questionGroups: QuestionGroup[];
  currentQuestion: TestCreatorQuestion | null | EmptyObject;
  currentQuestionGroup: QuestionGroup | null;
  isTestConfiguratorOpen: boolean;
  isQuestionConfiguratorOpen: boolean;
  isQuestionGroupConfiguratorOpen: boolean;
}

export interface TestState extends TestProps {
  setTest: (test: Omit<Test, 'questions'>) => void;
  addQuestionGroup: () => void;
  updateQuestionGroup: (groupId: string, group: Partial<QuestionGroup>) => void;
  removeQuestionGroup: (groupId: string) => void;
  addQuestion: (question: TestCreatorQuestion, groupId?: string | null) => void;
  updateQuestion: (
    groupId: string,
    questionId: string,
    question: Partial<TestCreatorQuestion>
  ) => void;
  removeQuestion: (groupId: string, questionId: string) => void;
  resetTest: () => void;
  setIsTestConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionGroupConfiguratorOpen: (isOpen: boolean) => void;
  setCurrentQuestion: (groupId: string, questionId: string) => void;
  setCurrentQuestionGroup: (groupId: string) => void;
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
  currentQuestionGroup: null,
  isTestConfiguratorOpen: true,
  isQuestionConfiguratorOpen: false,
  isQuestionGroupConfiguratorOpen: false,
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
          currentQuestionGroup: newGroup,
        };
      }),
    updateQuestionGroup: (groupId, group) =>
      set((state) => ({
        questionGroups: state.questionGroups.map((g) =>
          g.id === groupId ? { ...g, ...group } : g
        ),
      })),
    removeQuestionGroup: (groupId) =>
      set((state) => ({
        questionGroups: state.questionGroups.filter((g) => g.id !== groupId),
      })),
    addQuestion: (question, groupId = null) =>
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
            g.id === groupId
              ? { ...g, questions: [...g.questions, question] }
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
                questions: g.questions.map((q) =>
                  q.id === questionId ? { ...q, ...question } : q
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
                questions: g.questions.filter((q) => q.id !== questionId),
              }
            : g
        ),
      })),
    resetTest: () => set({ test: DEFAULT_PROPS.test, questionGroups: [] }),
    setIsTestConfiguratorOpen: (isOpen) =>
      set({ isTestConfiguratorOpen: isOpen }),
    setIsQuestionConfiguratorOpen: (isOpen) =>
      set({ isQuestionConfiguratorOpen: isOpen }),
    setIsQuestionGroupConfiguratorOpen: (isOpen) =>
      set({ isQuestionGroupConfiguratorOpen: isOpen }),
    setCurrentQuestion: (groupId, questionId) =>
      set((state) => ({
        currentQuestion:
          state.questionGroups
            .find((g) => g.id === groupId)
            ?.questions.find((q) => q.id === questionId) || null,
        currentQuestionGroup:
          state.questionGroups.find((g) => g.id === groupId) || null,
      })),
    setCurrentQuestionGroup: (groupId) =>
      set((state) => ({
        currentQuestionGroup:
          state.questionGroups.find((g) => g.id === groupId) || null,
      })),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
