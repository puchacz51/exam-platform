
import { Question } from '../schemas/questionTypeSchema';
import { randomBytes } from 'crypto';

const generateId = () => randomBytes(20).toString('hex');

export const questionGroups0911 = [
  {
    id: generateId(),
    name: "Podstawy programowania",
    order: 0,
    maxQuestionPerPage: 2,
  },
  {
    id: generateId(),
    name: "Struktury danych",
    order: 1,
    maxQuestionPerPage: 3,
  },
  {
    id: generateId(),
    name: "Algorytmy",
    order: 2,
    maxQuestionPerPage: 2,
  },
];

export const questions: Record<string, Question[]> = {
  [questionGroups[0].id]: [
    {
      id: generateId(),
      text: "Co to jest zmienna?",
      questionType: "OPEN",
      isPublic: true,
      categoryId: "prog-basics",
      points: 2,
      answers: [
        { text: "Zmienna to nazwany obszar pamięci służący do przechowywania danych" }
      ]
    },
    {
      id: generateId(),
      text: "Który typ danych służy do przechowywania liczb całkowitych?",
      questionType: "SINGLE_CHOICE",
      isPublic: true,
      categoryId: "prog-basics",
      points: 1,
      answers: [
        { text: "int", isCorrect: true },
        { text: "float", isCorrect: false },
        { text: "string", isCorrect: false },
        { text: "boolean", isCorrect: false }
      ]
    },
    {
      id: generateId(),
      text: "Zaznacz wszystkie typy zmiennych występujące w JavaScript:",
      questionType: "MULTIPLE_CHOICE",
      isPublic: true,
      categoryId: "prog-basics",
      points: 2,
      answers: [
        { text: "number", isCorrect: true },
        { text: "string", isCorrect: true },
        { text: "boolean", isCorrect: true },
        { text: "integer", isCorrect: false },
        { text: "char", isCorrect: false }
      ]
    },
    {
      id: generateId(),
      text: "Czy JavaScript jest językiem typowanym statycznie?",
      questionType: "BOOLEAN",
      isPublic: true,
      categoryId: "prog-basics",
      points: 1,
      correctAnswer: false
    },
    {
      id: generateId(),
      text: "Dopasuj opis do odpowiedniego operatora:",
      questionType: "MATCHING",
      isPublic: true,
      categoryId: "prog-basics",
      points: 3,
      matchingPairs: [
        { key: "==", value: "Porównanie wartości" },
        { key: "===", value: "Porównanie wartości i typu" },
        { key: "+=", value: "Dodanie i przypisanie" }
      ]
    }
  ],
  [questionGroups[1].id]: [
    {
      id: generateId(),
      text: "Uporządkuj struktury danych od najmniej do najbardziej złożonej:",
      questionType: "ORDER",
      isPublic: true,
      categoryId: "data-structures",
      points: 2,
      orderItems: [
        { text: "Tablica", order: 1 },
        { text: "Lista linkowana", order: 2 },
        { text: "Drzewo binarne", order: 3 },
        { text: "Graf", order: 4 }
      ]
    },
    {
      id: generateId(),
      text: "Oceń prawdziwość stwierdzeń o tablicach:",
      questionType: "BOOLEAN_GROUP",
      isPublic: true,
      categoryId: "data-structures",
      points: 3,
      subQuestions: [
        { text: "Tablica ma stały rozmiar w języku C", correctAnswer: true, order: 1 },
        { text: "Dostęp do elementu tablicy ma złożoność O(1)", correctAnswer: true, order: 2 },
        { text: "Tablice w JavaScript mogą przechowywać tylko jeden typ danych", correctAnswer: false, order: 3 }
      ]
    },
    {
      id: generateId(),
      text: "Ile elementów mogą przechowywać następujące struktury (podaj maksymalną liczbę)?",
      questionType: "NUMERIC_GROUP",
      isPublic: true,
      categoryId: "data-structures",
      points: 4,
      subQuestions: [
        { text: "Tablica o rozmiarze 8 bitów", correctAnswer: 256, order: 1 },
        { text: "Drzewo binarne o wysokości 3", correctAnswer: 7, order: 2 },
        { text: "Queue zaimplementowany na tablicy o rozmiarze 5", correctAnswer: 5, order: 3 }
      ]
    }
  ],
  [questionGroups[2].id]: [
    {
      id: generateId(),
      text: "Jaka jest złożoność czasowa algorytmu QuickSort?",
      questionType: "SINGLE_CHOICE",
      isPublic: true,
      categoryId: "algorithms",
      points: 2,
      answers: [
        { text: "O(n log n)", isCorrect: true },
        { text: "O(n²)", isCorrect: false },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false }
      ]
    },
    {
      id: generateId(),
      text: "Podaj złożoność przestrzenną algorytmu rekurencyjnego liczenia silni:",
      questionType: "NUMERIC",
      isPublic: true,
      categoryId: "algorithms",
      points: 2,
      correctAnswer: 1,
      tolerance: 0
    },
    {
      id: generateId(),
      text: "Zaznacz wszystkie algorytmy sortowania stabilnego:",
      questionType: "MULTIPLE_CHOICE",
      isPublic: true,
      categoryId: "algorithms",
      points: 3,
      answers: [
        { text: "Merge Sort", isCorrect: true },
        { text: "Bubble Sort", isCorrect: true },
        { text: "Quick Sort", isCorrect: false },
        { text: "Heap Sort", isCorrect: false }
      ]
    },
    {
      id: generateId(),
      text: "Oceń złożoność czasową następujących operacji:",
      questionType: "BOOLEAN_GROUP",
      isPublic: true,
      categoryId: "algorithms",
      points: 3,
      subQuestions: [
        { text: "Czy wyszukiwanie binarne ma złożoność O(log n)?", correctAnswer: true, order: 1 },
        { text: "Czy dodawanie elementu na początek listy linkowanej ma złożoność O(1)?", correctAnswer: true, order: 2 },
        { text: "Czy usuwanie elementu z końca tablicy dynamicznej ma zawsze złożoność O(1)?", correctAnswer: false, order: 3 }
      ]
    }
  ]
};