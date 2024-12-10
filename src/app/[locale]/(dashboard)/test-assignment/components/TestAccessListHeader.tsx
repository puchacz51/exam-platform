import { FC, useState } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm';

const TestAccessListHeader: FC = () => {
  const t = useTranslations('testAssignment.list');
  const [searchQuery, setSearchQuery] = useState('');
  const [accessTypeFilter, setAccessTypeFilter] = useState('all');

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('searchPlaceholder')}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={accessTypeFilter}
          onValueChange={setAccessTypeFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t('filterByAccess')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            <SelectItem value="CODE">{t('codeAccess')}</SelectItem>
            <SelectItem value="GROUP">{t('groupAccess')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TestAccessListHeader;
