'use client';
import { useEffect, useState } from 'react';
import { Pencil, TrashBin, Plus, Magnifier, Persons } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';

const statusStyle = {
  open: 'bg-emerald-500',
  closing: 'bg-amber-500',
  closed: 'bg-gray-400 dark:bg-slate-600',
};

const statusLabel = {
  open: 'Open',
  closing: 'Closing soon',
  closed: 'Closed',
};

const ManageOpportunities = () =>{
  const{data:session,isPending} = authClient.useSession();
  const userEmail = session?.user?.email;
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if(isPending) return;
    if (!userEmail) {
      setLoading(false);  
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-opportunities?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch opportunities:', err);
        setLoading(false);   
      });
  }, [userEmail]);

 
  const getStatus = (op) => {
    if (op.status) return op.status;
    const daysLeft = (new Date(op.deadline) - new Date()) / (1000 * 60 * 60 * 24);
    if (daysLeft < 0) return 'closed';
    if (daysLeft <= 5) return 'closing';
    return 'open';
  };

  // TODO: replace with a real confirm modal
  const openDeleteModal = (id) => {
    console.log('open delete modal for', id);
  };

  // TODO: replace with a real edit modal / form
  const openEditModal = (op) => {
    console.log('open edit modal for', op._id);
  };

  const tabs = [
    { key: 'all', label: 'All roles' },
    { key: 'open', label: 'Open' },
    { key: 'closing', label: 'Closing soon' },
    { key: 'closed', label: 'Closed' },
  ];

  const filtered = opportunities
    .filter((op) => activeTab === 'all' || getStatus(op) === activeTab)
    .filter((op) => op.role_title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400 mb-1">
            Founder dashboard
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Manage opportunities
          </h1>
        </div>

        <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-lg shadow-violet-600/20 transition">
          <Plus width={16} height={16} />
          Post opportunity
        </button>
      </div>

      {/* Search + Tabs */}
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Magnifier
            width={16}
            height={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunities"
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-400 dark:text-slate-500 py-10 text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 text-center">
          <p className="text-sm text-gray-400 dark:text-slate-500">No opportunities found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((op) => {
            const status = getStatus(op);
            return (
              <div
                key={op._id}
                className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-600 to-blue-600" />

                <div className="pl-3 flex-1 min-w-[180px]">
                  <p className="font-medium text-gray-900 dark:text-white">{op.role_title}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    {op.work_type} &middot; {op.commitment_level}
                  </p>
                </div>

                <div className="text-sm text-gray-500 dark:text-slate-400 min-w-[110px]">
                  Deadline
                  <p className="text-gray-800 dark:text-slate-200 font-medium">
                    {op.deadline ? new Date(op.deadline).toLocaleDateString() : '-'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 min-w-[90px]">
                  <Persons width={16} height={16} />
                  {op.applicant_count ?? 0} applied
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-white ${statusStyle[status]}`}
                >
                  {statusLabel[status]}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(op)}
                    className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700 transition"
                    aria-label="Edit opportunity"
                  >
                    <Pencil width={16} height={16} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(op._id)}
                    className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition"
                    aria-label="Delete opportunity"
                  >
                    <TrashBin width={16} height={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ManageOpportunities;