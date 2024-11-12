import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

const SINGLE_CHOICE = {
  text: 'What is the capital of Poland?',
  questionType: 'SINGLE_CHOICE',
  points: 2,
  answers: [
    {
      text: 'Warsaw',
      isCorrect: true,
    },
    {
      text: 'Krakow',
      isCorrect: false,
    },
    {
      text: 'Wroclaw',
      isCorrect: false,
    },
    {
      text: 'Gdansk',
      isCorrect: false,
    },
  ],
};

const MULTIPLE_CHOICE = {
  text: 'Which of the following are cities in Poland?',
  questionType: 'MULTIPLE_CHOICE',
  points: 2,
  answers: [
    {
      text: 'Warsaw',
      isCorrect: true,
    },
    {
      text: 'Krakow',
      isCorrect: true,
    },
    {
      text: 'Wroclaw',
      isCorrect: true,
    },
    {
      text: 'Gdansk',
      isCorrect: true,
    },
  ],
};

const ORDER = {
  text: 'Put the following cities in order from north to south',
  questionType: 'ORDER',
  points: 2,
  orderItems: [
    {
      text: 'Gdansk',
      order: 1,
    },
    {
      text: 'Warsaw',
      order: 2,
    },
    {
      text: 'Krakow',
      order: 3,
    },
    {
      text: 'Wroclaw',
      order: 4,
    },
  ],
};

const OPEN = {
  text: 'Describe a time when you had to work with a difficult team member. How did you handle the situation?',
  questionType: 'OPEN',
  points: 5,
  answers: [
    {
      text: 'I had a team member who was always late to our meetings. I talked to him about it and we agreed to meet 15 minutes earlier. After that, he was always on time.',
      isCorrect: true,
    },
  ],
};

const BOOLEAN = {
  text: 'Is the sky blue?',
  questionType: 'BOOLEAN',
  points: 1,
  correctAnswer: true,
};

const NUMERIC = {
  text: 'What is 2 + 2?',
  questionType: 'NUMERIC',
  points: 1,
  correctAnswer: 4,
};

const BOOLEAN_GROUP = {
  text: 'Which of the following are fruits?',
  questionType: 'BOOLEAN_GROUP',
  points: 2,
  subQuestions: [
    {
      text: 'Apple',
      correctAnswer: true,
    },
    {
      text: 'Carrot',
      correctAnswer: false,
    },
    {
      text: 'Banana',
      correctAnswer: true,
    },
    {
      text: 'Potato',
      correctAnswer: false,
    },
  ],
};

const NUMERIC_GROUP = {
  text: 'What is the sum of the following numbers?',
  questionType: 'NUMERIC_GROUP',
  points: 2,
  subQuestions: [
    {
      text: '2 + 2',
      correctAnswer: 4,
    },
    {
      text: '3 + 3',
      correctAnswer: 6,
    },
    {
      text: '4 + 4',
      correctAnswer: 8,
    },
    {
      text: '5 + 5',
      correctAnswer: 10,
    },
  ],
};

const MATCHING = {
  text: 'Match the following countries with their capitals',
  questionType: 'MATCHING',
  points: 3,
  matchingPairs: [
    {
      key: 'Poland',
      value: 'Warsaw',
    },
    {
      key: 'Germany',
      value: 'Berlin',
    },
    {
      key: 'France',
      value: 'Paris',
    },
    {
      key: 'Italy',
      value: 'Rome',
    },
  ],
};

const exampleQuestionJson = {
  SINGLE_CHOICE: JSON.stringify(SINGLE_CHOICE, null, 2),
  MULTIPLE_CHOICE: JSON.stringify(MULTIPLE_CHOICE, null, 2),
  ORDER: JSON.stringify(ORDER, null, 2),
  OPEN: JSON.stringify(OPEN, null, 2),
  BOOLEAN: JSON.stringify(BOOLEAN, null, 2),
  NUMERIC: JSON.stringify(NUMERIC, null, 2),
  BOOLEAN_GROUP: JSON.stringify(BOOLEAN_GROUP, null, 2),
  NUMERIC_GROUP: JSON.stringify(NUMERIC_GROUP, null, 2),
  MATCHING: JSON.stringify(MATCHING, null, 2),
};

export const getQuestionSchemas = (
  questionTypes: QuestionType['questionType'][]
) => {
  const schemas: Record<string, string> = {};
  questionTypes.forEach((questionType) => {
    schemas[questionType] = exampleQuestionJson[questionType];
  });
  return schemas;
};
