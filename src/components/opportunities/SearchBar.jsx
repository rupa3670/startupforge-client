'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      const newQuery = params.toString();
      const currentQuery = searchParams.toString();

      if (newQuery !== currentQuery) {
        router.replace(`${pathname}?${newQuery}`, { scroll: false });
      }
    }, 400); 

    return () => clearTimeout(timeout);
   
  }, [search]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
      <div className="relative flex-1">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by role or skills..."
          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent transition-all"
        />
      </div>
    </form>
  );
};

export default SearchBar;