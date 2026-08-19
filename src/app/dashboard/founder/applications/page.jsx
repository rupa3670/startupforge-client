'use client'
import { authClient } from '@/lib/auth-client';
import { Check, Xmark } from '@gravity-ui/icons';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const statusStyle={
    pending:'bg-amber-500',
    accepted:'bg-emerald-500',
    rejected:'bg-red-500'
};

const statsLabel={
    pending:'Pending',
    accepted:'Accepted',
    rejected:'Rejected',
};
const FounderApplicationsPage = () => {
    const {data:session,isPending} = authClient.useSession();
    const userEmail = session?.user?.email;

    const [applications,setApplications] = useState([]);
    const [loading,setLoading] = useState(true);
    const [updationgId,setUpdatingId] = useState(null);

    useEffect(()=>{
        if(isPending) return;
        if(!userEmail){
            setLoading(false);
            return;
        }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/founder-applications?email=${userEmail}`)
   .then((res)=>res.json())
   .then((data)=>{
    setApplications(Array.isArray(data)? data:[]);
    setLoading(false);
   })
   .catch((err)=>{
    console.error('Failed to fetch applications:',err);
    toast.error('Failed to load applications');
   });

    },[userEmail,isPending]);

    const  updateStatus = async(id,status)=>{
        setUpdatingId(id);
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${id}/status`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({status}),
        });
    const data = await res.json();
if(data.modifiedCount>=0){
    setApplications((prev)=>
    prev.map((a)=>(a._id === id? {...a,status}:a)));
    toast.success(status==='accepted'?'Application accepted' : 'Application rejected');
}
else{
    toast.error('Could not update status');
    }

}
catch(err){
    console.error('Failed to update status:',err);
    toast.error('Something went wrong. Please try again');
}
finally{
    setUpdatingId(null);
}
        }

    return (
         <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 transition-colors">
      <div className="mb-6">
        <p className="text-xs font-medium text-violet-600 dark:text-violet-400 mb-1">
          Founder dashboard
        </p>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Applications
        </h1>
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
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-white ${statusStyle[a.status || 'pending']}`}
              >
                {statusLabel[a.status || 'pending']}
              </span>

              {(a.status || 'pending') === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    disabled={updatingId === a._id}
                    onClick={() => updateStatus(a._id, 'accepted')}
                    className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition disabled:opacity-50"
                    aria-label="Accept application"
                  >
                    <Check width={16} height={16} />
                  </button>
                  <button
                    disabled={updatingId === a._id}
                    onClick={() => updateStatus(a._id, 'rejected')}
                    className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition disabled:opacity-50"
                    aria-label="Reject application"
                  >
                    <Xmark width={16} height={16} />
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