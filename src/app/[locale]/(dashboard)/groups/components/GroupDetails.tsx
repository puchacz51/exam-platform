'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/hooks/useToast';
import { deleteGroup, updateGroup } from '@actions/groups/modifyGroup';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { createGroupSchema } from '../schema';

interface GroupDetailsProps {
  initialGroup: {
    id: string;
    name: string;
    description: string | null;
  };
}

export const GroupDetails = ({ initialGroup }: GroupDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations('dashboard.groups.details');
  const form = useForm({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: initialGroup.name,
      description: initialGroup.description || '',
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    const result = await updateGroup(initialGroup.id, data);
    if (result.success) {
      toast({ title: 'Group updated successfully' });
      setIsEditing(false);
      router.refresh();
    } else {
      toast({ title: 'Failed to update group', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    const result = await deleteGroup(initialGroup.id);
    if (result.success) {
      toast({ title: 'Group deleted successfully' });
      router.push('/groups');
    } else {
      toast({ title: 'Failed to delete group', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{t('title')}</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? t('cancel') : t('edit')}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">{t('deleteGroup')}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('deleteConfirm.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('deleteConfirm.description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {isEditing ? (
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

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Group Name</h3>
            <p className="text-muted-foreground">{initialGroup.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">
              {initialGroup.description || 'No description provided'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
