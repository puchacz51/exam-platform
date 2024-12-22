import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGroupMembers } from '@/hooks/useGroupMembers';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ViewMembersModalProps {
  groupId: string;
  groupName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewMembersModal = ({
  groupId,
  groupName,
  isOpen,
  onClose,
}: ViewMembersModalProps) => {
  const t = useTranslations('dashboard.testAssignment');
  const { data: members, isLoading } = useGroupMembers(groupId, isOpen);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users size={20} />
            {groupName} {t('viewMembers')}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                >
                  <Avatar className="h-8 w-8">
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                      {member.firstname[0]}
                      {member.lastname[0]}
                    </div>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">
                      {member.firstname} {member.lastname}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-auto"
                  >
                    Member
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
