import { create } from 'zustand';

import { InsertQuestion } from '@schema/questions';
import { InsertTest } from '@schema/test';
import { InsertAnswer } from '@schema/answers';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

type Answer = InsertAnswer;
type Question = InsertQuestion & { answers: Answer[] };
type Test = InsertTest & { questions: Question[] };

export interface TestProps {
  testConfiguration: TestConfiguration;
  test: Test;
}

export interface TestState extends TestProps {
  setTest: (test: Partial<Test>) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  resetTest: () => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: '',
    description: '',
    categoryID: 0,
    accessType: 'public',
    questions: [],
  },
};

const createTestStore = (initProps: Partial<TestProps> = {}) =>
  create<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setTest: (newTestData) =>
      set((state) => ({ test: { ...state.test, ...newTestData } })),
    addQuestion: (question) =>
      set((state) => ({
        test: { ...state.test, questions: [...state.test.questions, question] },
      })),
    updateQuestion: (index, question) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.map((q, i) =>
            i === index ? question : q
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
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
