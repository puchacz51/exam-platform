import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Features } from '@/app/[locale]/(public)/components/home-page/Features';
import { HomePageBanner } from '@/app/[locale]/(public)/components/home-page/HomePageBanner';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/some-specific-page-image.jpg'],
    },
  };
}

const Home: NextPage = async () => {
  return (
    <main className="flex min-h-screen flex-col">
      <HomePageBanner />
      <Features />
    </main>
  );
};

export default Home;
