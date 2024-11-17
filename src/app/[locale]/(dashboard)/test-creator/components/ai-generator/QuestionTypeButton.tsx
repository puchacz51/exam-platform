import {
  questionTypeColors,
  questionTypeIcons,
} from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

interface QuestionTypeButtonProps {
  type: string;
  isSelected: boolean;
  onSelect: (type: string) => void;
}

export const QuestionTypeButton = ({
  type,
  isSelected,
  onSelect,
}: QuestionTypeButtonProps) => {
  const Icon = questionTypeIcons[type as keyof typeof questionTypeIcons];

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`${
        questionTypeColors[type as keyof typeof questionTypeColors]
      } rounded-lg p-4 transition-all ${
        isSelected ? 'ring-2 ring-black' : ''
      } hover:scale-105`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{type.replace(/_/g, ' ')}</span>
      </div>
    </button>
  );
};

export default QuestionTypeButton;
