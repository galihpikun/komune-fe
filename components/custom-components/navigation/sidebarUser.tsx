"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Users,
  ShieldAlert,
  Settings,
  CircleHelp,
  Plus,
  FileUser,
  Shield,
} from "lucide-react";
import { CreatePost } from "../modal-user/createPost";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

export default function AppSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Home",
      href: "/user/home",
      icon: Home,
    },
    {
      title: "Your Posts",
      href: "/user/user-posts",
      icon: FileUser,
    },
     ...(role === "admin" || role === "super_admin"
      ? [
          {
            title: "Admin Page",
            href: "/admin/dashboard",
            icon: Shield,
          },
        ]
      : []),
  ];

  const bottomItems = [
    {
      title: "Settings",
      href: "/user/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/help",
      icon: CircleHelp,
    },
   
  ];

  async function getMe() {
    try {
      const response = await fetch(`${API_URL}/api/users/get-me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setRole(result.data.role);
      }
    } catch (error) {
      toast.error("Failed to load profile, please relog");
    }
  }
  useEffect(()=> {
    getMe();
  }, []);

  return (
    <aside className="w-85 h-screen bg-[#0F172A] border-r border-gray-700 flex flex-col justify-between px-5 py-6">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-600">Komune</h1>

          <p className="text-sm text-gray-400 mt-1">Community Based Posting</p>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-[#1E293B] hover:text-white"
                  }
                `}>
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <CreatePost></CreatePost>

        <div className="mt-6 flex flex-col gap-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1E293B] hover:text-white transition-all duration-200">
                <Icon size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
