'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AutoRedirect = ({ to, delay = 2000 }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, delay);

    return () => clearTimeout(timer);
  }, [to, delay, router]);

  return null;
};

export default AutoRedirect;