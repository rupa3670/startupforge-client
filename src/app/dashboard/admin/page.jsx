'use client'
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBill } from 'react-icons/fa';
import OverviewCard from "@/components/dashboard/OverviewCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { BsBriefcaseFill, BsBuildingLock } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { HiOutlineShieldCheck } from "react-icons/hi";

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
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
          <span className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span className="text-sm font-medium">Loading dashboard…</span>
        </div>
      </div>
    );
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
    <div className="p-6 space-y-10 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center gap-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <HiOutlineShieldCheck size={14} />
          Admin Panel
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Platform Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
          A live snapshot of users, startups, opportunities, and revenue across StartupForge.
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 shadow-sm"
      >
        <OverviewCard cards={cards} cols={4} />
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 shadow-sm"
      >
        <OverviewChart title="Platform Overview" data={chartData} />
      </motion.div>

    </div>
  );
};

export default AdminOverviewPage;