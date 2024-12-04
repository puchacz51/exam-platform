import Link from 'next/link';
import { ChevronRight, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Group } from '@/types/group/group';

interface GroupsListProps {
  groups: Group[];
  totalCount: number;
}

export const GroupsList = ({ groups, totalCount }: GroupsListProps) => {
  const t = useTranslations('dashboard.groups');

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('title')}
          </h2>
          {totalCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {t('subTitle', { count: totalCount })}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          className="hidden sm:flex"
          asChild
        >
          <Link
            href="/groups"
            className="gap-2"
          >
            {t('viewAll')} <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator className="my-4" />
      {groups.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <Users className="h-8 w-8 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            {t('empty.title')}
          </p>
          <Button
            variant="secondary"
            size="sm"
            asChild
          >
            <Link href="/groups">{t('empty.action')}</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('card.member', { count: group.memberCount.value })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href={`/groups/${group.id}`}>
                  {t('view')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        className="mt-4 w-full sm:hidden"
        asChild
      >
        <Link
          href="/groups"
          className="gap-2"
        >
          {t('viewAll')} <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
};
