'use client';
import { useEffect, useState } from 'react';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import EditOpportunityModal from '@/components/opportunities/EditOpportunitiesModal';
import DeleteOpportunityModal from '@/components/opportunities/DeleteOpportunitiesModal';


const ManageOpportunities = () => {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editingOp, setEditingOp] = useState(null);
  const [editForm, setEditForm] = useState({ role_title: '', work_type: '', commitment_level: '', deadline: '' });
  const [saving, setSaving] = useState(false);

  // Delete modal state
  const [deletingOp, setDeletingOp] = useState(null);
  const [deleting, setDeleting] = useState(false);

   const fetchOpportunities = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-opportunities?email=${userEmail}`, {
        headers: { Authorization: `Bearer ${tokenData?.token}` },
      });
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error('Failed to fetch opportunities:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isPending) return;
    if (!userEmail) {
      setLoading(false);
      return;
    }
    fetchOpportunities();
  }, [userEmail, isPending]);

  
  const openEditModal = (op) => {
    setEditingOp(op);
    setEditForm({
      role_title: op.role_title || '',
      work_type: op.work_type || '',
      commitment_level: op.commitment_level || '',
      deadline: op.deadline ? new Date(op.deadline).toISOString().split('T')[0] : '',
    });
  };

  const closeEditModal = () => {
    setEditingOp(null);
  };

    const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingOp) return;
    setSaving(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities/${editingOp._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.modifiedCount >= 0) {
        setOpportunities((prev) =>
          prev.map((op) => (op._id === editingOp._id ? { ...op, ...editForm } : op))
        );
        toast.success('Opportunity updated');
        closeEditModal();
      } else {
        toast.error('Could not update opportunity');
      }
    } catch (err) {
      console.error('Failed to update opportunity:', err);
      toast.error('Something went wrong. Please try again');
    } finally {
      setSaving(false);
    }
  };
  const openDeleteModal = (op) => {
    setDeletingOp(op);
  };

  const closeDeleteModal = () => {
    setDeletingOp(null);
  };

   const confirmDelete = async () => {
    if (!deletingOp) return;
    setDeleting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities/${deletingOp._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${tokenData?.token}` },
      });
      const data = await res.json();
      if (data.deletedCount >= 1) {
        setOpportunities((prev) => prev.filter((op) => op._id !== deletingOp._id));
        toast.success('Opportunity deleted');
        closeDeleteModal();
      } else {
        toast.error('Could not delete opportunity');
      }
    } catch (err) {
      console.error('Failed to delete opportunity:', err);
      toast.error('Something went wrong. Please try again');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 transition-colors">
      {/* Header */}
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-blue-700 bg-blue-100">
  Manage opportunities
</span>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-400 dark:text-slate-500 py-10 text-center">Loading...</p>
      ) : opportunities.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 text-center">
          <p className="text-sm text-gray-400 dark:text-slate-500">No opportunities found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {opportunities.map((op) => (
            <div
              key={op._id}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between gap-4 flex-wrap"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-600 to-blue-600" />

              <div className="pl-3 flex-1 min-w-[200px]">
                <p className="font-medium text-gray-900 dark:text-white mb-2">{op.role_title}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {op.work_type && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                      {op.work_type}
                    </span>
                  )}
                  {op.commitment_level && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      {op.commitment_level}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-500 dark:text-slate-400 min-w-[110px]">
                Deadline
                <p className="text-gray-800 dark:text-slate-200 font-medium">
                  {op.deadline ? new Date(op.deadline).toLocaleDateString() : '-'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(op)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700 transition"
                  aria-label="Edit opportunity"
                >
                  <Pencil width={16} height={16} />
                </button>
                <button
                  onClick={() => openDeleteModal(op)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition"
                  aria-label="Delete opportunity"
                >
                  <TrashBin width={16} height={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditOpportunityModal
        editingOp={editingOp}
        editForm={editForm}
        setEditForm={setEditForm}
        saving={saving}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
      />

      <DeleteOpportunityModal
        deletingOp={deletingOp}
        deleting={deleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ManageOpportunities;