"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-primary-50 to-secondary-50 min-h-screen border-r border-primary-200 p-6 flex flex-col">
      <nav className="space-y-2 flex-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-primary-900 hover:bg-primary-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="mt-auto pt-4 border-t border-primary-200">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg transition-colors bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};
