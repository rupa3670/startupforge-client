'use client'
import { Button } from '@heroui/react';
import React, { useState } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const PricingPage = () => {
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const isPremium = session?.user?.plan === 'premium';

    const handleUpgrade = async () => {
        const founderEmail = session?.user?.email;
        if (!founderEmail) {
            toast.error('Please log in to upgrade.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ founderEmail }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to start checkout');
            }

            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Something went wrong');
            setLoading(false);
        }
    };

    return (
        <section className='mx-auto max-w-5xl py-16 px-4'>
            <h1 className='text-3xl font-bold text-center mb-4'>Choose Your Plan</h1>
            <p className='text-center text-gray-500 dark:text-gray-400 mb-12'>Upgrade to premium and post unlimited opportunities</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='border rounded-xl p-8 dark:border-gray-700'>
                    <h3 className='text-xl font-semibold mb-2'>Free</h3>
                    <p className='text-3xl font-bold mb-4'>$0</p>
                    <ul className='space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400'>
                        <li><IoCheckmarkCircleOutline className='text-green-700' />Post up 3 opportunities</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Basic dashboard access</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Manage applications</li>
                    </ul>
                    <Button isDisabled className='w-full py-2 rounded-lg border cursor-not-allowed'>Current Plan</Button>
                </div>

                <div className='relative border-2 border-primary rounded-xl p-8'>
                    {isPremium && (
                        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full 
  bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md
  backdrop-blur-md border border-white/20
  dark:border-white/10 dark:shadow-lg">
                             Premium
                        </span>
                    )}

                    <h3 className='text-xl font-semibold mb-2'>Premium</h3>
                    <p className='text-3xl font-bold mb-4'>$12<span className='text-base font-normal'>/month</span></p>
                    <ul className='space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400'>
                        <li><IoCheckmarkCircleOutline className='text-green-700' />Unlimited opportunities</li>
                        <li> <IoCheckmarkCircleOutline className='text-green-700' /> Priority listing</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Advanced analytics</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Priority support</li>
                    </ul>

                    {isPremium ? (
                        <Button isDisabled className='w-full py-2 rounded-lg border cursor-not-allowed'>Current Plan</Button>
                    ) : (
                        <Button
                            onPress={handleUpgrade}
                            isDisabled={loading}
                            className='w-full py-2 rounded-lg bg-primary text-white'
                        >
                            {loading ? 'Redirecting...' : 'Upgrade Now'}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PricingPage;