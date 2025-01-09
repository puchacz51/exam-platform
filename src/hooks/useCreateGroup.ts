import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { createGroup } from '@actions/groups/group';
import { CreateGroupFormData } from '@/app/[locale]/(dashboard)/groups/schema';

export function useCreateGroup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createGroupMutation = async (data: CreateGroupFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createGroup(data);
      if (result.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['userGroups'] }),
          queryClient.invalidateQueries({ queryKey: ['teamsGroups'] }),
        ]);
        toast({
          title: 'Success',
          description: 'Group created successfully',
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create group',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createGroupMutation, isSubmitting };
}
