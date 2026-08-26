import { Button } from '@heroui/react';
import React from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

const PricingPage = () => {
//     const handleUpgrade =async ()=>{

//     };
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
        <li><IoCheckmarkCircleOutline className='text-green-700'/> Basic dashboard access</li>
        <li><IoCheckmarkCircleOutline className='text-green-700'/> Manage applications</li>
    </ul>
    <Button isDisabled className='w-full py-2 rounded-lg border cursor-not-allowed'>Current Plan</Button>
</div>
 <div className='border-2 border-primary rounded-xl p-8'>
                    <h3 className='text-xl font-semibold mb-2'>Premium</h3>
                    <p className='text-3xl font-bold mb-4'>$29<span className='text-base font-normal'>/month</span></p>
                    <ul className='space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400'>
                        <li><IoCheckmarkCircleOutline className='text-green-700' />Unlimited opportunities</li>
                        <li> <IoCheckmarkCircleOutline className='text-green-700' /> Priority listing</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Advanced analytics</li>
                        <li><IoCheckmarkCircleOutline className='text-green-700' /> Priority support</li>
                    </ul>
                    <Button
                        // onClick={handleUpgrade}
                        className='w-full py-2 rounded-lg bg-primary text-white'
                    >
                        Upgrade Now
                    </Button>
                </div>
</div>

        </section>
    );
};

export default PricingPage;