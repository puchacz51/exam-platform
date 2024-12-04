'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

import { useGroupMembers } from '@/hooks/useGroupMembers';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { addGroupMember, removeGroupMember } from '@actions/groups/modifyGroup';

interface GroupMembersProps {
  groupId: string;
  isOwner: boolean;
}

export const GroupMembers = ({ groupId, isOwner }: GroupMembersProps) => {
  const t = useTranslations('dashboard.groups.members');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: members, refetch } = useGroupMembers(groupId, true);
  const { data: searchResults } = useSearchUsers(searchQuery);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddMember = async (userId: string) => {
    const result = await addGroupMember(groupId, userId);
    if (result.success) {
      toast({ title: 'Member added successfully' });
      refetch();
      router.refresh();
    } else {
      toast({ title: 'Failed to add member', variant: 'destructive' });
    }
  };

  const handleRemoveMember = async (userId: string) => {
    const result = await removeGroupMember(groupId, userId);
    if (result.success) {
      toast({ title: 'Member removed successfully' });
      refetch();
      router.refresh();
    } else {
      toast({ title: 'Failed to remove member', variant: 'destructive' });
    }
  };

  const filteredUsers = searchResults?.users?.filter(
    (user) => !members?.some((member) => member.id === user.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{t('title')}</h2>
        {isOwner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {t('addButton')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('addDialog.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('addDialog.description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {filteredUsers?.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                              {user.lastname ? user.lastname[0] : ''}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstname} {user.lastname}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddMember(user.id)}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {members?.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                    {member.firstname[0]}
                    {member.lastname[0]}
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {member.firstname} {member.lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
              {isOwner && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
