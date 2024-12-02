import { relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';

import { openAnswersTable } from './answer-attempts/openAnswers';
import { choiceAnswersTable } from './answer-attempts/choiceAnswers';
import { matchingAnswersTable } from './answer-attempts/matchingAnswers';
import { orderAnswersTable } from './answer-attempts/orderAnswers';
import { numericAnswersTable } from './answer-attempts/numericAnswers';
import { booleanAnswersTable } from './answer-attempts/booleanAnswers';

export const attemptAnswerRelations = relations(
  attemptAnswersTable,
  ({ one }) => ({
    openAnswer: one(openAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [openAnswersTable.attemptAnswerId],
    }),
    choiceAnswer: one(choiceAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [choiceAnswersTable.attemptAnswerId],
    }),
    matchingAnswer: one(matchingAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [matchingAnswersTable.attemptAnswerId],
    }),
    orderAnswer: one(orderAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [orderAnswersTable.attemptAnswerId],
    }),
    numericAnswer: one(numericAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [numericAnswersTable.attemptAnswerId],
    }),
    booleanAnswer: one(booleanAnswersTable, {
      fields: [attemptAnswersTable.id],
      references: [booleanAnswersTable.attemptAnswerId],
    }),
  })
);

export * from './answer-attempts/openAnswers';
export * from './answer-attempts/choiceAnswers';
export * from './answer-attempts/matchingAnswers';
export * from './answer-attempts/orderAnswers';
export * from './answer-attempts/numericAnswers';
export * from './answer-attempts/booleanAnswers';
