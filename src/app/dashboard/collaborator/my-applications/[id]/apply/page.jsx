'use client'
import { authClient } from '@/lib/auth-client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ApplyPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [opportunity, setOpportunity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [portfolioLink, setPortfolioLink] = useState('');
    const [motivationMessage, setMotivationMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Auth guard: must be logged in AND must be a collaborator
    useEffect(() => {
        if (!isPending && !session) {
            router.push(`/login?redirect=/dashboard/collaborator/my-applications/${id}/apply`);
        } else if (!isPending && session && session.user.role !== 'collaborator') {
            router.push('/dashboard');
        }
    }, [isPending, session, id, router]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.message === 'Not found') {
                    setNotFound(true);
                } else {
                    setOpportunity(data);
                }
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setSubmitting(true);

        try {
            const applicationData = {
                opportunity_id: id,
                applicant_email: session?.user?.email,
                portfolio_link: portfolioLink,
                motivation_message: motivationMessage,
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationData),
            });
            const data = await res.json();

            if (res.status === 409) {
                setErrMsg(data.message);
            } else if (res.status === 403) {
                setErrMsg(data.message || 'You are not allowed to apply');
            } else if (data.success) {
                setSuccess(true);
            } else {
                setErrMsg(data.message || 'Something went wrong. Please try again');
            }
        } catch (err) {
            setErrMsg('Could not reach the server. Please try again');
        } finally {
            setSubmitting(false);
        }
    };

    if (isPending || loading) {
        return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Loading...</p>;
    }

    if (!session || session.user.role !== 'collaborator') {
        return null; // redirect effect above will fire
    }

    if (notFound) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Opportunity not found
                    </h1>
                    <button
                        onClick={() => router.push('/browse-opportunities')}
                        className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl"
                    >
                        Back to Browse Opportunities
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Application submitted!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Your application for <span className="font-medium">{opportunity?.role_title}</span> has been sent.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/collaborator/my-applications')}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl"
                    >
                        View my applications
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-2">
                        Apply
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {opportunity?.role_title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        {opportunity?.startup_name} &middot; {opportunity?.work_type}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Portfolio Link
                        </label>
                        <input
                            type="url"
                            required
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            placeholder="https://your-portfolio.com"
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Motivation Message
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={motivationMessage}
                            onChange={(e) => setMotivationMessage(e.target.value)}
                            placeholder="Why do you want to join this team?"
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
                        />
                    </div>

                    {errMsg && (
                        <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errMsg}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-60"
                    >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;