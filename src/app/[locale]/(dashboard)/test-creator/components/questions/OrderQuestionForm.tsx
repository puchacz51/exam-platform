import React, { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

import { QuestionType } from '../../schemas/questionTypeSchema';

export const OrderQuestionForm = () => {
  const form = useFormContext<QuestionType>();
  const { control } = form;

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'orderItems',
  });

  useEffect(() => {
    if (!fields.length) {
      append({ text: '', order: 1 });
      append({ text: '', order: 2 });
    }
  }, []);

  const handleDragStart = (e: React.DragEvent, fromIndex: number) => {
    e.dataTransfer.setData('text/plain', fromIndex.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData('text/plain'));
    move(fromIndex, toIndex);

    fields.forEach((_, index) => {
      form.setValue(`orderItems.${index}.order`, index + 1);
    });
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Treść pytania</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Wprowadź treść pytania"
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Card>
        <CardContent className="pt-6">
          <FormLabel className="mb-4 block">
            Elementy do uporządkowania
          </FormLabel>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center space-x-4"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="cursor-move">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                </div>
                <div className="w-10 text-center font-medium">{index + 1}</div>
                <FormField
                  control={control}
                  name={`orderItems.${index}.text`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Element ${index + 1}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ text: '', order: fields.length + 1 })}
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" /> Dodaj element
          </Button>
        </CardContent>
      </Card>
      <FormField
        name="orderItems"
        control={control}
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default OrderQuestionForm;
