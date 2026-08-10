'use client'
import React, { useEffect, useState } from 'react';
import OpportunityCards from './OpportunityCards';
import { Spinner } from '@heroui/react';

const FeaturedLoading = () => {
    return (
        <div className="flex items-center justify-center py-20">
            <Spinner size="lg" color="primary" />
        </div>
    );
};

const FeaturedOpportunities = () => {
    const [opportunity, setOpportunity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities?limit=6`)
            .then(res => res.json())
            .then(data => {
                setOpportunity(data);
                setLoading(false);
            });
    }, []);

    return (
        <section className='py-12 mx-auto max-w-7xl px-4'>
           
            <div className='flex justify-center mb-10'>
    <span className='px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase'>
        Featured Opportunities
    </span>
</div>
            {loading ? (
                <FeaturedLoading />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch'>
                    {opportunity.map(opportunities => (
                        <OpportunityCards key={opportunities._id} opportunity={opportunities} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedOpportunities;