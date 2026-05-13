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
} from "lucide-react";

const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Explore Forums",
    href: "/forums",
    icon: Compass,
  },
  {
    title: "Joined Communities",
    href: "/joined",
    icon: Users,
  },
  {
    title: "Moderation Queue",
    href: "/moderation",
    icon: ShieldAlert,
  },
];

const bottomItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: CircleHelp,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-90 h-screen bg-[#0F172A] border-r border-gray-700 flex flex-col justify-between px-5 py-6">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-600">
            Komune
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Community Based Forums
          </p>
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
                `}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg">
          <Plus size={18} />
          Create Forums
        </button>

        <div className="mt-6 flex flex-col gap-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1E293B] hover:text-white transition-all duration-200"
              >
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