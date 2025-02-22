"use client";
import React, { useState, useEffect } from 'react';
import TabNav from '@/components/TabNav';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface UserPosts {
    id: number;
    name: string;
    email: string;
    posts: Post[];
}

export default function DBtest() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [userPosts, setUserPosts] = useState<UserPosts[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`${apiUrl}/userPosts`);
                const data: UserPosts[] = await res.json();
                setUserPosts(data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [apiUrl]);

    return (
        <main className="min-h-screen p-4 bg-gray-900">
            <div>
                <TabNav />
            </div>
            <div className="overflow-auto h-[80vh] bg-gray-800 mx-6 py-4 px-8 text-white animate-fade-in-up">
                <h1 className="text-2xl font-bold mb-4">Relational Data of User and Post Table</h1>
                {userPosts.length === 0 ? (
                    <p>No data available in Database</p>
                ) : (
                    userPosts.map((user, index) => (
                        <div key={user.id} className="mb-4 p-4 pb-5 bg-gray-900 animate-fade-in-right">
                            <h2 className="text-xl font-semibold ">{index + 1}.User Name: {user.name}</h2>
                            <h2>User ID: {user.id}</h2>
                            <p>User Email: {user.email}</p>
                            {user.posts.length > 0 ? (
                                <ul className="ml-4 bg-gray-700 px-4">
                                    <h1 className="mt-1" >User Post:</h1>
                                    {user.posts.map((post, index) => (
                                        <li key={post.id}>
                                            <span className="font-bold">{index + 1}. {post.title}:</span> {post.content}
                                        </li>
                                    ))}

                                </ul>
                            ) : (
                                <p className="ml-4">No posts available in Database.</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
