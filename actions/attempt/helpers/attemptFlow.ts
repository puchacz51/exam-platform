// import { AnswerInput } from '@/types/answers/testAttemptAnswers';
// import { QG, UserAttemptResponse } from '@actions/attempt/getUserAttempt';
// import { SelectTestSettings } from '@schema/testSettings';

// interface AttemptFlowProps {
//   newAttempt: AnswerInput[];
//   previousAttempt: AnswerInput[];
//   userAssignment: UserAttemptResponse;
// }

// const getAttemptFlow = ({
//   newAttempt,
//   previousAttempt,
//   userAssignment,
// }: AttemptFlowProps) => {
//   if (!userAssignment?.data) return null;

//   const {
//     testAccess: { test },
//   } = userAssignment.data;
//   const {
//     allowGoBack,
//     navigationMode,
//     showPointsPerQuestion,
//     showFinalScore,
//     shuffleQuestionsInGroup,
//   } = test.settings;

//   if (navigationMode === 'GROUP_LOCK') {
//     const groupStats = getGroupStatsForAllGroups(test.QG, newAttempt);
//     const isAllGroupsAnswered = groupStats.every(
//       (group) => group.isAllQuestionsAnswered
//     );
//     const groupsWithoutAnswers = groupStats.filter(
//       (group) => !group.isAllQuestionsAnswered
//     );

//     const onlyOneGroupWithoutAnswers = groupsWithoutAnswers.length === 1;

//     return {
//       isAllGroupsAnswered,
//     };
//   }
// };

// const aggregateQuestionsByGroup = (QG: QG[]) =>
//   QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));

// const countAnsweredQuestions = (
//   questions: AggregatedQuestion[],
//   answers: AnswerInput[]
// ) => {
//   return questions.filter((question) =>
//     answers.some((answer) => answer.questionId === question.id)
//   ).length;
// };

// const getQuestionStats = (QG: QG[], answers: AnswerInput[]) => {
//   const questions = aggregateQuestionsByGroup(QG);
//   const answeredQuestions = countAnsweredQuestions(questions, answers);
//   return {
//     totalQuestions: questions.length,
//     answeredQuestions,
//     isAllQuestionsAnswered: answeredQuestions === questions.length,
//   };
// };

// const getGroupStatsForAllGroups = (QG: QG[], answers: AnswerInput[]) => {
//   return QG.map((qg) => {
//     const questions = qg.qOnQG.map((q) => q.question);
//     const answeredQuestions = countAnsweredQuestions(questions, answers);
//     return {
//       groupId: qg.id,
//       totalQuestions: questions.length,
//       answeredQuestions,
//       isAllQuestionsAnswered: answeredQuestions === questions.length,
//     };
//   });
// };

// type AggregatedQuestion = ReturnType<typeof aggregateQuestionsByGroup>[0];
