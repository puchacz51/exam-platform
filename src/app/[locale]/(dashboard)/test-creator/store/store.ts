import { create } from 'zustand';
import { EmptyObject } from 'react-hook-form';
import { z } from 'zod';

import { TestConfiguration } from '@actions/test/getTestConfiguration';
import { TestCreatorQuestion } from '@/types/test-creator/question';
import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';
import { mathTest } from '@/app/[locale]/(dashboard)/test-creator/store/samples';
import { Question } from '@/types/test/questionTypes';

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
  isTestConfiguratorOpen: boolean;
  isQuestionConfiguratorOpen: boolean;
  isQuestionGroupConfiguratorOpen: boolean;
  isAddedGeneralConfiguration: boolean;
  isSortFormOpen: boolean;
  aiQuestions: Question[] | null;
  isAiGeneratorOpen: boolean;
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
  setIsTestConfiguratorOpen: (isOpen: Updater<boolean>) => void;
  setIsQuestionConfiguratorOpen: (isOpen: Updater<boolean>) => void;
  setIsQuestionGroupConfiguratorOpen: (isOpen: Updater<boolean>) => void;
  setCurrentQuestion: (
    currentQuestion: {
      groupId: string;
      questionId: string;
    } | null
  ) => void;
  setCurrentQuestionGroup: (groupId: string) => void;
  setQuestionGroups: (
    questionGroups: Updater<TestCreatorQuestionGroup[]>
  ) => void;
  setIsSortFormOpen: (isOpen: Updater<boolean>) => void;
  setAiQuestions: (questions: Question[] | null) => void;
  clearAiQuestions: () => void;
  setIsAiGeneratorOpen: (isOpen: Updater<boolean>) => void;
}

const DEFAULT_PROPS: TestProps = {
  testConfiguration: { categories: [] },
  test: {
    title: '',
    description: '',
    settings: {
      navigationMode: 'FREE',
      allowGoBack: true,
      confirmBeforeGroupChange: true,
      scoringSystem: 'STANDARD',
      allowPartialPoints: true,
      shuffleQuestionsInGroup: false,
      shuffleAnswers: false,
      showProgressBar: true,
      showTimeRemaining: true,
      showQuestionPoints: true,
      allowQuestionFlagging: true,
      showCorrectAnswers: false,
      showPointsPerQuestion: true,
      showFinalScore: true,
      questionDisplayMode: 'GROUP',
    },
  },
  questionGroups: [
    {
      id: 'group-1',
      name: 'test',
      order: 1,
      questions: [...mathTest],
    },
  ],
  currentQuestion: null,
  currentQuestionGroupId: null,
  isTestConfiguratorOpen: false,
  isQuestionConfiguratorOpen: false,
  isQuestionGroupConfiguratorOpen: false,
  isAddedGeneralConfiguration: false,
  isSortFormOpen: false,
  aiQuestions: null,
  isAiGeneratorOpen: false,
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
          currentQuestionGroupId: prev.currentQuestionGroupId || newGroup.id,
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

    setIsTestConfiguratorOpen: (isOpen) =>
      set((prev) => ({
        ...prev,
        isTestConfiguratorOpen: applyUpdater(
          prev.isTestConfiguratorOpen,
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

    setCurrentQuestion: (currentQuestion) =>
      set((prev) => ({
        ...prev,
        currentQuestion:
          (!!currentQuestion &&
            prev.questionGroups
              .find((g) => g.id === currentQuestion.groupId)
              ?.questions.find((q) => q.id === currentQuestion.questionId)) ||
          null,
        currentQuestionGroupId:
          (!!currentQuestion &&
            prev.questionGroups.find((g) => g.id === currentQuestion.groupId)
              ?.id) ||
          prev.currentQuestionGroupId,
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

    setAiQuestions: (questions) =>
      set((prev) => ({
        ...prev,
        aiQuestions: questions,
      })),

    clearAiQuestions: () =>
      set((prev) => ({
        ...prev,
        aiQuestions: null,
      })),

    setIsAiGeneratorOpen: (isOpen) =>
      set((prev) => ({
        ...prev,
        isAiGeneratorOpen: applyUpdater(prev.isAiGeneratorOpen, isOpen),
      })),
  }));

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
