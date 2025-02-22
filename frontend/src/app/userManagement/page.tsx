"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '@/components/CardComponent';
import TabNav from '@/components/TabNav';
//import exp from 'constants';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

  // Fetch users every 5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // initial fetch
    const intervalId = setInterval(fetchData, 15000); // fetch every 15s or 15000ms

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [apiUrl]);


  //create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  //update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email });
      setUpdateUser({ id: '', name: '', email: '' });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  //delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-900 ">
      <div>
        <TabNav />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto ">
        {/* Left Section: Add & Update User */}
        <div className="space-y-4 animate-fade-in-left">
          {/* Create user */}
          <form onSubmit={createUser} className="p-4 bg-blue-800 rounded shadow">
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="mb-2 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mb-2 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </form>

          {/* Update user */}
          <form onSubmit={handleUpdateUser} className="p-4 bg-green-800 rounded shadow">
            <input
              placeholder="User ID"
              value={updateUser.id}
              required
              onChange={(e) =>
                setUpdateUser({ ...updateUser, id: e.target.value })
              }
              className="mb-2 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              placeholder="New Name"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, name: e.target.value })
              }
              className="mb-2 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              placeholder="New Email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
              className="mb-2 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Update User
            </button>
          </form>
        </div>

        {/* Right Section: Display Users */}
        <div className="space-y-2 bg-gray-700 overflow-auto h-lvh animate-fade-in-right">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow"
            >
              <CardComponent card={user} />
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );


}