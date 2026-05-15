"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Pastikan sudah install: npm install jwt-decode
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, FileWarning, Trash } from "lucide-react";
import { DialogReport } from "./dialogReport";
import { DeleteAlertDialog } from "./deleteAlertDialog";

interface DecodedToken {
  id: number;
  username: string;
}

export function DropdownReport({
  postId,
  postOwnerId,
}: {
  postId: any;
  postOwnerId: number;
}) {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setCurrentUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // Cek apakah user yang login adalah pemilik post
  const isOwner = currentUserId === postOwnerId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-gray-200 hover:text-gray-400 focus:ring-0">
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-slate-900 text-white border border-slate-700 w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Options</DropdownMenuLabel>

          {isOwner ? (
            <>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white flex gap-2">
                <Pencil size={16} /> Update
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e: any) => e.preventDefault()} className="cursor-pointer focus:bg-red-600 focus:text-white flex gap-2 text-red-400">
                <DeleteAlertDialog postId={postId}></DeleteAlertDialog>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer focus:bg-slate-800 focus:text-white p-0">
              <DialogReport postId={postId} />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
