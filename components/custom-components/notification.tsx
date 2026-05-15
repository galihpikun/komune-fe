"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/lib/api";
import { Bell, Loader, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface Notif {
  id: number;
  user_id: number;
  type: string;
  sender_id: number;
  reference_id: number;
  is_read: boolean;
  created_at: string;
  sender_name: string;
  sender_avatar: string;
}

export function NotificationBell() {
  const [notif, setNotif] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotif = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notifications`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setNotif(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotif();
  }, []);

  async function clearAll() {
    try {
      await fetch(`${API_URL}/api/notifications/clear-all`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotif([]);
      toast.success("Notifikasi berhasil di bersihkan");
    } catch (error) {
      console.error(error);
      toast.error("Notifikasi gagal dibersihkan");
    }
  }

  async function removeNotif(notifId: any) {
    try {
      await fetch(`${API_URL}/api/notifications/${notifId}`, {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotif(notif.filter((n) => n.id !== notifId));
      toast.success("Notifikasi berhasil di bersihkan");
    } catch (error) {
      console.error(error);
      toast.error("Notifikasi gagal dibersihkan");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <Bell className="h-5 w-5 text-blue-500" />
        {notif.length > 0 && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-[#1E293B]" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-[#1E293B] border-slate-700 text-white p-0">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          <Badge
            variant="secondary"
            className="bg-blue-500/20 text-blue-400 border-none">
            {notif.length} New
          </Badge>
        </div>

        <DropdownMenuSeparator className="bg-slate-700 m-0" />

        <ScrollArea className="h-80">
          {notif.length > 0 ? (
            notif.map((n) => (
              <div
                key={n.id}
                className="group relative border-b border-slate-800/50 last:border-0 overflow-hidden">
                <Link
                  href={`/user/post/${n.reference_id}`}
                  className="block p-4 hover:bg-slate-800/50 transition-all pr-10" // Tambah padding kanan agar teks tidak mentok tombol X
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-[10px] text-blue-400 uppercase tracking-wider">
                      {n.type.replace("_", " ")}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug">
                    <span className="font-semibold text-white">
                      {n.sender_name}
                    </span>{" "}
                    {n.type === "like_post" && "menyukai postingan kamu"}
                    {n.type === "comment" && "mengomentari postingan kamu"}
                    {n.type === "reply" && "membalas komentar kamu"}
                    {n.type === "post_approved" && "menyetujui postingan kamu"}
                    {n.type === "post_rejected" && "menolak postingan kamu"}
                  </p>

                  <span className="text-[9px] text-slate-500 mt-2 block italic">
                    {new Date(n.created_at).toLocaleString("id-ID")}
                  </span>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeNotif(n.id);
                  }}
                  className="absolute top-4 right-4 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-slate-700 transition-all z-10">
                  <X size={12} className="text-slate-400" />
                </button>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-xs text-slate-500">
              Belum ada notifikasi
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="bg-slate-700 m-0" />
        <div className="p-2">
          <Button
            onClick={clearAll}
            variant="ghost"
            className="w-full text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300">
            <Trash2 size={12} className="mr-2" />
            Bersihkan Semua
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
