"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/lib/api";
import { DialogChangeRole } from "./modalChangeUser";
import { DeleteAlertDialog } from "./modalDeleteUser";

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
  created_at: string;
};

export const columns = (
  onDelete: (id: number) => void,
  onChangeRole: (id: number) => void,
): ColumnDef<User>[] => [
  {
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-700">
            <AvatarImage src={`${API_URL}/uploads/users/${user.avatar}`} />
            <AvatarFallback className="bg-slate-800 text-xs">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-white">{user.username}</span>
            <span className="text-xs text-slate-500">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          row.getValue("role") === "super_admin"
            ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
        }`}>
        {row.getValue("role")}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Joined Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at")).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      );
      return <span className="text-slate-400 text-sm">{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1E293B] border-slate-700 text-slate-200">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              asChild
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer">
              <DialogChangeRole
                userId={Number(user.id)}
                userRole={user.role}></DialogChangeRole>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10">
              <DeleteAlertDialog userId={Number(user.id)} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
