import { TestCreatorQuestion } from '@/types/test-creator/question';
import { generateId } from '@/utils/generateId';

export const mathTest: TestCreatorQuestion[] = [
  {
    id: generateId(),
    text: 'Ile to jest 5 + 3?',
    questionType: 'NUMERIC',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 1,
    correctAnswer: 8,
  },
  {
    id: generateId(),
    text: 'Wybierz poprawną odpowiedź: 12 * 3 = ?',
    questionType: 'SINGLE_CHOICE',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 1,
    answers: [
      { id: generateId(), text: '36', isCorrect: true },
      { id: generateId(), text: '32' },
      { id: generateId(), text: '40' },
      { id: generateId(), text: '30' },
    ],
  },
  {
    id: generateId(),
    text: 'Czy liczba 17 jest liczbą pierwszą?',
    questionType: 'BOOLEAN',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 1,
    correctAnswer: true,
  },
  {
    id: generateId(),
    text: 'Ułóż liczby w kolejności rosnącej: 4, 2, 9, 7',
    questionType: 'ORDER',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 2,
    orderItems: [
      { id: generateId(), text: '2', order: 1 },
      { id: generateId(), text: '4', order: 2 },
      { id: generateId(), text: '7', order: 3 },
      { id: generateId(), text: '9', order: 4 },
    ],
  },
  {
    id: generateId(),
    text: 'Odpowiedz na pytanie: Ile wynosi pierwiastek kwadratowy z 81?',
    questionType: 'OPEN',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 1,
    answers: [{ id: generateId(), text: '9' }],
  },
  {
    id: generateId(),
    text: 'Które z poniższych są liczbami parzystymi?',
    questionType: 'MULTIPLE_CHOICE',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 2,
    answers: [
      { id: generateId(), text: '2', isCorrect: true },
      { id: generateId(), text: '5' },
      { id: generateId(), text: '10', isCorrect: true },
      { id: generateId(), text: '13' },
    ],
  },
  {
    id: generateId(),
    text: 'Uporządkuj struktury danych od najmniej do najbardziej złożonej:',
    questionType: 'ORDER',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 2,
    orderItems: [
      { id: generateId(), text: 'Tablica', order: 1 },
      { id: generateId(), text: 'Lista linkowana', order: 2 },
      { id: generateId(), text: 'Drzewo binarne', order: 3 },
      { id: generateId(), text: 'Graf', order: 4 },
    ],
  },
  {
    id: generateId(),
    text: 'Oceń prawdziwość stwierdzeń o tablicach:',
    questionType: 'BOOLEAN_GROUP',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 3,
    subQuestions: [
      {
        id: generateId(),
        text: 'Tablica ma stały rozmiar w języku C',
        correctAnswer: true,
        order: 1,
      },
      {
        id: generateId(),
        text: 'Dostęp do elementu tablicy ma złożoność O(1)',
        correctAnswer: true,
        order: 2,
      },
      {
        id: generateId(),
        text: 'Tablice w JavaScript mogą przechowywać tylko jeden typ danych',
        correctAnswer: false,
        order: 3,
      },
    ],
  },
  {
    id: generateId(),
    text: 'Ile elementów mogą przechowywać następujące struktury (podaj maksymalną liczbę)?',
    questionType: 'NUMERIC_GROUP',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 4,
    subQuestions: [
      {
        id: generateId(),
        text: 'Tablica o rozmiarze 8 bitów',
        correctAnswer: 256,
        order: 1,
      },
      {
        id: generateId(),
        text: 'Drzewo binarne o wysokości 3',
        correctAnswer: 7,
        order: 2,
      },
      {
        id: generateId(),
        text: 'Queue zaimplementowany na tablicy o rozmiarze 5',
        correctAnswer: 5,
        order: 3,
      },
    ],
  },

  {
    id: generateId(),
    text: 'Podaj złożoność przestrzenną algorytmu rekurencyjnego liczenia silni:',
    questionType: 'NUMERIC',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 2,
    correctAnswer: 1,
    tolerance: 0,
  },
  {
    id: generateId(),
    text: 'Zaznacz wszystkie algorytmy sortowania stabilnego:',
    questionType: 'MULTIPLE_CHOICE',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 3,
    answers: [
      { id: generateId(), text: 'Merge Sort', isCorrect: true },
      { id: generateId(), text: 'Bubble Sort', isCorrect: true },
      { id: generateId(), text: 'Quick Sort', isCorrect: false },
      { id: generateId(), text: 'Heap Sort', isCorrect: false },
    ],
  },
  {
    id: generateId(),
    text: 'Oceń złożoność czasową następujących operacji:',
    questionType: 'BOOLEAN_GROUP',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 3,
    subQuestions: [
      {
        id: generateId(),
        text: 'Czy wyszukiwanie binarne ma złożoność O(log n)?',
        correctAnswer: true,
        order: 1,
      },
      {
        id: generateId(),
        text: 'Czy dodawanie elementu na początek listy linkowanej ma złożoność O(1)?',
        correctAnswer: true,
        order: 2,
      },
      {
        id: generateId(),
        text: 'Czy usuwanie elementu z końca tablicy dynamicznej ma zawsze złożoność O(1)?',
        correctAnswer: false,
        order: 3,
      },
    ],
  },
  {
    id: generateId(),
    text: 'Dopasuj opis do odpowiedniego operatora:',
    questionType: 'MATCHING',

    categoryId: 'd8f8f587-54bd-4415-89d7-6f36d822a790',
    points: 3,
    matchingPairs: [
      { id: generateId(), key: '==', value: 'Porównanie wartości' },
      { id: generateId(), key: '===', value: 'Porównanie wartości i typu' },
      { id: generateId(), key: '+=', value: 'Dodanie i przypisanie' },
    ],
  },
];
