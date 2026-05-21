"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  ShieldAlert,
  LogOut,
  HardHat
} from "lucide-react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);


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
  };

  async function logout() {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        toast.success("Berhasil logout, anda di direct ke homepage!")
        localStorage.removeItem('token');
        router.push("/")
      }
    } catch (error) {
      toast.error("Failed to load profile, please relog");
    }
  };

  useEffect(()=> {
    getMe();
  },[])

  // admin jelata cuman boleh ini
  const mainItems = [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "posts Moderation", href: "/admin/posts", icon: ClipboardCheck },
    { title: "Reports Work", href: "/admin/reports", icon: HardHat },
    { title: "Content Reports", href: "/admin/moderation", icon: ShieldAlert },
    
  ];

  // cuman super admin yang boleh, admin ga boleh
  const superAdminItems = [
    { title: "User Management", href: "/admin/users", icon: Users },
  ];

  const renderLink = (item: any) => {
    const Icon = item.icon;
    const active = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
          active
            ? "bg-blue-600/10 text-blue-500 border border-blue-600/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}>
        <Icon size={18} />
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen bg-[#0F172A] border-r border-slate-800 flex flex-col p-4 fixed left-0 top-0 z-50 transition-transform -translate-x-full lg:translate-x-0 lg:static lg:inset-0">
      {" "}
      <div className="px-2 mb-8">
        <h1 className="text-xl font-bold text-white tracking-tight">
          KOMUNE <span className="text-blue-500">ADMIN</span>
        </h1>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        {/* Main Section */}
        <div>
          <p className="px-4 mb-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Main Menu
          </p>
          <nav className="flex flex-col gap-1">{mainItems.map(renderLink)}</nav>
        </div>

        {/* Super Admin Section */}
        {role === "super_admin" && (
          <div>
            <p className="px-4 mb-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Management
            </p>
            <nav className="flex flex-col gap-1">
              {superAdminItems.map(renderLink)}
            </nav>
          </div>
        )}
      </div>
      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-800 flex flex-col gap-1">
        <Link
          href="/user/home"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Users size={18} />
          <span>User Page</span>
        </Link>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
