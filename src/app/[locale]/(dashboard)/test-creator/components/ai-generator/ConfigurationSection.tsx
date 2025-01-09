import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AiGeneratorFormData } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';
import SelectedTypesBadge from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/SelectedTypesBadge';

interface ConfigurationSectionProps {
  totalQuestions: number;
  categories: Array<{ id: string; name: string }>;
}

export const ConfigurationSection = ({
  totalQuestions,
  categories,
}: ConfigurationSectionProps) => {
  const form = useFormContext<AiGeneratorFormData>();
  const selectedTypes = form.watch('selectedTypes');
  const t = useTranslations('aiGenerator.configuration');

  return (
    <div className="grid gap-8 rounded-lg border bg-background/60 p-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-[1.5fr,2fr]">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold">
                  {t('category')}
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    const category = categories.find((c) => c.id === value);
                    if (category) {
                      field.onChange({ id: category.id, name: category.name });
                    }
                  }}
                  value={field.value?.id || ''}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 px-3 py-2">
                      <SelectValue
                        placeholder={t('selectCategory')}
                        className="text-muted-foreground"
                      >
                        {field.value?.name || t('selectCategory')}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[280px]">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold">
                  {t('mainTopic')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('topicPlaceholder')}
                    className="h-11 px-3 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-base font-semibold">
                {t('topicDetails')}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('detailsPlaceholder')}
                  className="min-h-[180px] resize-none px-3 py-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 pb-2">
          <label className="text-base font-semibold">
            {t('selectedTypesHeader')}
          </label>
          <Info className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
          <span className="ml-auto text-sm font-medium text-muted-foreground">
            {t('selectedCount', { count: selectedTypes.length })}
          </span>
        </div>
        <ScrollArea className="h-[140px] rounded-md border bg-background/40 p-4 shadow-inner">
          <div className="flex flex-wrap gap-3">
            {selectedTypes.map(({ type, count }) => (
              <SelectedTypesBadge
                key={type}
                type={type}
                count={count}
                onRemove={(type) => {
                  const newTypes = selectedTypes.filter((t) => t.type !== type);
                  form.setValue('selectedTypes', newTypes);
                }}
                onCountUpdate={(type, newCount) => {
                  const newTypes = selectedTypes.map((t) =>
                    t.type === type ? { ...t, count: newCount } : t
                  );
                  form.setValue('selectedTypes', newTypes);
                }}
                disableIncrement={totalQuestions === 12}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
