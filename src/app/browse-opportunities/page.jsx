import { getOpportunities } from '@/actions/OpportunityActions';
import OpportunityCards from '@/components/home/OpportunityCards';
import SearchBar from '@/components/opportunities/SearchBar';
import FilterBar from '@/components/opportunities/FilterBar';
import { HiOutlineSearchCircle } from 'react-icons/hi';

const BrowseOpportunities = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || '';
  const workType = params?.workType || '';
  const industry = params?.industry || '';

  const opportunities = await getOpportunities({ search, workType, industry });

  return (
    <section className="mx-auto max-w-7xl py-10 px-4 sm:px-6">
      
      <div className="flex flex-col items-center text-center mb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          Browse Opportunities
        </span>
        
      </div>

      
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
       
        <aside className="w-full lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <FilterBar />
          </div>
        </aside>

        
        <div className="w-full flex-1 min-w-0">
          {opportunities.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                <HiOutlineSearchCircle className="text-indigo-400" size={32} />
              </div>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                No opportunities found
              </p>
              <p className="text-base text-gray-400 dark:text-gray-500 mt-2 max-w-sm">
                Try adjusting your filters or search terms to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <OpportunityCards key={opportunity._id} opportunity={opportunity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseOpportunities;