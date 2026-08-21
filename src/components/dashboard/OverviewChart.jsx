'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#A855F7", "#22C55E"]; // blue, purple, green

const OverviewChart = ({ stats }) => {
  const data = [
    { name: "Opportunities", value: stats.opportunities },
    { name: "Applications", value: stats.applications },
    { name: "Accepted", value: stats.accepted },
  ];

  return (
    <div className="mt-10 rounded-2xl p-6 
      bg-white dark:bg-[#0b0f1a] 
      border border-indigo-200/40 dark:border-indigo-500/20
      shadow-sm">
      
      <h2 className="text-lg font-semibold mb-4 
        text-gray-700 dark:text-gray-200">
        Overview Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.15}
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <YAxis
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(99,102,241,0.06)" }}
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "13px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "#9CA3AF", marginBottom: 4 }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              maxBarSize={70}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={`url(#gradient-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;