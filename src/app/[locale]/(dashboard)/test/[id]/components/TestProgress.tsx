import { Clock } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

interface TestProgressProps {
  timeLimit: number;
  currentGroupIndex: number;
  totalGroups: number;
  progress: number;
}

export const TestProgress = ({
  timeLimit,
  currentGroupIndex,
  totalGroups,
  progress,
}: TestProgressProps) => (
  <div className="px-6 pt-4">
    <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>{timeLimit} minutes </span>
      </div>
      <span>
        Group {currentGroupIndex + 1} of {totalGroups}
      </span>
    </div>
    <Progress
      value={progress}
      className="h-2"
    />
  </div>
);

export default TestProgress;
