import { Dice5 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { questionTypeEnum } from '@schema/questions';

import QuestionTypeButton from './QuestionTypeButton';
import { TypeSelectionSectionProps } from './types';

export const TypeSelectionSection = ({
  selectedTypes,
  onTypeSelect,
  onRandomSelect,
}: TypeSelectionSectionProps) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1" />
        <Button
          type="button"
          variant="outline"
          onClick={onRandomSelect}
        >
          <Dice5 className="mr-2 h-4 w-4" />
          Random Selection
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {questionTypeEnum.enumValues.map((type) => {
          const isSelected = selectedTypes.some((t) => t.type === type);
          return (
            <QuestionTypeButton
              key={type}
              isSelected={isSelected}
              onSelect={onTypeSelect}
              type={type}
            />
          );
        })}
      </div>
    </>
  );
};
