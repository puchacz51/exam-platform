import { useCallback } from 'react';

import { useFormContext } from 'react-hook-form';
import { Check, X } from 'lucide-react';

import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';
import { AiGeneratorFormData } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

interface GeneratedQuestionsViewProps {
  questionGroups: TestCreatorQuestionGroup[];
}

export const GeneratedQuestionsView = ({
  questionGroups,
}: GeneratedQuestionsViewProps) => {
  const form = useFormContext<AiGeneratorFormData>();
  const questions = useTestContext((state) => state.aiQuestions);
  const setAiQuestion = useTestContext((state) => state.setAiQuestions);

  const selectedGroupId = form.watch('selectedGroupId');
  const selectedQuestionIds = form.watch('selectedQuestionIds');
  const setQuestionGroups = useTestContext((state) => state.setQuestionGroups);
  const toggleQuestion = useCallback(
    (questionId: string) => {
      form.setValue(
        'selectedQuestionIds',
        selectedQuestionIds.includes(questionId)
          ? selectedQuestionIds.filter((id) => id !== questionId)
          : [...selectedQuestionIds, questionId]
      );
    },
    [form, selectedQuestionIds]
  );

  const handleAccept = useCallback(() => {
    if (!selectedGroupId || selectedQuestionIds.length === 0) return;

    const selectedQuestionsList = questions?.filter((q) =>
      selectedQuestionIds.includes(q.id)
    );
    setQuestionGroups((prev) => {
      const groupId = prev.findIndex((group) => group.id === selectedGroupId);

      if (groupId === -1) return prev;

      const group = prev[groupId];
      const addedQuestions = selectedQuestionsList?.map((q) => ({
        ...q,
        groupId: selectedGroupId,
      })) as TestCreatorQuestionGroup['questions'];

      return [
        ...prev.slice(0, groupId),
        {
          ...group,
          questions: [...group.questions, ...(addedQuestions || [])],
        },
        ...prev.slice(groupId + 1),
      ];
    });

    setAiQuestion((prev) =>
      (prev || [])?.filter((q) => !selectedQuestionIds.includes(q.id))
    );

    form.setValue('selectedQuestionIds', []);
  }, [selectedGroupId, selectedQuestionIds, questions, form]);

  const handleReject = useCallback(() => {
    setAiQuestion((prev) =>
      (prev || []).filter((q) => !selectedQuestionIds.includes(q.id))
    );
  }, [form]);

  const handleGroupChange = useCallback(
    (groupId: string) => {
      form.setValue('selectedGroupId', groupId);
    },
    [form]
  );

  return (
    <Card className="mt-6">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b bg-white pb-4">
        <CardTitle className="text-lg font-medium">
          Generated Questions
        </CardTitle>
        <div className="flex items-center gap-4">
          <Select
            value={selectedGroupId}
            onValueChange={handleGroupChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select question group" />
            </SelectTrigger>
            <SelectContent>
              {questionGroups.map((group) => (
                <SelectItem
                  key={group.id}
                  value={group.id}
                >
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              onClick={handleReject}
              type="button"
              variant="outline"
              size="sm"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAccept}
              disabled={!selectedGroupId || selectedQuestionIds.length === 0}
            >
              <Check className="mr-2 h-4 w-4" />
              Add Selected ({selectedQuestionIds.length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-4 p-6">
            {questions?.map((question, index) => {
              const Icon = questionTypeIcons[question.questionType];
              return (
                <Card
                  key={question.id}
                  className="p-4 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Checkbox
                      checked={selectedQuestionIds.includes(question.id)}
                      onCheckedChange={() => toggleQuestion(question.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1}
                        </span>
                        <Badge
                          variant="secondary"
                          className={questionTypeColors[question.questionType]}
                        >
                          <Icon className="mr-1 h-3 w-3" />
                          {question.questionType.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{question.text}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
