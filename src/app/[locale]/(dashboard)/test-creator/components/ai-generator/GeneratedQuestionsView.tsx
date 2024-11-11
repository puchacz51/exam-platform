
import { Question } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { questionTypeColors, questionTypeIcons } from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

interface GeneratedQuestionsViewProps {
  questions: Question[];
  onAccept: () => void;
  onReject: () => void;
}

export function GeneratedQuestionsView({ questions, onAccept, onReject }: GeneratedQuestionsViewProps) {
  return (
    <Card className="mt-6">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Generated Questions</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReject}>
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button size="sm" onClick={onAccept}>
            <Check className="mr-2 h-4 w-4" />
            Accept Questions
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {questions.map((question, index) => {
              const Icon = questionTypeIcons[question.questionType];
              return (
                <Card key={question.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
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
                      <p className="text-sm font-medium">{question.question}</p>
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
}