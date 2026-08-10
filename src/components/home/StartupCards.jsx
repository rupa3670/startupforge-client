import { House, Person, Persons } from '@gravity-ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const StartupCards = ({ startup }) => {
    return (
        <Card className='h-full shadow-sm bg-white dark:bg-gray-900 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer'>
            <CardHeader>
                <img
                    src={startup.logo}
                    alt={startup.startup_name}
                    className="object-cover h-40 w-full rounded-t-xl"
                />
            </CardHeader>
            <CardContent className='p-4 space-y-2'>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{startup.startup_name}</CardTitle>
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'><Person height={16} width={16} />
                    <span>{startup.founder_name}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'><House height={16} width={16} />
                    <span>Team Size Needed: {startup.team_size_needed}</span>
                </div>
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'><Persons height={16} width={16} />
                    <span>{startup.founder_name}</span>
                </div>

                
            </CardContent>

        </Card>
    );
};

export default StartupCards;