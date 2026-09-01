import StartupCards from '@/components/home/StartupCards';
import React from 'react';

const BrowseStartUp = async () => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/all-startup`,{
        cache:'no-store'
    })
    const startups = await res.json();
    return (
        <section className='py-12 mx-auto max-w-7xl container'>
            <div className="flex flex-col items-center text-center mb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          Browse Startup
        </span>
      </div>
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