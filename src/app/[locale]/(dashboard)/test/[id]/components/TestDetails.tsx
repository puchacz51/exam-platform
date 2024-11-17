import { Check, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectTestSettings } from '@schema/testSettings';

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
      title: 'Navigation Settings',
      settings: [
        { label: 'Navigation Mode', value: settings.navigationMode },
        {
          label: 'Allow Going Back',
          value: <BooleanIndicator value={!!settings.allowGoBack} />,
        },
        {
          label: 'Confirm Group Change',
          value: (
            <BooleanIndicator value={!!settings.confirmBeforeGroupChange} />
          ),
        },
      ],
    },
    {
      title: 'Scoring Settings',
      settings: [
        { label: 'Scoring System', value: settings.scoringSystem },
        {
          label: 'Allow Partial Points',
          value: <BooleanIndicator value={!!settings.allowPartialPoints} />,
        },
        {
          label: 'Minimum Points Per Question',
          value: settings.minimumPointsPerQuestion,
        },
        {
          label: 'Negative Points Percentage',
          value: `${settings.negativePointsPercentage}%`,
        },
        { label: 'Rounding Precision', value: settings.roundingPrecision },
      ],
    },
    {
      title: 'Display Settings',
      settings: [
        { label: 'Question Display Mode', value: settings.questionDisplayMode },
        {
          label: 'Questions Per Page',
          value: settings.questionsPerPage || 'All',
        },
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
