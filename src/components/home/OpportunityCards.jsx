import { Calendar, Briefcase, House } from '@gravity-ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@heroui/react';
import React from 'react';

const OpportunityCards = ({ opportunity }) => {
    return (
        <Card className='h-full shadow-sm  bg-indigo-50  dark:bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {opportunity.role_title}
                </CardTitle>
            </CardHeader>
            <CardContent className='p-4 space-y-2'>
                <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                    <House height={16} width={16} />
                    <span>{opportunity.startup_name}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                    <Briefcase height={16} width={16} />
                    <span>{opportunity.required_skills.join(", ")}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                    <Calendar height={16} width={16} />
                    <span>Deadline: {opportunity.deadline}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default OpportunityCards;