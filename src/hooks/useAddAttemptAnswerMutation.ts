'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { submitAnswer } from '@actions/attempt/submitAnswer';
import { AnswerInput } from '@/types/answers/testAttemptAnswers';

export function useAddAttemptAnswerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AnswerInput) => submitAnswer(data),
    onSuccess: (result) => {
      if (result.data) {
        queryClient.invalidateQueries({ queryKey: ['attemptAnswers'] });
        toast({
          title: 'Success',
          description: 'Answer submitted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to submit answer',
          variant: 'destructive',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });
}
