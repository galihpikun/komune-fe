"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Users,
  ShieldAlert,
  UserCog,
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
    <aside className="w-90 h-screen bg-white border-r flex flex-col justify-between px-5 py-6">
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-600">
            Komune
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Community Based Forums
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
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

      {/* Bottom */}
      <div>
        {/* Create Post */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg">
          <Plus size={18} />
          Create Forums
        </button>

        {/* Bottom Menu */}
        <div className="mt-6 flex flex-col gap-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 transition-all"
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