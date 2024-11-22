import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { TestAccessFormValues } from '@/app/[locale]/(dashboard)/test-assigment/schema/TestAccessSchema';

export const DateTimeSection = () => {
  const { control, getValues, setValue } =
    useFormContext<TestAccessFormValues>();

  return (
    <div className="flex gap-4">
      {/* Start Date & Time */}
      <FormField
        control={control}
        name="startsAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date & Time</FormLabel>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormField
                control={control}
                name="startTime"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      type="time"
                      className="w-[120px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (getValues('startsAt')) {
                          const date = getValues('startsAt');

                          if (!date) return;

                          const [hours, minutes] = e.target.value.split(':');
                          date.setHours(parseInt(hours), parseInt(minutes));
                          setValue('startsAt', date);
                        }
                      }}
                    />
                  </FormControl>
                )}
              />
            </div>
          </FormItem>
        )}
      />

      {/* End Date & Time */}
      <FormField
        control={control}
        name="endsAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End Date & Time</FormLabel>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormField
                control={control}
                name="endTime"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      type="time"
                      className="w-[120px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (getValues('endsAt')) {
                          const date = getValues('endsAt');
                          const [hours, minutes] = e.target.value.split(':');

                          if (!date) return;

                          date.setHours(parseInt(hours), parseInt(minutes));
                          setValue('endsAt', date);
                        }
                      }}
                    />
                  </FormControl>
                )}
              />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
