import { UseFormReturn } from 'react-hook-form';

import { AiGeneratorFormData } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';

export interface QuestionTypeCount {
  type: string;
  count: number;
}

export interface ConfigurationSectionProps {
  form: UseFormReturn<AiGeneratorFormData>;
  totalQuestions: number;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

export interface TypeSelectionSectionProps {
  selectedTypes: QuestionTypeCount[];
  onTypeSelect: (type: string) => void;
  onRandomSelect: () => void;
  language: 'en' | 'pl';
  onLanguageChange: (value: 'en' | 'pl') => void;
}
