import { FC } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm';

const TestAccessListHeader: FC = () => {
  const t = useTranslations('testAssignment.list');

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{t('newAssignment')}</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-[min(90%,1600px)] overflow-y-auto">
            <TestAccessForm
              initialGroups={[]}
              hideTestSelection={false}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TestAccessListHeader;
