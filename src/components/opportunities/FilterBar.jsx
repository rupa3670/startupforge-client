'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, Label, ListBox, Button } from '@heroui/react';
import { HiOutlineBriefcase, HiOutlineOfficeBuilding, HiOutlineX, HiOutlineAdjustments } from 'react-icons/hi';

const workTypeOptions = [
  { id: 'Remote', name: 'Remote' },
  { id: 'Hybrid', name: 'Hybrid' },
  { id: 'On-site', name: 'On-site' },
];

const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [industryOptions, setIndustryOptions] = useState([]);

  const currentWorkType = searchParams.get('workType') || null;
  const currentIndustry = searchParams.get('industry') || null;
  const hasActiveFilters = currentWorkType || currentIndustry;

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/industries`);
        const data = await res.json();
        setIndustryOptions(data.map((ind) => ({ id: ind, name: ind })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchIndustries();
  }, []);

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(type, value);
    else params.delete(type);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
};

const clearFilters = () => {
    router.push(pathname, { scroll: false });
};

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
          <HiOutlineAdjustments className="text-indigo-500" size={18} />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
          >
            <HiOutlineX size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Work Type */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <HiOutlineBriefcase size={14} />
            Work Type
          </p>
          <Select
            className="w-full"
            placeholder="All Work Type"
            selectedKey={currentWorkType}
            onSelectionChange={(key) => handleFilter('workType', key)}
          >
            <Label className="sr-only">Work Type</Label>
            <Select.Trigger className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 text-sm">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={workTypeOptions}>
                {(opt) => (
                  <ListBox.Item id={opt.id} textValue={opt.name}>
                    {opt.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Industry */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <HiOutlineOfficeBuilding size={14} />
            Industry
          </p>
          <Select
            className="w-full"
            placeholder="All Industry"
            selectedKey={currentIndustry}
            onSelectionChange={(key) => handleFilter('industry', key)}
          >
            <Label className="sr-only">Industry</Label>
            <Select.Trigger className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 text-sm">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={industryOptions}>
                {(opt) => (
                  <ListBox.Item id={opt.id} textValue={opt.name}>
                    {opt.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;