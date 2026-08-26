'use client';

import { ChevronsLeft, ChevronsRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Pagination = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber);
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <Link
        href={createPageURL(Math.max(currentPage - 1, 1))}
        className={`px-4 py-2 rounded-lg border text-sm ${
          currentPage === 1 ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50 dark:hover:bg-white/5'
        }`}
      >
       <ChevronsLeft height={18} width={18}/>
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Link
          key={num}
          href={createPageURL(num)}
          className={`px-4 py-2 rounded-lg border text-sm ${
            num === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'hover:bg-gray-50 dark:hover:bg-white/5'
          }`}
        >
          {num}
        </Link>
      ))}

      <Link
        href={createPageURL(Math.min(currentPage + 1, totalPages))}
        className={`px-4 py-2 rounded-lg border text-sm ${
          currentPage === totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50 dark:hover:bg-white/5'
        }`}
      >
        <ChevronsRight height={18} width={18}/>
      </Link>
    </div>
  );
};

export default Pagination;