'use server';

import { z } from 'zod';

import { questionGroupSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionsGroup';
import { questionTypeSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';

type QuestionGroup = z.infer<typeof questionGroupSchema> & {
  questions: z.infer<typeof questionTypeSchema>[];
};

type CreateTestPayload = {
  test: z.infer<typeof testSchema>;
  questionGroups: QuestionGroup[];
};

type ValidationResponse = {
  success: boolean;
  errors?: {
    test?: z.ZodError;
    questionGroups?: z.ZodError[];
    general?: string[];
  };
};

const createTestPayloadSchema = z.object({
  test: testSchema,
  questionGroups: z
    .array(
      questionGroupSchema.extend({
        questions: z.array(questionTypeSchema),
      })
    )
    .min(1, 'Test musi zawierać przynajmniej jedną grupę pytań'),
});

function validateUniqueGroupIds(groups: QuestionGroup[]): string[] {
  const errors: string[] = [];
  const groupIds = new Set<string>();

  for (const group of groups) {
    if (groupIds.has(group.id)) {
      errors.push(`Zduplikowane ID grupy: ${group.id}`);
    }
    groupIds.add(group.id);
  }

  return errors;
}

function validateGroupOrders(groups: QuestionGroup[]): string[] {
  const errors: string[] = [];
  const orders = groups.map((g) => g.order);
  const uniqueOrders = new Set(orders);

  if (orders.length !== uniqueOrders.size) {
    errors.push('Kolejność grup musi być unikalna');
  }

  return errors;
}

function validateQuestionsInGroups(groups: QuestionGroup[]): string[] {
  const errors: string[] = [];

  for (const group of groups) {
    if (group.questions.length === 0) {
      errors.push(`Grupa "${group.name}" nie zawiera żadnych pytań`);
    }
  }

  return errors;
}

function validateQuestionsPerPage(groups: QuestionGroup[]): string[] {
  const errors: string[] = [];

  for (const group of groups) {
    if (group.maxQuestionPerPage > group.questions.length) {
      errors.push(
        `Maksymalna liczba pytań na stronę (${group.maxQuestionPerPage}) nie może być większa niż liczba pytań w grupie "${group.name}" (${group.questions.length})`
      );
    }
  }

  return errors;
}

async function validateStructure(
  data: CreateTestPayload
): Promise<z.SafeParseReturnType<any, any>> {
  return await createTestPayloadSchema.safeParseAsync(data);
}

function performBusinessValidations(data: CreateTestPayload): string[] {
  const allErrors: string[] = [
    ...validateUniqueGroupIds(data.questionGroups),
    ...validateGroupOrders(data.questionGroups),
    ...validateQuestionsInGroups(data.questionGroups),
    ...validateQuestionsPerPage(data.questionGroups),
  ];

  return allErrors;
}

export async function validateTestSubmission(
  data: CreateTestPayload
): Promise<ValidationResponse> {
  try {
    const structureValidation = await validateStructure(data);

    if (!structureValidation.success) {
      return {
        success: false,
        errors: {
          general: ['Nieprawidłowy format danych'],
          ...structureValidation.error.flatten().fieldErrors,
        },
      };
    }

    const businessErrors = performBusinessValidations(data);

    if (businessErrors.length > 0) {
      return {
        success: false,
        errors: {
          general: businessErrors,
        },
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Błąd podczas walidacji testu:', error);
    return {
      success: false,
      errors: {
        general: ['Wystąpił nieoczekiwany błąd podczas walidacji'],
      },
    };
  }
}
