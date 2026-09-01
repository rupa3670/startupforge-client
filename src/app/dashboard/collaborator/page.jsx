'use client'

import OverviewCard from "@/components/dashboard/OverviewCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ListCheck } from '@gravity-ui/icons';
import { BiCheckCircle, BiTimeFive } from 'react-icons/bi';

const CollaboratorOverviewPage = () => {

  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [stats, setStats] = useState({
    totalApplications: 0,
    accepted: 0,
    pending: 0,
  });

  useEffect(() => {
    if (!userEmail) return;

    const fetchOverview = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/collaborator-overview?email=${userEmail}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                console.log('Overview fetch failed:', data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    fetchOverview();
}, [userEmail]);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  const cards = [
    { label: "Total Applications", value: stats.totalApplications, icon: ListCheck },
    { label: "Accepted", value: stats.accepted, icon: BiCheckCircle },
    { label: "Pending", value: stats.pending, icon: BiTimeFive },
  ];

  const chartData = [
    { name: "Applications", value: stats.totalApplications },
    { name: "Accepted", value: stats.accepted },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="p-6 space-y-10">

      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Overview</h1>
        </div>

      <OverviewCard cards={cards} />
      <OverviewChart data={chartData} title="My Application Overview" />

      <div>
        
      </div>

    </div>
  );
};

export default CollaboratorOverviewPage;