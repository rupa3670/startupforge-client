import React from 'react';
import Banner from '../components/home/Banner';

import WhyJoinUs from '@/components/home/WhyJoinUs';
import TransactionsSection from '@/components/home/Transactions';
import FeaturedStartups from '@/components/home/FeaturedStartups';
import OpportunityCards from '@/components/home/OpportunityCards';
import FeaturedOpportunities from '@/components/home/FeaturedOpportunities';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <Banner/>
      <FeaturedStartups/>
      <FeaturedOpportunities/>
      <WhyJoinUs/>
      <TransactionsSection/>
     
    </div>
  );
};

export default HomePage;