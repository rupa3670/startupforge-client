import OpportunityCards from '@/components/home/OpportunityCards';
import React from 'react';

const BrowseOpportunities = async () => {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-opportunities`,{
    cache:'no-store'
});
const opportunities = await res.json();
    return (
     <section className='mx-auto max-w-6xl py-12 px-4 container'>
    <h2>
        Browse Opportunities
    </h2>
    {opportunities.length === 0?(
<p className='text-center text-gray-500 dark:text-gray-400'>No opportunities found.</p>
    ):(
 <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch'>
                    {opportunities.map(opportunity => (
                        <OpportunityCards key={opportunity._id} opportunity={opportunity} />
                    ))}
                </div>
    )}
     </section>
    );
};

export default BrowseOpportunities;
