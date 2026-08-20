'use client'
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const ApplyButton = ({ opportunityId }) => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return null;
    if (!session) {
        return (
            <Link
                href={`/login?redirect=/browse-opportunities/${opportunityId}`}
                className="mt-8 block text-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            >
                Login to Apply
            </Link>
        );
    }
    if (session.user.role !== 'collaborator') return null;

    return (
        <Link
            href={`/dashboard/collaborator/my-applications/${opportunityId}/apply`}
            className="mt-8 block text-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
        >
            Apply Now
        </Link>
    );
};

export default ApplyButton;