import Link from 'next/link';
import { Calendar, Briefcase, House, Clock } from '@gravity-ui/icons';
import ApplyButton from '@/components/opportunities/ApplyButton';

const OpportunityDetails = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities/${id}`, {
        cache: 'no-store',
    });
    const opportunity = await res.json();

    if (!opportunity || opportunity.message === 'Not found') {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Opportunity not found
                    </h1>
                    <Link
                        href="/browse-opportunities"
                        className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl"
                    >
                        Back to Browse Opportunities
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-2">
                        Opportunity
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {opportunity.role_title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        {opportunity.startup_name}
                    </p>
                </div>

                <div className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <Briefcase height={18} width={18} className="text-indigo-500" />
                        <span><strong>Required Skills:</strong> {opportunity.required_skills?.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <House height={18} width={18} className="text-indigo-500" />
                        <span><strong>Work Type:</strong> {opportunity.work_type}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <Clock height={18} width={18} className="text-indigo-500" />
                        <span><strong>Commitment:</strong> {opportunity.commitment_level}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <Calendar height={18} width={18} className="text-indigo-500" />
                        <span><strong>Deadline:</strong> {opportunity.deadline}</span>
                    </div>
                </div>

                <ApplyButton opportunityId={opportunity._id} />
            </div>
        </div>
    );
};

export default OpportunityDetails;