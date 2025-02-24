"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function TabNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="pt-8 text-lg font-semibold">
            <div className="flex border-b">
                <button
                    onClick={() => router.push('/')}
                    className={`mr-4 pb-2 transition-colors duration-200 ${pathname === '/'
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-400"
                        }`}
                >
                    Home
                </button>

                <button
                    onClick={() => router.push('/userManagement')}
                    className={`mr-4 pb-2 transition-colors duration-200 ${pathname === '/userManagement'
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-400"
                        }`}
                >
                    User Management
                </button>

                <button
                    onClick={() => router.push('/dbTest')}
                    className={`mr-4 pb-2 transition-colors duration-200 ${pathname === '/dbTest'
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-blue-400"
                        }`}
                >
                    Test Data DB
                </button>
            </div>
        </div>
    );
}
