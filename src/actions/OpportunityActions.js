'use server';

export async function getOpportunities({ search = '', workType = '', industry = '' } = {}) {
  const query = new URLSearchParams();

  if (search) query.set('search', search);
  if (workType) query.set('workType', workType);   
  if (industry) query.set('industry', industry);   

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-opportunities?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  return res.json();
}