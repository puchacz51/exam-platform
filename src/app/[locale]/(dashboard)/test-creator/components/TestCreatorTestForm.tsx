import React, { FC, HTMLAttributes } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { accessTypeEnum } from '@schema/test';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useTestContext } from '../store/storeContext';

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Tytuł jest wymagany')
    .max(256, 'Tytuł musi mieć maksymalnie 256 znaków'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Kategoria jest wymagana'),
  accessType: z.enum(accessTypeEnum.enumValues),
  accessCode: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === 'code' && (!val || val.length === 0)) {
          return false;
        }
        return true;
      },
      {
        message: 'Kod dostępu jest wymagany',
      }
    ),
});

export type TestFormData = z.infer<typeof formSchema>;

interface TestCreatorFormProps extends HTMLAttributes<HTMLDivElement> {}

const TestCreatorForm: FC<TestCreatorFormProps> = ({ className }) => {
  const { categories } = useTestContext((state) => state.testConfiguration);
  const setTest = useTestContext((state) => state.setTest);
  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);
  const isTestConfiguratorOpen = useTestContext(
    (state) => state.isTestConfiguratorOpen
  );
  const setTestConfiguratorOpen = useTestContext(
    (state) => state.setIsTestConfiguratorOpen
  );
  const setIsQuestionConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionConfiguratorOpen
  );
  const form = useForm<TestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'test',
      description: 'test test',
      categoryId: 'dbdc4f84-7217-4c1a-9908-a6410130d9c7',
      accessType: 'PUBLIC',
      accessCode: '',
    },
  });

  const handleSubmit = (data: TestFormData) => {
    setTest(data);
    setIsQuestionConfiguratorOpen(true);
    addQuestionGroup();
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Formularz tworzenia testu</h2>
        <Button
          onClick={() => setTestConfiguratorOpen(!isTestConfiguratorOpen)}
          variant="ghost"
          size="sm"
        >
          {isTestConfiguratorOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isTestConfiguratorOpen && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł testu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Wprowadź tytuł testu"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    To jest tytuł twojego testu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wprowadź opis testu"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Podaj krótki opis twojego testu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Wybierz kategorię dla swojego testu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ dostępu</FormLabel>
                  <Select
                    onValueChange={field.onChange as (value: string) => void}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ dostępu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accessTypeEnum.enumValues.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Wybierz, w jaki sposób użytkownicy mogą uzyskać dostęp do
                    twojego testu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('accessType') === 'CODE' && (
              <FormField
                control={form.control}
                name="accessCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod dostępu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Wprowadź kod dostępu"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Podaj kod dostępu do twojego testu.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit">Utwórz test</Button>
          </form>
        </Form>
      )}
    </Card>
  );
};

export default TestCreatorForm;
