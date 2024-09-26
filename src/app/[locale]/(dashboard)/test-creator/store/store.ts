import { create } from 'zustand';

import { InsertQuestion } from '@schema/questions';
import { InsertTest } from '@schema/test';
import { InsertAnswer } from '@schema/answers';
import { TestConfiguration } from '@actions/test/getTestConfiguration';

export type TestCreatorQuestion = InsertQuestion & { answers: InsertAnswer[] };
type Test = InsertTest & { questions: TestCreatorQuestion[] };

export interface TestProps {
  testConfiguration: TestConfiguration;
  test: Test;
  currentQuestion: TestCreatorQuestion | null;
}

export interface TestState extends TestProps {
  setTest: (test: Partial<Test>) => void;
  addQuestion: (question: TestCreatorQuestion) => void;
  updateQuestion: (
    index: number,
    question: Partial<TestCreatorQuestion>
  ) => void;
  removeQuestion: (index: number) => void;
  addAnswer: (questionIndex: number, answer: InsertAnswer) => void;
  updateAnswer: (
    questionIndex: number,
    answerIndex: number,
    answer: Partial<InsertAnswer>
  ) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  resetTest: () => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: '',
    description: '',
    categoryID: null, // Changed from 0 to null
    accessType: 'public',
    questions: [],
  },
  currentQuestion: null,
};

const createTestStore = (initProps: Partial<TestProps> = {}) =>
  create<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setTest: (newTestData) =>
      set((state) => ({
        test: {
          ...state.test,
          ...newTestData,
          questions: newTestData.questions || state.test.questions,
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
    addAnswer: (questionIndex, answer) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.map((q, i) =>
            i === questionIndex ? { ...q, answers: [...q.answers, answer] } : q
          ),
        },
      })),
    updateAnswer: (questionIndex, answerIndex, answer) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.map((q, i) =>
            i === questionIndex
              ? {
                  ...q,
                  answers: q.answers.map((a, j) =>
                    j === answerIndex ? { ...a, ...answer } : a
                  ),
                }
              : q
          ),
        },
      })),
    removeAnswer: (questionIndex, answerIndex) =>
      set((state) => ({
        test: {
          ...state.test,
          questions: state.test.questions.map((q, i) =>
            i === questionIndex
              ? {
                  ...q,
                  answers: q.answers.filter((_, j) => j !== answerIndex),
                }
              : q
          ),
        },
      })),
    resetTest: () => set({ test: DEFAULT_PROPS.test }),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
