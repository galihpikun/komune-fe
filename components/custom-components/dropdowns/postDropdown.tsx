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
import { MoreHorizontal } from "lucide-react";
import { DialogReport } from "../modal-user/dialogReport";
import { DeleteAlertDialog } from "../modal-user/deleteAlertDialog";
import { UpdatePost } from "../modal-user/updatePosts";

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
              <div className="cursor-pointer focus:bg-slate-800 focus:text-white flex gap-2 px-2 py-1 hover:bg-slate-700 rounded-lg">
                <UpdatePost postId={postId}></UpdatePost>
              </div>
              <DropdownMenuItem
                onSelect={(e: any) => e.preventDefault()}
                className="cursor-pointer focus:bg-red-600 focus:text-white flex gap-2 text-red-400">
                <DeleteAlertDialog postId={postId}></DeleteAlertDialog>
              </DropdownMenuItem>
            </>
          ) : (
            <div
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer focus:bg-slate-800 focus:text-white flex gap-2 px-2 py-1 hover:bg-slate-700 rounded-lg">
              <DialogReport postId={postId} />
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
