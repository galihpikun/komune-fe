"use client";

import { useEffect, useState } from "react";
import { NotificationBell } from "./notification";
import SearchBar from "./SearchBar";
import { User, UserCircle } from "lucide-react";
import { API_URL } from "@/lib/api";



export default function TopBar () {

    const [user, setUser] = useState({ username: "", avatar: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/get-avatar`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (result.success) {
          setUser(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

    return (
        <div className="flex p-6 w-full h-25 bg-[#0F172A] shadow-sm justify-between px-8">
                <SearchBar />
                <div className="flex items-center gap-10">
                    <NotificationBell></NotificationBell>
                    <div className="flex items-center gap-3">
      <span className="text-white text-sm">{user.username}</span>
      <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
        {user.avatar ? (
          <img 
            src={`${API_URL}/uploads/avatars/${user.avatar}`} 
            className="h-full w-full object-cover"
            alt="Profile"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-500">
            <User size={20} />
          </div>
        )}
      </div>
    </div>
                </div>
            </div>
    )
}