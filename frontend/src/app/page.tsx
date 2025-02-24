"use client";

import { useState } from "react";
import Link from "next/link";
import { FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiPrisma, SiPostgresql } from "react-icons/si";
import TabNav from "@/components/TabNav";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-950 to-gray-800 text-white">
      <div className="px-4 pt-4">
        <TabNav />
      </div>
      <div className="flex h-screen">

        {/* Left Section - Header */}
        <header className="relative flex flex-col justify-center items-center w-full h-full py-10 px-6 animate-fade-in border-r border-gray-600">
          <h1 className="absolute flex flex-col top-1/4 text-4xl text-white font-semibold mb-6 animate-fade-in-up text-center">
            Data Management App<span className="text-xl mt-2">(PostgresSQL Container)</span>
          </h1>

          <Link
            href="/userManagement"
            className="text-xl bg-gray-200 text-gray-900 rounded px-8 py-3 shadow-lg hover:bg-gray-300 hover:scale-105 transform transition-all duration-200 animate-fade-in-up-1hs"
          >
            User Management
          </Link>

          {/* Collapse/Expand Button */}
          <button
            onClick={toggleCollapse}
            className="mt-10 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            {isCollapsed ? "View Stacks" : "Hide Stacks"}
          </button>
        </header>

        {/* Right Section - Stack */}
        {!isCollapsed && (
          <section className="w-96 h-fit py-10 px-6 flex flex-col justify-center overflow-auto scrollbar-hide">
            <h2 className="underline text-2xl font-bold text-center mb-8 animate-fade-in-down">
              Stacks
            </h2>

            <div className="space-y-8">
              {/* Frontend Stack */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center animate-fade-in">Frontend</h3>
                <div className="flex flex-col gap-4 items-center animate-fade-in-left-1hs">
                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <SiNextdotjs className="text-3xl hover:text-gray-300 transition" />
                    <span className="mt-2">Next.js</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-500" />
              </div>

              {/* Backend Stack */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center animate-fade-in">Backend</h3>
                <div className="flex flex-col gap-4 items-center animate-fade-in-left-2s">
                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <FaNodeJs className="text-3xl text-green-500 hover:text-green-400 transition" />
                    <span className="mt-2">Node.js</span>
                  </div>

                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <SiExpress className="text-3xl text-gray-400 hover:text-gray-300 transition" />
                    <span className="mt-2">Express</span>
                  </div>

                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <SiPrisma className="text-3xl text-blue-500 hover:text-blue-400 transition" />
                    <span className="mt-2">Prisma</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-500" />
              </div>

              {/* Database Stack */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center animate-fade-in">Database</h3>
                <div className="flex flex-col gap-4 items-center animate-fade-in-left-2hs">
                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <SiPostgresql className="text-3xl text-blue-600 hover:text-blue-400 transition" />
                    <span className="mt-2">PostgreSQL</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-500" />
              </div>

              {/* Docker Container */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center animate-fade-in">Docker Container</h3>
                <div className="flex flex-col gap-4 items-center animate-fade-in-left-3s">
                  <div className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <FaDocker className="text-3xl text-blue-500 hover:text-blue-400 transition" />
                    <span className="mt-2">Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
