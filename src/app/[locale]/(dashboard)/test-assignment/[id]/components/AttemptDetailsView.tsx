'use client';

import { FC } from 'react';

import { format } from 'date-fns';

import { AttemptDetailsResponse } from '@actions/attempt/getAttemptDetails';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface AttemptDetailsViewProps {
  attempt: AttemptDetailsResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

const AttemptDetailsView: FC<AttemptDetailsViewProps> = ({
  attempt,
  isOpen,
  onClose,
}) => {
  if (!attempt) return null;

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'SINGLE_CHOICE':
        return 'Jednokrotny wybór';
      case 'MULTIPLE_CHOICE':
        return 'Wielokrotny wybór';
      case 'BOOLEAN':
        return 'Prawda/Fałsz';
      case 'NUMERIC':
        return 'Numeryczna';
      case 'OPEN':
        return 'Otwarta';
      case 'MATCHING':
        return 'Dopasowanie';
      case 'ORDER':
        return 'Porządkowanie';
      default:
        return type;
    }
  };

  const renderUserAnswer = (
    question: NonNullable<AttemptDetailsResponse>['testAccess']['test']['QG'][0]['qOnQG'][0]['question'],
    userAnswers: NonNullable<AttemptDetailsResponse>['answers']
  ) => {
    const questionAnswers = userAnswers.filter(
      (answer) => answer.questionId === question.id
    );

    if (questionAnswers.length === 0) {
      return (
        <span className="italic text-muted-foreground">Brak odpowiedzi</span>
      );
    }

    const answer = questionAnswers[0];

    // Boolean answers
    if (answer.booleanAnswers && answer.booleanAnswers.length > 0) {
      const boolAnswer = answer.booleanAnswers[0];
      return (
        <Badge variant={boolAnswer.value ? 'default' : 'secondary'}>
          {boolAnswer.value ? 'Prawda' : 'Fałsz'}
        </Badge>
      );
    }

    // Choice answers
    if (answer.choiceAnswers && answer.choiceAnswers.length > 0) {
      return (
        <div className="space-y-1">
          {answer.choiceAnswers.map((choice) => {
            const answerOption = question.answers.find(
              (a) => a.id === choice.answerId
            );
            return (
              <Badge
                key={choice.id}
                variant={answerOption?.isCorrect ? 'default' : 'destructive'}
                className="mr-2"
              >
                {answerOption?.text || 'Nieznana odpowiedź'}
              </Badge>
            );
          })}
        </div>
      );
    }

    // Numeric answers
    if (answer.numericAnswers && answer.numericAnswers.length > 0) {
      const numAnswer = answer.numericAnswers[0];
      return <Badge variant="outline">{numAnswer.value}</Badge>;
    }

    // Open answers
    if (answer.openAnswers && answer.openAnswers.length > 0) {
      const openAnswer = answer.openAnswers[0];
      return (
        <div className="rounded bg-muted p-2 text-sm">
          {openAnswer.text || 'Brak odpowiedzi'}
        </div>
      );
    }

    // Matching answers
    if (answer.matchingAnswers && answer.matchingAnswers.length > 0) {
      return (
        <div className="space-y-1">
          {answer.matchingAnswers.map((match) => {
            return (
              <div
                key={match.id}
                className="text-sm"
              >
                <Badge variant="outline">
                  {match.key} → {match.value}
                </Badge>
              </div>
            );
          })}
        </div>
      );
    }

    // Order answers
    if (answer.orderAnswers && answer.orderAnswers.length > 0) {
      return (
        <div className="space-y-1">
          {answer.orderAnswers
            .sort((a, b) => a.position - b.position)
            .map((order, index) => {
              const item = question.orderItems.find(
                (i) => i.id === order.itemId
              );
              return (
                <div
                  key={order.id}
                  className="text-sm"
                >
                  <Badge variant="outline">
                    {index + 1}. {item?.text}
                  </Badge>
                </div>
              );
            })}
        </div>
      );
    }

    return (
      <span className="italic text-muted-foreground">
        Nieznany typ odpowiedzi
      </span>
    );
  };

  const renderCorrectAnswer = (
    question: NonNullable<AttemptDetailsResponse>['testAccess']['test']['QG'][0]['qOnQG'][0]['question']
  ) => {
    // Boolean questions
    if (question.GSQ && question.GSQ.length > 0) {
      const gsq = question.GSQ[0];
      if (gsq.type === 'BOOLEAN' && gsq.booleanAnswer !== null) {
        return (
          <Badge variant="default">
            {gsq.booleanAnswer ? 'Prawda' : 'Fałsz'}
          </Badge>
        );
      }
      if (gsq.type === 'NUMERIC' && gsq.numericAnswer !== null) {
        return <Badge variant="default">{gsq.numericAnswer}</Badge>;
      }
    }

    // Choice questions
    if (question.answers && question.answers.length > 0) {
      const correctAnswers = question.answers.filter((a) => a.isCorrect);
      if (correctAnswers.length > 0) {
        return (
          <div className="space-y-1">
            {correctAnswers.map((answer) => (
              <Badge
                key={answer.id}
                variant="default"
                className="mr-2"
              >
                {answer.text}
              </Badge>
            ))}
          </div>
        );
      }
    }

    // Matching questions
    if (question.matchingPairs && question.matchingPairs.length > 0) {
      return (
        <div className="space-y-1">
          {question.matchingPairs.map((pair) => (
            <div
              key={pair.id}
              className="text-sm"
            >
              <Badge variant="default">
                {pair.key} → {pair.value}
              </Badge>
            </div>
          ))}
        </div>
      );
    }

    // Order questions
    if (question.orderItems && question.orderItems.length > 0) {
      const sortedItems = [...question.orderItems].sort(
        (a, b) => a.order - b.order
      );
      return (
        <div className="space-y-1">
          {sortedItems.map((item, index) => (
            <div
              key={item.id}
              className="text-sm"
            >
              <Badge variant="default">
                {index + 1}. {item.text}
              </Badge>
            </div>
          ))}
        </div>
      );
    }

    return (
      <span className="italic text-muted-foreground">
        Brak poprawnej odpowiedzi
      </span>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Szczegóły próby - {attempt.user?.firstname} {attempt.user?.lastname}
          </DialogTitle>
          <DialogDescription>
            Podgląd wszystkich odpowiedzi użytkownika
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informacje podstawowe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="font-medium">
                    {attempt.user?.firstname} {attempt.user?.lastname}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{attempt.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rozpoczęto</p>
                  <p className="font-medium">
                    {attempt.startedAt
                      ? format(new Date(attempt.startedAt), 'dd/MM/yyyy HH:mm')
                      : 'Nie rozpoczęto'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zakończono</p>
                  <p className="font-medium">
                    {attempt.finishedAt
                      ? format(new Date(attempt.finishedAt), 'dd/MM/yyyy HH:mm')
                      : 'Nie zakończono'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Punkty</p>
                  <p className="font-medium">
                    {attempt.totalPoints ?? 'Nie oceniono'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      !attempt.startedAt
                        ? 'secondary'
                        : !attempt.finishedAt
                          ? 'default'
                          : 'outline'
                    }
                  >
                    {!attempt.startedAt
                      ? 'Nie rozpoczęto'
                      : !attempt.finishedAt
                        ? 'W trakcie'
                        : 'Zakończono'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions and Answers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Odpowiedzi na pytania</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {attempt.testAccess.test.QG.map((qg, qgIndex) =>
                  qg.qOnQG.map((qOnQG, qIndex) => {
                    const question = qOnQG.question;
                    const questionNumber =
                      qgIndex * qg.qOnQG.length + qIndex + 1;

                    return (
                      <div
                        key={question.id}
                        className="space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant="outline">
                                Pytanie {questionNumber}
                              </Badge>
                              <Badge variant="secondary">
                                {getQuestionTypeLabel(question.questionType)}
                              </Badge>
                              <Badge variant="outline">
                                {question.points} pkt
                              </Badge>
                            </div>
                            <h4 className="mb-3 text-base font-medium">
                              {question.text}
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <h5 className="mb-2 text-sm font-medium text-muted-foreground">
                              Odpowiedź użytkownika:
                            </h5>
                            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                              {renderUserAnswer(question, attempt.answers)}
                            </div>
                          </div>
                          <div>
                            <h5 className="mb-2 text-sm font-medium text-muted-foreground">
                              Poprawna odpowiedź:
                            </h5>
                            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                              {renderCorrectAnswer(question)}
                            </div>
                          </div>
                        </div>

                        {qgIndex < attempt.testAccess.test.QG.length - 1 ||
                        qIndex < qg.qOnQG.length - 1 ? (
                          <Separator className="mt-6" />
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttemptDetailsView;
