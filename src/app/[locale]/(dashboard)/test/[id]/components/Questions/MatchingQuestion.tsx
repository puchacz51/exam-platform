import { FC } from 'react';

import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { type MatchingQuestion } from '@/types/questions/matchingQuestion';

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
  console.log(mode);
  return (
    <div className="grid gap-4">
      {question?.matchingPairs?.map((pair) => (
        <Card
          key={pair.key}
          className="bg-gray-50"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="font-medium">{pair.key}</div>
            <ArrowRight className="text-gray-400" />
            <div className="min-w-[150px] rounded-md bg-white p-2 shadow-sm">
              {pair.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MatchingQuestion;
