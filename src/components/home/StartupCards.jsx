import { House, Person, Persons } from '@gravity-ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const StartupCards = ({ startup }) => {
    return (
        <Card className='h-full overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer'>

            <CardHeader className="p-0">
                <div className="relative h-40 w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 dark:ring-white/10 bg-white">
                        <Image
                            src={startup.logo}
                            alt={startup.startup_name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent className='p-5 space-y-3'>
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        {startup.startup_name}
                    </CardTitle>
                    <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                        {startup.industry}
                    </span>
                </div>

                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                        <Person height={16} width={16} className="shrink-0" />
                        <span>Founder: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.founder_name}</span></span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                        <Persons height={16} width={16} className="shrink-0" />
                        <span>Team needed: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.team_size_needed}</span></span>
                    </div>
                </div>
            </CardContent>

        </Card>
    );
};

export default StartupCards;