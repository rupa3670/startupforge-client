'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    FiArrowLeft,
    FiAlertTriangle,
    FiCheckCircle,
    FiAlertCircle,
    FiLoader,
    FiSend,
} from 'react-icons/fi';

const MOTIVATION_MAX = 600;

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

            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(applicationData),
            });
            const data = await res.json();

            if (res.status === 409) {
                setErrMsg(data.message);
            } else if (res.status === 401) {
                setErrMsg('Session expired. Please log in again.');
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

    if (!session && !isPending) {
        return null; // redirect already fired in the effect above
    }

    if (isPending || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
                <div className="max-w-2xl mx-auto animate-pulse">
                    <div className="h-3 w-16 bg-indigo-200/60 dark:bg-indigo-500/20 rounded mb-4" />
                    <div className="h-8 w-2/3 bg-gray-200 dark:bg-white/10 rounded mb-2" />
                    <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded mb-8" />
                    <div className="rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] p-6 sm:p-8 space-y-6">
                        <div className="h-12 bg-gray-100 dark:bg-white/5 rounded-xl" />
                        <div className="h-32 bg-gray-100 dark:bg-white/5 rounded-xl" />
                        <div className="h-12 bg-gray-100 dark:bg-white/5 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!session || session.user.role !== 'collaborator') {
        return null;
    }

    if (notFound) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 text-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a]">
                <div>
                    <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                        <FiAlertTriangle className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Opportunity not found
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        This role may have been closed or removed by the founder.
                    </p>
                    <button
                        onClick={() => router.push('/browse-opportunities')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Browse Opportunities
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a]">
                <div className="text-center max-w-md">
                    <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <FiCheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Application submitted!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Your application for <span className="font-medium text-gray-900 dark:text-white">{opportunity?.role_title}</span> at{' '}
                        <span className="font-medium text-gray-900 dark:text-white">{opportunity?.startup_name}</span> has been sent. The founder will review it soon.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/collaborator/my-applications')}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
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
                <Button
                    onClick={() => router.back()}
                    className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <FiArrowLeft className="w-3.5 h-3.5" />
                    Back
                </Button>

                {/* Opportunity summary card */}
                <div className="mb-6 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 flex items-center gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-lg">
                        {opportunity?.startup_name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-1">
                            Applying to
                        </p>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                            {opportunity?.role_title}
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="truncate">{opportunity?.startup_name}</span>
                            {opportunity?.work_type && (
                                <span className="shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5">
                                    {opportunity.work_type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Portfolio link
                        </label>
                        <input
                            type="url"
                            required
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            placeholder="https://your-portfolio.com"
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent transition-shadow"
                        />
                        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                            A link to your work — GitHub, Behance, a live project, anything that shows what you can do.
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Why do you want to join?
                            </label>
                            <span className={`text-xs ${motivationMessage.length > MOTIVATION_MAX ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
                                {motivationMessage.length}/{MOTIVATION_MAX}
                            </span>
                        </div>
                        <textarea
                            required
                            rows={5}
                            maxLength={MOTIVATION_MAX}
                            value={motivationMessage}
                            onChange={(e) => setMotivationMessage(e.target.value)}
                            placeholder="What draws you to this team, and what would you bring to it?"
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent resize-none transition-shadow"
                        />
                    </div>

                    {errMsg && (
                        <div className="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3 -mt-2">
                            <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                            <p className="text-sm text-red-600 dark:text-red-400">{errMsg}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <FiLoader className="w-4 h-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <FiSend className="w-4 h-4" />
                                Submit application
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;