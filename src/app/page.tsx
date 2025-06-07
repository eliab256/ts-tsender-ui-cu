'use client';

import HomeContent from '@/components/HomeContent';
import { useAccount } from 'wagmi';

export default function Home() {
    const { isConnected } = useAccount();
    return (
        <div className="max-w-[1080px] w-full px-4 sm:px-6 lg:px-8 mx-auto">
            {!isConnected ? (
                <div className="flex justify-center items-center h-64">
                    Please connect your wallet to use TSender.
                </div>
            ) : (
                <HomeContent />
            )}
        </div>
    );
}
