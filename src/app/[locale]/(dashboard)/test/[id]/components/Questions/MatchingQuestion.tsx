import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type MatchingQuestion } from '@/types/questions/matchingQuestion';
import { TestAttemptFormDataMatching } from '@/types/forms/testAttemptForm';

interface MatchingPairViewProps {
  mode?: 'view';
  question: MatchingQuestion;
}

interface MatchingPairSolveProps {
  mode?: 'solve';
  question: MatchingQuestion;
}

type MatchingPairProps = MatchingPairViewProps | MatchingPairSolveProps;

const MatchingQuestion: FC<MatchingPairProps> = ({
  question,
  mode = 'view',
}) => {
  const { id, matchingPairs } = question;
  const fieldKey = `questions.${id}.pairs` as const;
  const { control, setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataMatching>();
  const { fields } = useFieldArray({
    control,
    name: fieldKey,
  });

  const handlePairChange = (keyItemId: string, valueItemId: string) => {
    const questionValue = getValues('questions')[id];
    if (!questionValue?.type) {
      setValue(`questions.${id}.type`, 'MATCHING');
    }

    const index = fields.findIndex((field) => field.keyItemId === keyItemId);
    if (index !== -1) {
      setValue(`${fieldKey}.${index}.valueItemId`, valueItemId);
    } else {
      setValue(fieldKey, [...fields, { keyItemId, valueItemId }]);
    }
  };

  const pairs = watch(fieldKey) || [];
  const valueItems = matchingPairs.map((pair) => ({
    id: pair.key,
    text: pair.value,
  }));

  return (
    <div className="grid gap-4">
      {matchingPairs?.map((pair) => {
        const selectedPair = pairs.find((p) => p.keyItemId === pair.key);
        const selectedValue =
          mode === 'solve' ? selectedPair?.valueItemId : pair.key;

        return (
          <Card
            key={pair.key}
            className="overflow-hidden bg-gray-50 transition-colors hover:bg-gray-100"
          >
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-[200px] rounded-lg bg-white p-3 font-medium shadow-sm">
                {pair.key}
              </div>
              <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-gray-400 sm:block" />
              {mode === 'solve' ? (
                <div className="w-full sm:w-auto">
                  <Select
                    value={selectedValue || undefined}
                    onValueChange={(value) => handlePairChange(pair.key, value)}
                  >
                    <SelectTrigger className="w-full min-w-[200px] bg-white sm:w-auto">
                      <SelectValue placeholder="Select matching item..." />
                    </SelectTrigger>
                    <SelectContent>
                      {valueItems.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="font-medium"
                        >
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="w-full min-w-[200px] rounded-lg bg-white p-3 font-medium shadow-sm sm:w-auto">
                  {pair.value}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MatchingQuestion;
