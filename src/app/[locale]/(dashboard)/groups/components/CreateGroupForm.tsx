'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/ui/multi-select';
import { createGroup } from '@actions/groups/group';
import { useSearchUsers } from '@/hooks/useSearchUsers';

import { type CreateGroupFormData, createGroupSchema } from '../schema';
import { useToast } from '@/hooks/use-toast';

export const CreateGroupForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: searchResults, isLoading } = useSearchUsers(searchQuery);

  const form = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      users: [],
    },
  });

  const onSubmit = async (data: CreateGroupFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createGroup(data);
      if (result.success) {
        // Invalidate both queries to trigger refetch
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['userGroups'] }),
          queryClient.invalidateQueries({ queryKey: ['teamsGroups'] })
        ]);
        toast({
          title: 'Success',
          description: 'Group created successfully',
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create group',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = searchResults?.success
    ? searchResults?.users?.map((user) => ({
        value: user.id,
        label: `${user.firstname} ${user.lastname} (${user.email})`,
      }))
    : [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Users</FormLabel>
              <FormControl>
                <MultiSelect
                  options={userOptions || []}
                  value={field.value || []}
                  onChange={field.onChange}
                  onSearch={setSearchQuery}
                  isLoading={isLoading}
                  placeholder="Search users..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Group'}
        </Button>
      </form>
    </Form>
  );
};
