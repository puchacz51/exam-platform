
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompleteQuestionGroup } from '@/types/test';
import { SelectTestSettings } from '@schema/testSettings';
import { Badge } from '@/components/ui/badge';

interface TestContentProps {
  questionGroups: CompleteQuestionGroup[];
  settings: SelectTestSettings;
}

export function TestContent({ questionGroups, settings }: TestContentProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Content</CardTitle>
        <Badge variant="secondary">
          {settings.questionDisplayMode} Mode
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {questionGroups.map((group, index) => (
          <div key={group.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Group {index + 1}: {group.name}
              </h3>
              <Badge>{group.questions.length} questions</Badge>
            </div>
            <div className="pl-4">
              {group.questions.map((question, qIndex) => (
                <div key={question.id} className="border-l border-l-muted-foreground/20 pb-2 pl-4">
                  <p className="text-sm text-muted-foreground">
                    {qIndex + 1}. {question.type} - {question.points}pts
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}