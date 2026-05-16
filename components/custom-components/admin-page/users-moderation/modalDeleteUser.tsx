"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { API_URL } from "@/lib/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";


export function DeleteAlertDialog({ userId }: { userId: number }) {
  const router = useRouter();
const token = localStorage.getItem("token");
const decoded: any = token ? jwtDecode(token) : null;
const myId = decoded?.id;


  const isSelf = userId === myId;

  async function removeUser(id: number) {
    if (isSelf) {
      return toast.error("Kamu tidak bisa menghapus akunmu sendiri!");
    }

    try {
      const response = await fetch(`${API_URL}/api/users/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success("User berhasil dihapus");
        router.refresh();

      } else {
        toast.error(result.message || "Gagal menghapus user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan koneksi");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Jika akun sendiri, kita kasih style muted/disabled */}
        <button 
          disabled={isSelf}
          className={`flex w-full items-center gap-2 px-2 py-1.5 text-sm ${
            isSelf ? "opacity-50 cursor-not-allowed text-slate-500" : "text-red-400 hover:bg-red-400/10"
          }`}
        >
          <Trash size={16} />
          <span>Delete User</span>
        </button>
      </AlertDialogTrigger>

      {!isSelf && (
        <AlertDialogContent className="bg-[#1E293B] border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-50">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              This action cannot be undone. User ini akan dihapus permanen dari database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => removeUser(userId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}