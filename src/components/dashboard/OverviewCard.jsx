'use client'

const OverviewCard = ({cards,cols=3}) => {

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2
        ${cols===4 ? 'lg:grid-cols-4': 'lg:grid-cols-3'} gap-6`}>
         {
            cards.map((card)=>{
                const Icon = card.icon;
                return (
                    <div
                    key={card.label} className="rounded-2xl p-6 
            bg-white dark:bg-[#0b0f1a] 
            border border-indigo-200/40 dark:border-indigo-500/20 
            shadow-sm dark:shadow-none
            hover:shadow-md transition"
                    >
                     <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>

              <Icon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            </div>

            <p className="text-3xl font-bold mt-3 
              bg-gradient-to-r from-indigo-500 to-purple-500 
              dark:from-indigo-400 dark:to-purple-400 
              bg-clip-text text-transparent">
              {card.value}
            </p>
                    </div>
                )
            })
         }   
        </div>
    );
};

export default OverviewCard;