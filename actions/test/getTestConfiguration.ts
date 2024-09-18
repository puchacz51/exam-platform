import db from '@/lib/db';
import { categoriesTable, SelectCategory } from '@schema/categories';
import { questionTypesTable, SelectQuestionType } from '@schema/questionTypes';

export async function getTestConfiguration() {
  try {
    // Pobierz kategorie
    const categories = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        description: categoriesTable.description,
      })
      .from(categoriesTable);

    const questionTypes = await db
      .select({
        id: questionTypesTable.id,
        name: questionTypesTable.name,
        description: questionTypesTable.description,
      })
      .from(questionTypesTable);

    return {
      categories,
      questionTypes,
    };
  } catch (error) {
    console.error('Błąd podczas pobierania danych testu:', error);
    throw new Error('Nie udało się pobrać danych testu');
  }
}

export interface TestConfiguration {
  categories: SelectCategory[];
  questionTypes: SelectQuestionType[];
}
