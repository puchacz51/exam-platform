
import { Button } from '@/components/ui/button';
import { Dice5 } from 'lucide-react';
import { questionTypeEnum } from '@schema/questions';
import QuestionTypeButton from './QuestionTypeButton';
import { TypeSelectionSectionProps } from './types';

export function TypeSelectionSection({
  selectedTypes,
  onTypeSelect,
  onRandomSelect,
}: TypeSelectionSectionProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1" />
        <Button variant="outline" onClick={onRandomSelect}>
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
}