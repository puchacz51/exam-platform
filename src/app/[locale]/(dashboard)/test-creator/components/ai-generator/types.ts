import { UseFormReturn } from 'react-hook-form';
import { AiGeneratorFormData } from './schema';

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
}
