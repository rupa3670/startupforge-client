'use client'
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { FaMoneyBill } from 'react-icons/fa';
import OverviewCard from "@/components/dashboard/OverviewCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { BsBriefcaseFill, BsBuildingLock } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

const AdminOverviewPage = () => {

  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStartups: 0,
    totalOpportunities: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!userEmail) return;

    const fetchOverview = async () => {
      const { data } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/overview`, {
        headers: { Authorization: `Bearer ${data?.token}` },
      });
      const result = await res.json();
      setStats(result);
    };

    fetchOverview().catch(err => console.log(err));

  }, [userEmail]);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: GrGroup },
    { label: "Total Startups", value: stats.totalStartups, icon: BsBuildingLock },
    { label: "Total Opportunities", value: stats.totalOpportunities, icon: BsBriefcaseFill },
    { label: "Total Revenue", value: `$${stats.totalRevenue}`, icon: FaMoneyBill },
  ];

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Startups", value: stats.totalStartups },
    { name: "Opportunities", value: stats.totalOpportunities },
  ];

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard Overview
      </h1>

      <OverviewCard cards={cards} cols={4} />
      <OverviewChart title="Platform Overview" data={chartData} />

    </div>
  );
};

export default AdminOverviewPage;