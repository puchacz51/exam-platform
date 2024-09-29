import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';

import { InsertQuestion } from '@schema/questions';
import { InsertTest } from '@schema/test';
import { InsertAnswer } from '@schema/answers';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

export type TestCreatorQuestion = InsertQuestion & {
  answers: Omit<InsertAnswer, 'questionID'>[];
};
type Test = InsertTest & { questions: TestCreatorQuestion[] };

export interface TestProps {
  testConfiguration: TestConfiguration;
  test: Test;
  currentQuestion: TestCreatorQuestion | null | EmptyObject;
  isTestConfiguratorOpen: boolean;
  isQuestionConfiguratorOpen: boolean;
}

export interface TestState extends TestProps {
  setTest: (test: Omit<Test, 'questions'>) => void;
  addQuestion: (question: TestCreatorQuestion) => void;
  updateQuestion: (
    index: number,
    question: Partial<TestCreatorQuestion>
  ) => void;
  removeQuestion: (index: number) => void;
  resetTest: () => void;
  openQuestion: () => void;
  setIsTestConfiguratorOpen: (isOpen: boolean) => void;
  setIsQuestionConfiguratorOpen: (isOpen: boolean) => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: '',
    description: '',
    categoryID: null,
    accessType: 'PUBLIC',
    questions: [],
  },
  currentQuestion: null,
  isTestConfiguratorOpen: true,
  isQuestionConfiguratorOpen: false,
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
    addQuestion: (question) =>
      set((state) => ({
        test: { ...state.test, questions: [...state.test.questions, question] },
      })),
    updateQuestion: (index, question) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.map((q, i) =>
            i === index ? { ...q, ...question } : q
          ),
        },
      })),
    removeQuestion: (index) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.filter((_, i) => i !== index),
        },
      })),
    resetTest: () => set({ test: DEFAULT_PROPS.test }),
    openQuestion: () => set({ currentQuestion: {} }),
    setIsTestConfiguratorOpen: (isOpen) =>
      set({ isTestConfiguratorOpen: isOpen }),
    setIsQuestionConfiguratorOpen: (isOpen) =>
      set({ isQuestionConfiguratorOpen: isOpen }),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
