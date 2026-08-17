const FounderOverviewPage = () => {
  const cards = [
    { label: 'Total Opportunities', value: 12 },
    { label: 'Total Applications', value: 34 },
    { label: 'Accepted Members', value: 8 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Founder Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-indigo-200/40 dark:border-indigo-500/20 bg-white dark:bg-black p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FounderOverviewPage;