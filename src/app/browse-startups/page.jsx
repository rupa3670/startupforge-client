import StartupCards from '@/components/home/StartupCards';
import React from 'react';

const BrowseStartUp = async () => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/all-startup`,{
        cache:'no-store'
    })
    const startups = await res.json();
    return (
        <section className='py-12 mx-auto max-w-7xl container'>
            <h2 className='text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white'>
         Browse Startups
            </h2>
            {startups.length === 0?
            (<p className='text-center text-gray-500 dark:text-gray-400'>No Startups found</p>

            ):(
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6 items-stretch'>
                {startups.map(startup=>(
                    <StartupCards
                    key={startup._id} startup={startup}
                    />
                ))}
            </div>
            )}
        </section>
    );
};

export default BrowseStartUp;