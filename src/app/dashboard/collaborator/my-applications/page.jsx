'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { House } from '@gravity-ui/icons';
import { Calendar } from '@heroui/react';

const CollaboratorApplications = () => {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-application?email=${session.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setApplications(data);
        } else {
          setApplications([]);
          setErrorMsg(data?.message || 'Could not load applications.');
        }
      } catch (err) {
        setErrorMsg('Could not load applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isPending, session]);

  if (loading || isPending) {
    return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Loading...</p>;
  }

  if (!session) {
    return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Please log in to view your applications.</p>;
  }

  if (errorMsg) {
    return <p className="p-6 text-sm text-red-500 dark:text-red-400">{errorMsg}</p>;
  }

  if (applications.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center gap-3 py-16">
        <p className="text-gray-500 dark:text-gray-400">No applications yet.</p>
        <Link
          href="/browse-opportunities"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 transition-colors"
        >
          Browse Opportunities
        </Link>
      </div>
    );
  }

  const statusStyle = (status) => {
    if (status === 'accepted') return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
    if (status === 'rejected') return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {applications.map((app) => (
          <div
            key={app._id}
            className="rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm hover:shadow-lg transition-all p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {app.role_title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap capitalize ${statusStyle(app.status)}`}>
                {app.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <House height={16} width={16} />
              <span>{app.startup_name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar height={16} width={16} />
              <span>Applied: {new Date(app.applied_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorApplications;