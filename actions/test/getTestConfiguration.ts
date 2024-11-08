import db from '@/lib/db';
import { categoriesTable, SelectCategory } from '@schema/categories';

export async function getTestConfiguration() {
  try {
    const categories = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        description: categoriesTable.description,
      })
      .from(categoriesTable);

    return {
      categories,
    };
  } catch (error) {
    console.error('Błąd podczas pobierania danych testu:', error);
    throw new Error('Nie udało się pobrać danych testu');
  }
}

export interface TestConfiguration {
  categories: SelectCategory[];
}
