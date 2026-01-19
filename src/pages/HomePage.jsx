import { useState } from 'react';
import { Layout } from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import GameCategories from '../components/GameCategories';
import ProvidersSection from '../components/ProvidersSection';
import TopSlots from '../components/TopSlots';
import TopLive from '../components/TopLive';

export const HomePage = () => {


  return (
    <Layout >
      <main>
        <HeroBanner />
        <GameCategories />
        <ProvidersSection />
        <TopSlots />
        <TopLive />
      </main>

    </Layout>      
  );
};