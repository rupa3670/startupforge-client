import React from 'react';
import Banner from '../components/home/Banner';

import WhyJoinUs from '@/components/home/WhyJoinUs';
import TransactionsSection from '@/components/home/Transactions';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <Banner/>
      <WhyJoinUs/>
      <TransactionsSection/>
     
    </div>
  );
};

export default HomePage;