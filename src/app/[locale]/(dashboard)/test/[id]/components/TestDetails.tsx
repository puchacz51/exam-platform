import { Check, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type SelectTestSettings } from '@schema/testSettings';

interface TestDetailsProps {
  settings: SelectTestSettings;
}

const BooleanIndicator = ({ value }: { value: boolean }) =>
  value ? (
    <Check className="h-4 w-4 text-green-500" />
  ) : (
    <X className="h-4 w-4 text-red-500" />
  );

export const TestDetails = ({ settings }: TestDetailsProps) => {
  const settingGroups = [

    {
      title: 'Scoring Settings',
      settings: [
        { label: 'Scoring System', value: settings.scoringSystem },
        {
          label: 'Allow Partial Points',
          value: <BooleanIndicator value={!!settings.allowPartialPoints} />,
        },
      ],
    },
    {
      title: 'Display Settings',
      settings: [
        { label: 'Question Display Mode', value: settings.questionDisplayMode },

        {
          label: 'Shuffle Questions',
          value: (
            <BooleanIndicator value={!!settings.shuffleQuestionsInGroup} />
          ),
        },
        {
          label: 'Shuffle Answers',
          value: <BooleanIndicator value={!!settings.shuffleAnswers} />,
        },
      ],
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {settingGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-lg">{group.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              {group.settings.map((setting) => (
                <div
                  key={setting.label}
                  className="flex justify-between text-sm"
                >
                  <dt className="text-muted-foreground">{setting.label}:</dt>
                  <dd className="font-medium">{setting.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
