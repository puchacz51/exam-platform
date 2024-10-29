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
  isSortFormOpen: boolean;
}
type Updater<T> = T | ((prev: T) => T);

export interface TestState extends TestProps {
  setTest: (test: Updater<Omit<Test, 'questions'>>) => void;
  addQuestionGroup: () => void;
  updateQuestionGroup: (group: TestCreatorQuestionGroup) => void;
  removeQuestionGroup: (groupId: string) => void;
  addQuestion: (question: TestCreatorQuestion) => void;
  updateQuestion: (
    groupId: string,
    questionId: string,
    question: TestCreatorQuestion
  ) => void;
  resetTest: () => void;
  setIsAddedGeneralConfiguration: (isAdded: Updater<boolean>) => void;
  setIsTestConfiguratorShowed: (isOpen: Updater<boolean>) => void;
  setIsQuestionConfiguratorOpen: (isOpen: Updater<boolean>) => void;
  setIsQuestionGroupConfiguratorOpen: (isOpen: Updater<boolean>) => void;
  setCurrentQuestion: (groupId: string, questionId: string) => void;
  setCurrentQuestionGroup: (groupId: string) => void;
  setQuestionGroups: (
    questionGroups: Updater<TestCreatorQuestionGroup[]>
  ) => void;
  setIsSortFormOpen: (isOpen: Updater<boolean>) => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: 'Sample Test',
    description: 'A test to assess knowledge on various subjects.',
    accessType: 'PUBLIC',
    categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
    accessCode: '',
  },
  questionGroups: [
    {
      id: 'group-1730041489794',
      name: 'General Knowledge',
      order: 1,
      maxQuestionPerPage: 2,
      questions: [
        {
          id: 'e92fa3a8d47ce512ba0266e3f09918f3',
          text: 'What is the capital of France?',
          questionType: 'SINGLE_CHOICE',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 5,
          answers: [
            { text: 'London', isCorrect: false },
            { text: 'Paris', isCorrect: true },
            { text: 'Rome', isCorrect: false },
          ],
          groupId: 'group-1730041489794',
        },
        {
          id: 'ebd62adab030841b7abd793cfd638afb',
          text: 'Describe the process of photosynthesis.',
          questionType: 'OPEN',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 10,
          groupId: 'group-1730041489794',
        },
        {
          id: 'q1',
          text: 'What is the largest planet in our Solar System?',
          questionType: 'SINGLE_CHOICE',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 5,
          answers: [
            { text: 'Earth', isCorrect: false },
            { text: 'Jupiter', isCorrect: true },
            { text: 'Mars', isCorrect: false },
          ],
          groupId: 'group-1730041489794',
        },
        {
          id: 'q7',
          text: 'Calculate the square root of 16.',
          questionType: 'NUMERIC',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 3,
          correctAnswer: 4,
          tolerance: 0.1,
          groupId: 'group-1730041489794',
        },
      ],
    },
    {
      id: 'group-1730041490000',
      name: 'Science Basics',
      order: 2,
      maxQuestionPerPage: 2,
      questions: [
        {
          id: 'q2',
          text: 'What is the boiling point of water at sea level?',
          questionType: 'SINGLE_CHOICE',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 5,
          answers: [
            { text: '100°C', isCorrect: true },
            { text: '50°C', isCorrect: false },
            { text: '0°C', isCorrect: false },
          ],
          groupId: 'group-1730041490000',
        },
        {
          id: 'q3',
          text: 'Define gravity.',
          questionType: 'OPEN',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 7,
          groupId: 'group-1730041490000',
        },
        {
          id: 'q4',
          text: 'What is the symbol for the element oxygen?',
          questionType: 'SINGLE_CHOICE',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 5,
          answers: [
            { text: 'O', isCorrect: true },
            { text: 'H', isCorrect: false },
            { text: 'N', isCorrect: false },
          ],
          groupId: 'group-1730041490000',
        },
        {
          id: 'q8',
          text: 'Arrange the planets by distance from the sun, starting with the closest.',
          questionType: 'ORDER',
          isPublic: true,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 4,
          orderItems: [
            { text: 'Mercury', order: 1 },
            { text: 'Venus', order: 2 },
            { text: 'Earth', order: 3 },
            { text: 'Mars', order: 4 },
          ],
          groupId: 'group-1730041490000',
        },
      ],
    },
    {
      id: 'group-1730041490100',
      name: 'Mathematics',
      order: 3,
      maxQuestionPerPage: 2,
      questions: [
        {
          id: 'q5',
          text: 'What is the value of π (pi) rounded to two decimal places?',
          questionType: 'SINGLE_CHOICE',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 5,
          answers: [
            { text: '3.14', isCorrect: true },
            { text: '3.15', isCorrect: false },
            { text: '3.13', isCorrect: false },
          ],
          groupId: 'group-1730041490100',
        },
        {
          id: 'q6',
          text: 'Explain the Pythagorean theorem.',
          questionType: 'OPEN',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 10,
          groupId: 'group-1730041490100',
        },
        {
          id: 'q9',
          text: 'What is 12 times 12?',
          questionType: 'NUMERIC',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 3,
          correctAnswer: 144,
          tolerance: 0,
          groupId: 'group-1730041490100',
        },
        {
          id: 'q10',
          text: 'Order the numbers from smallest to largest: 8, 1, 7, 3.',
          questionType: 'ORDER',
          isPublic: false,
          categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
          points: 4,
          orderItems: [
            { text: '1', order: 1 },
            { text: '3', order: 2 },
            { text: '7', order: 3 },
            { text: '8', order: 4 },
          ],
          groupId: 'group-1730041490100',
        },
      ],
    },
  ],
  currentQuestion: null,
  currentQuestionGroupId: null,
  isTestConfiguratorShowed: false,
  isQuestionConfiguratorOpen: false,
  isQuestionGroupConfiguratorOpen: false,
  isAddedGeneralConfiguration: true,
  isSortFormOpen: false,
};
const applyUpdater = <T>(value: T, updater: Updater<T>): T =>
  typeof updater === 'function' ? (updater as (prev: T) => T)(value) : updater;

