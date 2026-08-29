import Link from 'next/link';
import { Calendar, Briefcase, House, ArrowRight } from '@gravity-ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@heroui/react';

const OpportunityCards = ({ opportunity }) => {
    return (
        <Link
            href={`/browse-opportunities/${opportunity._id}`}
            className="block w-full h-full group"
        >
            <Card className='relative h-full w-full overflow-hidden border border-indigo-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer'>

                {/* Accent bar */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

                <CardHeader className="pt-6 pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                            {opportunity.role_title}
                        </CardTitle>
                        <span className="shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 p-2 transition-colors group-hover:bg-indigo-500">
                            <ArrowRight
                                height={14}
                                width={14}
                                className="text-indigo-600 dark:text-indigo-300 transition-colors group-hover:text-white"
                            />
                        </span>
                    </div>

                    <div className='flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1'>
                        <House height={15} width={15} />
                        <span>{opportunity.startup_name}</span>
                    </div>
                </CardHeader>

                <CardContent className='px-6 pb-6 pt-2 space-y-4'>

                    {/* Skills as chips */}
                    {opportunity.required_skills?.length > 0 && (
                        <div className='flex items-start gap-2'>
                            <Briefcase height={16} width={16} className="text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
                            <div className="flex flex-wrap gap-1.5">
                                {opportunity.required_skills.slice(0, 3).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {opportunity.required_skills.length > 3 && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                        +{opportunity.required_skills.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-200 dark:border-gray-700" />

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                            <Calendar height={14} width={14} />
                            <span>Deadline: {opportunity.deadline}</span>
                        </div>
                        {opportunity.work_type && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                                {opportunity.work_type}
                            </span>
                        )}
                    </div>

                </CardContent>
            </Card>
        </Link>
    );
};

export default OpportunityCards;