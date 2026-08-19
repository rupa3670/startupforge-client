'use client'
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

const fundingStages = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

const MyStartupPage = () => {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(true);
  const [startup, setStartup] = useState(null);
  const [editing, setEditing] = useState(false);

  const [startupName, setStartupName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [fundingStage, setFundingStage] = useState(fundingStages[0]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-startup?email=${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
         console.log('session email:', session.user.email);
      console.log('startup data from server:', data);
        setStartup(data);
        if (data) {
          setStartupName(data.startup_name || '');
          setIndustry(data.industry || '');
          setDescription(data.description || '');
          setFundingStage(data.funding_stage || fundingStages[0]);
          setLogoPreview(data.logo || '');
        }
        setLoading(false);
      });
  }, [session?.user?.email]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const uploadLogo = async () => {
    if (!logoFile) return startup?.logo || '';

    const formData = new FormData();
    formData.append('image', logoFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: 'POST', body: formData }
    );
    const data = await res.json();
    if (!data.success) throw new Error('Logo upload failed');
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const logoUrl = await uploadLogo();

      const startupData = {
        startup_name: startupName,
        logo: logoUrl,
        industry,
        description,
        funding_stage: fundingStage,
        founder_email: session?.user?.email,
      };

      const isEdit = Boolean(startup?._id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/startup${isEdit ? `/${startup._id}` : ''}`,
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(startupData),
        }
      );
      const data = await res.json();

      if (data.success || data.modifiedCount >= 0) {
        setStartup({ ...startupData, _id: startup?._id || data.insertedId });
        setEditing(false);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not save your startup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete your startup profile? This cannot be undone.');
    if (!confirmed) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/startup/${startup._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.deletedCount > 0) {
      setStartup(null);
      setStartupName('');
      setIndustry('');
      setDescription('');
      setFundingStage(fundingStages[0]);
      setLogoPreview('');
    }
  };

  if (loading) {
    return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Loading...</p>;
  }

  const showForm = !startup || editing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-2">
            Founder Dashboard
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Startup</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            {startup
              ? 'Manage your startup profile.'
              : 'Set up your startup profile before posting opportunities.'}
          </p>
        </div>

        {!showForm ? (
          // ---------- VIEW MODE ----------
          <div className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-4">
              {startup.logo && (
                <img
                  src={startup.logo}
                  alt={startup.startup_name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-white/10"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {startup.startup_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{startup.industry}</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm">{startup.description}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Funding stage: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.funding_stage}</span>
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 border border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 font-semibold py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          // ---------- CREATE / EDIT FORM ----------
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Startup Name
              </label>
              <input
                type="text"
                required
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                placeholder="e.g. StartupForge"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Logo
              </label>
              <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm text-gray-600 dark:text-gray-300" />
              {logoPreview && (
                <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-xl object-cover mt-3 border border-gray-200 dark:border-white/10" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Industry
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Fintech"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is your startup building?"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Funding Stage
              </label>
              <select
                value={fundingStage}
                onChange={(e) => setFundingStage(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              >
                {fundingStages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errorMsg}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-60"
              >
                {submitting ? 'Saving...' : startup ? 'Save changes' : 'Create startup'}
              </button>
              {startup && (
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyStartupPage;