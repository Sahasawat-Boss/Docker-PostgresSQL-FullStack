"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function TabNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="py-8 animate-fade-in-right">
            <div className="flex border-b">
                <button
                    onClick={() => router.push('/')}
                    className={`mr-4 pb-2 ${pathname === '/'
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                        }`}
                >
                    Home
                </button>

                <button
                    onClick={() => router.push('/userManagement')}
                    className={`mr-4 pb-2 ${pathname === '/userManagement'
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                        }`}
                >
                    User Management
                </button>

                <button
                    onClick={() => router.push('/dbTest')}
                    className={`mr-4 pb-2 ${pathname === '/dbTest'
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                        }`}
                >
                    Test Data DB
                </button>
            </div>
        </div>
    );
}
