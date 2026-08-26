'use server';

export async function getOpportunities({ search = '', workType = '', industry = '', page = 1, limit = 6 } = {}) {
  const query = new URLSearchParams();

  if (search) query.set('search', search);
  if (workType) query.set('workType', workType);
  if (industry) query.set('industry', industry);
  query.set('page', page); 
  query.set('limit', limit);     

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-opportunities?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  return res.json();
}