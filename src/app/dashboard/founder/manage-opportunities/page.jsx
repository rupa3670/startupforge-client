import Link from 'next/link';

// Static design only — no state, no server calls. Just markup + styling to preview the look.

const opportunities = [
  {
    id: '1',
    role_title: 'Frontend Developer',
    work_type: 'Remote',
    deadline: 'Sep 2, 2026',
    applicant_count: 14,
    status: 'open',
  },
  {
    id: '2',
    role_title: 'Backend Engineer',
    work_type: 'Full-time',
    deadline: 'Aug 20, 2026',
    applicant_count: 6,
    status: 'closing',
  },
  {
    id: '3',
    role_title: 'UI/UX Designer',
    work_type: 'Contract',
    deadline: 'Sep 10, 2026',
    applicant_count: 9,
    status: 'open',
  },
  {
    id: '4',
    role_title: 'Growth Marketer',
    work_type: 'Part-time',
    deadline: 'Aug 15, 2026',
    applicant_count: 8,
    status: 'closed',
  },
];

const statusStyle = {
  open: 'bg-emerald-500',
  closing: 'bg-amber-500',
  closed: 'bg-gray-400',
};

const statusLabel = {
  open: 'Open',
  closing: 'Closing soon',
  closed: 'Closed',
};

export default function ManageOpportunities() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div className="relative w-full max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search opportunities"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-sm"
          />
        </div>

        <Link
          href="/dashboard/add-opportunity"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post opportunity
        </Link>
      </div>

      <h1 className="text-xl font-semibold mb-4">Manage opportunities</h1>

      {/* Tabs */}
      <div className="flex gap-6 mb-4 border-b border-gray-200 text-sm">
        <span className="pb-2.5 -mb-px border-b-2 border-gray-900 text-gray-900 font-medium">
          All roles
        </span>
        <span className="pb-2.5 -mb-px border-b-2 border-transparent text-gray-400">Open</span>
        <span className="pb-2.5 -mb-px border-b-2 border-transparent text-gray-400">
          Closing soon
        </span>
        <span className="pb-2.5 -mb-px border-b-2 border-transparent text-gray-400">Closed</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 text-xs">
              <th className="text-left font-medium py-2.5 px-4">Role</th>
              <th className="text-left font-medium py-2.5 px-4">Type</th>
              <th className="text-left font-medium py-2.5 px-4">Deadline</th>
              <th className="text-left font-medium py-2.5 px-4">Applicants</th>
              <th className="text-left font-medium py-2.5 px-4">Status</th>
              <th className="text-right font-medium py-2.5 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((op) => (
              <tr key={op.id} className="border-b border-gray-100 last:border-0">
                <td className="py-3 px-4 font-medium text-gray-800">{op.role_title}</td>
                <td className="py-3 px-4 text-gray-500">{op.work_type}</td>
                <td className="py-3 px-4 text-gray-500">{op.deadline}</td>
                <td className="py-3 px-4 text-gray-500">{op.applicant_count}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle[op.status]}`} />
                    {statusLabel[op.status]}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1 rounded hover:bg-gray-100" aria-label="Open actions">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}