'use client';

const DeleteOpportunityModal = ({ deletingOp, deleting, onClose, onConfirm }) => {
  if (!deletingOp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Delete opportunity?
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Are you sure you want to delete{' '}
          <span className="font-medium text-gray-800 dark:text-slate-200">
            "{deletingOp.role_title}"
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
          >
            No, keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 h-10 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Yes, delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOpportunityModal;