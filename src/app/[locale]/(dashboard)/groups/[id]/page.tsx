import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { GroupDetails } from '@/app/[locale]/(dashboard)/groups/components/GroupDetails';
import { getGroupById } from '@actions/groups/getGroup';
import { GroupMembers } from '@/app/[locale]/(dashboard)/groups/components/GroupMembers';

interface GroupPageProps {
  params: {
    id: string;
  };
}

const GroupPage = async ({ params }: GroupPageProps) => {
  const [t, response] = await Promise.all([
    getTranslations('dashboard.groups'),
    getGroupById(params.id),
  ]);

  if (!response.success || !response.data) {
    notFound();
  }

  return (
    <ReactQueryProvider>
      <div className="xs:px-2 container mx-auto max-w-7xl px-2 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {response.data.name}
          </h1>
          <p className="text-muted-foreground">{t('details.description')}</p>
          <Separator />
        </div>

        <div className="grid gap-8">
          <section>
            <Card className="p-6">
              <GroupDetails initialGroup={response.data} />
            </Card>
          </section>

          <section>
            <Card className="p-2 sm:p-6">
              <GroupMembers
                groupId={params.id}
                isOwner={response.data.isOwner}
              />
            </Card>
          </section>
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default GroupPage;