const createTestStore = (initProps: Partial<TestProps> = {}) =>
  create<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    setTest: (newTestData) =>
      set((prev) => ({
        ...prev,
        test: applyUpdater(prev.test, newTestData),
      })),

    addQuestionGroup: () =>
      set((prev) => {
        const newGroup = {
          id: `group-${Date.now()}`,
          name: 'test',
          order: prev.questionGroups.length + 1,
          maxQuestionPerPage: 1,
          questions: [],
        };

        return {
          ...prev,
          questionGroups: [...prev.questionGroups, newGroup],
          currentQuestionGroupId: newGroup.id,
        };
      }),

    updateQuestionGroup: (group) =>
      set((prev) => ({
        ...prev,
        questionGroups: prev.questionGroups.map((g) =>
          g.id === group.id ? { ...g, ...group } : g
        ),
      })),

    removeQuestionGroup: (groupId) =>
      set((prev) => ({
        ...prev,
        questionGroups: prev.questionGroups.filter((g) => g.id !== groupId),
      })),

    addQuestion: (question) =>
      set((prev) => {
        if (prev.questionGroups.length === 0) {
          const newGroup = {
            id: `group-${Date.now()}`,
            name: 'test',
            order: 1,
            maxQuestionPerPage: 1,
            questions: [question],
          };
          return { ...prev, questionGroups: [newGroup] };
        }

        return {
          ...prev,
          questionGroups: prev.questionGroups.map((g) =>
            g.id === question.groupId
              ? { ...g, questions: [...g.questions, question] }
              : g
          ),
          currentQuestion: question,
        };
      }),

    updateQuestion: (groupId, questionId, question) =>
      set((prev) => ({
        ...prev,
        questionGroups: prev.questionGroups.map((g) =>
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

    resetTest: () => set({ test: DEFAULT_PROPS.test, questionGroups: [] }),

    setIsTestConfiguratorShowed: (isOpen) =>
      set((prev) => ({
        ...prev,
        isTestConfiguratorShowed: applyUpdater(
          prev.isTestConfiguratorShowed,
          isOpen
        ),
      })),

    setIsAddedGeneralConfiguration: (isAdded) =>
      set((prev) => ({
        ...prev,
        isAddedGeneralConfiguration: applyUpdater(
          prev.isAddedGeneralConfiguration,
          isAdded
        ),
      })),

    setIsQuestionConfiguratorOpen: (isOpen) =>
      set((prev) => ({
        ...prev,
        isQuestionConfiguratorOpen: applyUpdater(
          prev.isQuestionConfiguratorOpen,
          isOpen
        ),
      })),

    setIsQuestionGroupConfiguratorOpen: (isOpen) =>
      set((prev) => ({
        ...prev,
        isQuestionGroupConfiguratorOpen: applyUpdater(
          prev.isQuestionGroupConfiguratorOpen,
          isOpen
        ),
      })),

    setCurrentQuestion: (groupId, questionId) =>
      set((prev) => ({
        ...prev,
        currentQuestion:
          prev.questionGroups
            .find((g) => g.id === groupId)
            ?.questions.find((q) => q.id === questionId) || null,
        currentQuestionGroupId:
          prev.questionGroups.find((g) => g.id === groupId)?.id || null,
      })),

    setCurrentQuestionGroup: (groupId) =>
      set((prev) => ({
        ...prev,
        currentQuestionGroupId:
          prev.questionGroups.find((g) => g.id === groupId)?.id || null,
      })),

    setQuestionGroups: (questionGroups) =>
      set((prev) => ({
        ...prev,
        questionGroups: applyUpdater(prev.questionGroups, questionGroups),
      })),

    setIsSortFormOpen: (isOpen) =>
      set((prev) => ({
        ...prev,
        isSortFormOpen: applyUpdater(prev.isSortFormOpen, isOpen),
      })),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
