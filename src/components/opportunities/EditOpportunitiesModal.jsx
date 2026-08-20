'use client';
import { Xmark } from '@gravity-ui/icons';

const EditOpportunityModal = ({ editingOp, editForm, setEditForm, saving, onClose, onSubmit }) => {
  if (!editingOp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
          aria-label="Close"
        >
          <Xmark width={18} height={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit opportunity
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">
              Role title
            </label>
            <input
              type="text"
              required
              value={editForm.role_title}
              onChange={(e) => setEditForm({ ...editForm, role_title: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">
              Work type
            </label>
            <input
              type="text"
              value={editForm.work_type}
              onChange={(e) => setEditForm({ ...editForm, work_type: e.target.value })}
              placeholder="e.g. Remote, Hybrid"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">
              Commitment level
            </label>
            <input
              type="text"
              value={editForm.commitment_level}
              onChange={(e) => setEditForm({ ...editForm, commitment_level: e.target.value })}
              placeholder="e.g. Full-time, Part-time"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={editForm.deadline}
              onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-10 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOpportunityModal;