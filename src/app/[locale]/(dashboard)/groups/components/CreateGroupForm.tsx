'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

export const CreateGroupForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchUsers(searchQuery);

  const form = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      users: [],
    },
  });

  const userOptions = searchResults?.success
    ? searchResults.users.map((user) => ({
        value: user.id,
        label: `${user.firstname} ${user.lastname} (${user.email})`,
      }))
    : [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createGroup)}
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
                  options={userOptions}
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

        <Button type="submit">Create Group</Button>
      </form>
    </Form>
  );
};
