'use client'
import React, { useState } from 'react';

const AddOpportunityPage = () => {
  const [roleTitle, setRoleTitle] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [workType, setWorkType] = useState('Remote');
  const [commitmentLevel, setCommitmentLevel] = useState('Full-time');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const skillsArray = requiredSkills.split(',')
    .map((skill)=> skill.trim())
    .filter((skill)=>skill.length>0);

    const opportunityData={
        founderEmail: session?.user?.email,
        role_title:roleTitle,
        required_skills:skillsArray,
        work_type:workType,
        commitment_level:commitmentLevel,deadline,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(opportunityData),
    });

    const data = await res.json();
    setSubmitting(false);
    if(data.success){
        router.push('/dashboard/founder/manage-opportunities');
    } else {
      setErrorMsg(data.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-2">
            Founder Dashboard
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Post a new opportunity
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Tell collaborators what role you&apos;re hiring for and what it takes to join your team.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
        >
          {/* subtle gradient glow accent */}
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
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Commitment Level
              </label>
              <select
                value={commitmentLevel}
                onChange={(e) => setCommitmentLevel(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
          {submitting?'Posting...':'Post Opportunity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunityPage;