import React from 'react';
import Banner from '../components/home/Banner';

import WhyJoinUs from '@/components/home/WhyJoinUs';
import TransactionsSection from '@/components/home/Testimonials';
import FeaturedStartups from '@/components/home/FeaturedStartups';
import OpportunityCards from '@/components/home/OpportunityCards';
import FeaturedOpportunities from '@/components/home/FeaturedOpportunities';
import TestimonialsSection from '@/components/home/Testimonials';

const HomePage = () => {
  return (
    <div >
      <Banner/>
      <FeaturedStartups/>
      <FeaturedOpportunities/>
      <WhyJoinUs/>
      <TestimonialsSection/>
     
    </div>
  );
};

export default HomePage;