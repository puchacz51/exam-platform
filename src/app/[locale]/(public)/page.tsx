import { NextPage } from 'next';

import { HomePageBanner } from './components/home-page/HomePageBanner';
import { Features } from './components/home-page/Features';

const Home: NextPage = async () => {
  return (
    <main className="flex min-h-screen flex-col">
      <HomePageBanner />
      <Features />
    </main>
  );
};

export default Home;
