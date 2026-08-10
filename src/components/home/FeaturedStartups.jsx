'use client'
import React, { useEffect, useState } from 'react';
import StartupCardSkeleton from './StartupCardSkeleton';
import StartupCards from './StartupCards';

const FeaturedStartups = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/startup?limit=6`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data);
                setStartups(data);
                setLoading(false);
            });
        
    }, []);   

    return (
        <section className='py-12 mx-auto max-w-7xl px-4'>
            <div className='flex justify-center mb-10'>
    <span className='px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase'>
        Featured Startups
    </span>
</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch'>
                {
                    loading
                        ? Array(6).fill(0).map((_, i) => <StartupCardSkeleton key={i} />)
                        : startups.map(startup => (
                            <StartupCards key={startup._id} startup={startup} />
                          ))
                }
            </div>
        </section>
    );
};

export default FeaturedStartups;