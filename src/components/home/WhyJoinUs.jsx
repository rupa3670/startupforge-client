"use client";

const stats = [
  { value: "500+", label: "Active collaborators", className: "sm:mt-0" },
  { value: "10x", label: "Faster team building", className: "sm:mt-10" },
  { value: "85%", label: "Match success rate", highlight: true, className: "sm:-mt-4" },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-gray-50 dark:bg-[#0B0E14] py-16 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-10">
          Why join
          <br />
          StartupForge?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl p-6 border shadow-sm transition-all duration-300 ${s.className} ${
                s.highlight
                  ? "bg-blue-600 dark:bg-indigo-600 border-blue-600 dark:border-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10"
              }`}
            >
              <p
                className={`text-4xl font-extrabold mb-1 ${
                  s.highlight
                    ? "text-white"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {s.value}
              </p>
              <p
                className={`text-sm font-medium ${
                  s.highlight
                    ? "text-blue-100 dark:text-indigo-100"
                    : "text-slate-600 dark:text-gray-400"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Rating card */}
        <div className="mt-8 sm:mt-6 sm:w-72 sm:ml-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm flex items-center gap-4">
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            4.8
          </p>
          <div>
            <div className="flex gap-0.5 text-amber-500 text-sm mb-1">
              ★★★★★
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-gray-400">
              Average founder rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}