'use client'
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { toast } from 'react-toastify';

const statusStyle = {
  Pending: 'bg-amber-500',
  Accepted: 'bg-emerald-500',
  Rejected: 'bg-red-500'
};

const statusLabel = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
};

const FounderApplicationsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (isPending) return;
    if (!userEmail) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/founder-applications?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch applications:', err);
        toast.error('Failed to load applications');
        setLoading(false);
      });
  }, [userEmail, isPending]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.modifiedCount >= 0) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status } : a))
        );
        toast.success(status === 'Accepted' ? 'Application accepted' : 'Application rejected');
      } else {
        toast.error('Could not update status');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Something went wrong. Please try again');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 transition-colors">
      <div className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <HiOutlineBriefcase size={14} />
                  Application
                </span>
              </div>

      {loading ? (
        <p className="text-sm text-gray-400 dark:text-slate-500 py-10 text-center">Loading...</p>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 text-center">
          <p className="text-sm text-gray-400 dark:text-slate-500">No applications found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((a) => (
            <div
              key={a._id}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between gap-4 flex-wrap"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-600 to-blue-600" />

              <div className="pl-3 flex-1 min-w-[200px]">
                <p className="font-medium text-gray-900 dark:text-white">{a.role_title}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{a.applicant_email}</p>
                {a.portfolio_link && (
                  <a
                    href={a.portfolio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-600 dark:text-violet-400 hover:underline mt-1 inline-block"
                  >
                    View portfolio
                  </a>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-300 max-w-xs line-clamp-2">
                {a.motivation_message}
              </p>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-white ${statusStyle[a.status || 'Pending']}`}
              >
                {statusLabel[a.status || 'Pending']}
              </span>

              {(a.status || 'Pending') === 'Pending' && (
                <div className="flex items-center gap-2">
                  <button
                    disabled={updatingId === a._id}
                    onClick={() => updateStatus(a._id, 'Accepted')}
                    className="px-4 py-2 rounded-lg border border-emerald-300 dark:border-emerald-700 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={updatingId === a._id}
                    onClick={() => updateStatus(a._id, 'Rejected')}
                    className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FounderApplicationsPage;