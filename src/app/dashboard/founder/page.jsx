'use client'

import OverviewCard from "@/components/dashboard/OverviewCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Briefcase } from '@gravity-ui/icons';
import { BiCheckCircle } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';

const FounderOverviewPage = () => {

  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [stats, setStats] = useState({
    opportunities: 0,
    applications: 0,
    accepted: 0,
  });

  useEffect(() => {
    if (!userEmail) return;

    const fetchStats = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/founder-overview?email=${userEmail}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to fetch overview');
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to load founder overview:', err);
      }
    };

    fetchStats();
  }, [userEmail]);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  const cards = [
    { label: "Total Opportunities", value: stats.opportunities, icon: Briefcase },
    { label: "Total Applications", value: stats.applications, icon: FaPeopleGroup },
    { label: "Accepted Members", value: stats.accepted, icon: BiCheckCircle },
  ];

  const chartData = [
    { name: "Opportunities", value: stats.opportunities },
    { name: "Applications", value: stats.applications },
    { name: "Accepted", value: stats.accepted },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Founder Dashboard Overview
      </h1>
      <OverviewCard cards={cards} />
      <OverviewChart data={chartData} title="Platform Overview" />
    </div>
  );
};

export default FounderOverviewPage;