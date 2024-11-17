import React, { useEffect, useState } from 'react';

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
import { QuestionType } from '@/types/test-creator/answers';
import { generateId } from '@/utils/generateId';

export const OrderQuestionForm = () => {
  const form = useFormContext<QuestionType>();
  const { control } = form;
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverlay, setDragOverlay] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'orderItems',
  });

  useEffect(() => {
    if (!fields.length) {
      append({ id: generateId(), text: '', order: 1 });
      append({ id: generateId(), text: '', order: 2 });
    }
  }, [fields.length, append]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setIsDragging(true);
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';

    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    setDragOverlay({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragOverlay) {
      setDragOverlay((prev) =>
        prev
          ? {
              ...prev,
              x: e.clientX,
              y: e.clientY - prev.height / 2,
            }
          : null
      );
    }
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    move(draggedIndex, index);
    setDraggedIndex(index);

    fields.forEach((_, idx) => {
      form.setValue(`orderItems.${idx}.order`, idx + 1);
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedIndex(null);
    setDragOverlay(null);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Treść pytania
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Wprowadź treść pytania"
                className="min-h-[100px] rounded-lg border border-gray-300 shadow-sm focus:border-blue-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Card className="rounded-md border shadow-lg">
        <CardContent className="pb-4 pt-6">
          <FormLabel className="mb-4 block text-base font-semibold">
            Elementy do uporządkowania
          </FormLabel>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="group relative rounded-md border border-gray-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center space-x-4 ">
                  <div className="cursor-move rounded p-2 transition-colors hover:bg-gray-200">
                    <GripVertical className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <FormField
                      control={control}
                      name={`orderItems.${index}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-600">
                            Element {index + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Wprowadź element..."
                              className="rounded-lg border border-gray-300 transition-colors focus:border-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute -right-2 -top-2 h-8 w-8 border bg-white opacity-0 shadow-sm transition-opacity hover:bg-red-100 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <span className="sr-only">Usuń element</span>
                  </Button>
                )}
              </div>
            ))}
            {dragOverlay && isDragging && (
              <div
                className="pointer-events-none fixed z-50 rounded-lg border-2 border-blue-500 bg-blue-100 opacity-75 shadow-lg transition-transform"
                style={{
                  left: dragOverlay.x,
                  top: dragOverlay.y,
                  width: dragOverlay.width,
                  height: dragOverlay.height,
                }}
              />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({ id: generateId(), text: '', order: fields.length + 1 })
            }
            className="mt-6 w-full border-blue-300 bg-blue-50 text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-100"
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
