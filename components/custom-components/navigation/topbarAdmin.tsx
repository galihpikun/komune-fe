"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

interface User {
  username: string;
  email: string;
  role: "admin" | "super_admin";
  avatarUrl?: string;
}

export default function AdminTopbar() {
  const [user,setUser] = useState<User>();

  async function getMe() {
      try {
        const response = await fetch(`${API_URL}/api/users/get-me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUser({
            username: result.data.username,
            email:result.data.email,
            role: result.data.role,
            avatarUrl: result.data.avatar
          }); 
        }
  
      } catch (error) {
        toast.error("Failed to load profile, please relog");
      }
    };
  
    useEffect(()=> {
      getMe();
    },[])


  // Format role untuk tampilan
  const roleLabel = user?.role === "super_admin" ? "Super Admin" : "Admin";

  return (
    <header className="w-full h-16 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      {/* Search Bar Area */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input 
          type="text" 
          placeholder="Quick search post, reports, or users..." 
          className="w-full bg-slate-900 border border-slate-700 rounded-md py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="flex items-center gap-6">
        

        <div className="h-8 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-white leading-tight">
              Welcome, {user?.username}
            </p>
            <p className="text-[11px] font-medium text-blue-500 uppercase tracking-tighter">
              {roleLabel}
            </p>
          </div>
          
          <Avatar className="h-9 w-9 border border-slate-700">
            <AvatarImage src={`${API_URL}/uploads/users/${Avatar}`} alt={user?.username} />
            <AvatarFallback className="bg-slate-800 text-white text-xs uppercase">
  {user?.username ? user.username.substring(0, 2) : "??"}
</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}