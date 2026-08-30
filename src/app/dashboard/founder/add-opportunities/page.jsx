'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { HiOutlineBriefcase } from 'react-icons/hi';

const AddOpportunityPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [roleTitle, setRoleTitle] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [workType, setWorkType] = useState('Remote');
  const [commitmentLevel, setCommitmentLevel] = useState('Full-time');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const skillsArray = requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const opportunityData = {
        founderEmail: session?.user?.email,
        role_title: roleTitle,
        required_skills: skillsArray,
        work_type: workType,
        commitment_level: commitmentLevel,
        deadline,
      };

      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(opportunityData),
      });

      const data = await res.json();
      if (res.status === 403) {
        setErrorMsg(data.message);
        setTimeout(() => router.push(data.redirect || '/pricing'), 1500);
        return;
      }
      if (data.success) {
        router.push('/dashboard/founder/manage-opportunities');
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <HiOutlineBriefcase size={14} />
            Add Opportunity
          </span>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
        >

          <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Role Title
            </label>
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Required Skills
            </label>
            <input
              type="text"
              required
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Separate each skill with a comma</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Work Type
              </label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 
  bg-white dark:bg-[#0f172a] 
  text-gray-900 dark:text-white 
  px-4 py-3 
  focus:outline-none focus:ring-2 focus:ring-indigo-500/60 
  appearance-none"
              >
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="Remote">Remote</option>
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="On-site">On-site</option>
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Commitment Level
              </label>
              <select
                value={commitmentLevel}
                onChange={(e) => setCommitmentLevel(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 
  bg-white dark:bg-[#0f172a] 
  text-gray-900 dark:text-white 
  px-4 py-3 
  focus:outline-none focus:ring-2 focus:ring-indigo-500/60 
  focus:border-transparent 
  appearance-none"
              >
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="Full-time">
                  Full-time
                </option>
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="Part-time">
                  Part-time
                </option>
                <option className="bg-white text-black dark:bg-[#0f172a] dark:text-white" value="Contract">
                  Contract
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Application Deadline
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitting || isPending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? 'Posting...' : 'Post Opportunity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunityPage;