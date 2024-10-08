import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';

import { InsertQuestion } from '@schema/questions';
import { InsertTest } from '@schema/test';
import { InsertAnswer } from '@schema/answers';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

export type TestCreatorQuestion = InsertQuestion & {
  answers: Omit<InsertAnswer, 'questionID'>[];
};

export type QuestionGroup = {
  id: string;
  name: string;
  order: number;
  maxQuestionPerPage: number;
  questions: TestCreatorQuestion[];
};

type Test = InsertTest;

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
  addQuestionGroup: (group: Omit<QuestionGroup, 'questions'>) => void;
  updateQuestionGroup: (groupId: string, group: Partial<QuestionGroup>) => void;
  removeQuestionGroup: (groupId: string) => void;
  addQuestion: (groupId: string, question: TestCreatorQuestion) => void;
  updateQuestion: (
    groupId: string,
    questionId: string,
    question: Partial<TestCreatorQuestion>
  ) => void;
  removeQuestion: (groupId: string, questionId: string) => void;
  resetTest: () => void;
  openQuestion: () => void;
  setIsTestConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionGroupConfiguratorOpen: (isOpen: boolean) => void;
  setCurrentQuestion: (groupId: string, questionId: string) => void;
  setCurrentQuestionGroup: (groupId: string) => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    id: '',
    title: '',
    description: '',
    categoryID: null,
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
    addQuestionGroup: (group) =>
      set((state) => ({
        questionGroups: [...state.questionGroups, { ...group, questions: [] }],
      })),
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
    addQuestion: (groupId, question) =>
      set((state) => ({
        questionGroups: state.questionGroups.map((g) =>
          g.id === groupId ? { ...g, questions: [...g.questions, question] } : g
        ),
      })),
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
    openQuestion: () => set({ currentQuestion: {} }),
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
