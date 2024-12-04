import { FC, useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { questionGroupSchema } from '../../schemas/questionsGroup';
import { useTestContext } from '../../store/storeContext';

interface QuestionGroupSettingsForm {
  id: string;
  name: string;
}
interface QuestionGroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionGroupSettingsModal: FC<QuestionGroupSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    currentQuestionGroupId,
    updateQuestionGroup,
    questionGroups,
    removeQuestionGroup,
  } = useTestContext((state) => state);
  const currentQuestionGroup = useMemo(
    () => questionGroups.find((group) => group.id === currentQuestionGroupId),
    [currentQuestionGroupId]
  );

  const form = useForm<QuestionGroupSettingsForm>({
    resolver: zodResolver(questionGroupSchema),
    defaultValues: {
      id: currentQuestionGroupId || '',
      name: currentQuestionGroup?.name || '',
    },
  });

  useEffect(() => {
    form.reset({
      ...currentQuestionGroup,
    });
  }, [currentQuestionGroup, currentQuestionGroupId]);

  const onSubmit = (values: QuestionGroupSettingsForm) => {
    updateQuestionGroup(values);
    onClose();
  };

  const handleDelete = () => {
    if (currentQuestionGroupId) {
      removeQuestionGroup(currentQuestionGroupId);
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={onClose}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ustawienia grupy pytań</DialogTitle>
          </DialogHeader>
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
                    <FormLabel>Nazwa grupy</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Usuń grupę
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                  >
                    Anuluj
                  </Button>
                  <Button type="submit">Zapisz</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Czy na pewno chcesz usunąć tę grupę?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja spowoduje usunięcie grupy wraz ze wszystkimi pytaniami.
              Tej operacji nie można cofnąć.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuestionGroupSettingsModal;
