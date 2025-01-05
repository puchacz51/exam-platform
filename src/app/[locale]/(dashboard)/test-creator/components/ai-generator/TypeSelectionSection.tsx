import { Dice5 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { questionTypeEnum } from '@schema/questions';
import { AiGeneratorFormData } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';
import { QuestionTypeCount } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/types';
import QuestionTypeButton from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/QuestionTypeButton';

interface TypeSelectionSectionProps {
  selectedTypes: QuestionTypeCount[];
  onTypeSelect: (type: string) => void;
  onRandomSelect: () => void;
}

export const TypeSelectionSection = ({
  selectedTypes,
  onTypeSelect,
  onRandomSelect,
}: TypeSelectionSectionProps) => {
  const form = useFormContext<AiGeneratorFormData>();
  const language = form.watch('language');
  const t = useTranslations('aiGenerator');

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Select
          value={language}
          onValueChange={(value: 'en' | 'pl') =>
            form.setValue('language', value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('typeSelection.selectLanguage')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('typeSelection.languages.en')}</SelectItem>
            <SelectItem value="pl">{t('typeSelection.languages.pl')}</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button
          type="button"
          variant="outline"
          onClick={onRandomSelect}
        >
          <Dice5 className="mr-2 h-4 w-4" />
          {t('buttons.randomSelection')}
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
