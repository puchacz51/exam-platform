import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';
import { z } from 'zod';

import { TestConfiguration } from '@actions/test/getTestConfiguration';
import { TestCreatorQuestion } from '@/app/[locale]/(dashboard)/test-creator/types/question';
import { TestCreatorQuestionGroup } from '@/app/[locale]/(dashboard)/test-creator/types/questionGroup';
import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';

export type TestCreatorAnswer = {
  text: string;
  isCorrect?: boolean;
};

type Test = z.infer<typeof testSchema>;

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
    categoryId: '098b030e-0cbd-492a-a201-170e96c87a52',
    accessCode: '',
  },
  questionGroups: [
    {
      id: 'group-1730041489822',
      name: 'Science and Logic',
      order: 2,
      maxQuestionPerPage: 3,
      questions: [
        {
          id: 'q2',
          text: 'What is the boiling point of water at sea level?',
          questionType: 'NUMERIC',
          isPublic: true,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 3,
          correctAnswer: 100,
          tolerance: 0.5,
          groupId: 'group-1730041489822',
        },
        {
          id: 'q3',
          text: 'Identify the matching pairs of animals and their habitats.',
          questionType: 'MATCHING',
          isPublic: true,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 7,
          matchingPairs: [
            { key: 'Polar Bear', value: 'Arctic' },
            { key: 'Camel', value: 'Desert' },
            { key: 'Penguin', value: 'Antarctica' },
          ],
          groupId: 'group-1730041489822',
        },
        {
          id: 'q4',
          text: 'Put the planets in our solar system in order from the Sun.',
          questionType: 'ORDER',
          isPublic: true,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 8,
          orderItems: [
            { text: 'Mercury', order: 1 },
            { text: 'Venus', order: 2 },
            { text: 'Earth', order: 3 },
            { text: 'Mars', order: 4 },
            { text: 'Jupiter', order: 5 },
          ],
          groupId: 'group-1730041489822',
        },
        {
          id: 'q5',
          text: 'What is 15 divided by 3?',
          questionType: 'NUMERIC',
          isPublic: false,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 2,
          correctAnswer: 5,
          tolerance: 0.1,
          groupId: 'group-1730041489822',
        },
        {
          id: 'q6',
          text: 'True or False: Lightning never strikes the same place twice.',
          questionType: 'BOOLEAN',
          isPublic: true,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 1,
          correctAnswer: false,
          groupId: 'group-1730041489822',
        },
        {
          id: 'q8',
          text: 'What is the main gas found in the air we breathe?',
          questionType: 'SINGLE_CHOICE',
          isPublic: true,
          categoryId: '46b56f2a-9a45-46c9-b9b4-3494beb96e35',
          points: 5,
          answers: [
            { text: 'Oxygen', isCorrect: false },
            { text: 'Nitrogen', isCorrect: true },
            { text: 'Carbon Dioxide', isCorrect: false },
          ],
          groupId: 'group-1730041489822',
        },
      ],
    },
  ],
  currentQuestion: null,
  currentQuestionGroupId: 'group-1730041489822',
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
