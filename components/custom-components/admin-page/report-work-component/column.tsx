"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import { ModalUpdateWorkStatus } from "./modalChangeStatus";


export type ReportWork = {
  id: number;
  title: string;
  status_kerja: "not_reviewed" | "in_progress" | "resolved";
  created_at: string;
  author_username: string;
  thumbnail: string;
};

export const columns = (onRefresh: () => void): ColumnDef<ReportWork>[] => [
  {
    accessorKey: "title",
    header: "Reported Content",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
            {item.thumbnail ? (
            <img 
              src={`${API_URL}/uploads/posts/${item.thumbnail}`} 
              className="w-full h-full object-cover"
              alt="thumb"
              // Handler jika path gambar salah/404
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1e293b/475569?text=No+Image";
              }}
            />
          ) : (
            /* Tampilan jika memang dari database tidak ada gambar */
            <div className="flex flex-col items-center justify-center">
               <Eye size={14} className="text-slate-600" />
               <span className="text-[8px] text-slate-600 font-bold">NO IMG</span>
            </div>
          )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white line-clamp-1">{item.title}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              Author: @{item.author_username}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status_kerja",
    header: "Work Status",
    cell: ({ row }) => {
      const status = row.getValue("status_kerja") as string;
      return (
        <Badge className={`capitalize font-bold text-[10px] tracking-wider border-none ${
          status === "resolved" 
            ? "bg-emerald-500/10 text-emerald-400" 
            : status === "in_progress" 
            ? "bg-blue-500/10 text-blue-400" 
            : "bg-slate-500/10 text-slate-400"
        }`}>
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Report Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at")).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return <span className="text-slate-400 text-sm">{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1E293B] border-slate-700 text-slate-200 min-w-[160px] w-full">
            <DropdownMenuLabel>Manage Task</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            
            {/* Navigasi ke Postingan */}
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/user/post/${item.id}`} className="flex items-center gap-2">
                <ExternalLink size={14} className="text-blue-400" />
                <span>Visit Post</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-700" />

            {/* Modal Update Status */}
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()} className="cursor-pointer">
               <ModalUpdateWorkStatus 
                 postId={item.id} 
                 currentStatus={item.status_kerja} 
                 onSuccess={onRefresh} 
               />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];