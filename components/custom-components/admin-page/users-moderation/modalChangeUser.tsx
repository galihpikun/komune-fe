"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileWarning, Loader2, UserCog } from "lucide-react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DialogChangeRole({ userId, userRole }: { userId: number, userRole: string }) {
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (userRole == newRole) {
      return toast.error("Role tidak boleh sama dengan sebelumnya!");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: userId,
          role: newRole
        }),
      });

      const result = await response.json();

     if (result.success) {
        toast.success("Role berhasil diperbarui, Silahkan Refresh"); // Perbaikan teks
        setNewRole("");
        setOpen(false);
      } else {
        toast.error(result.message || "Gagal mengubah role");
      }
    } catch (error) {
      console.error("Report error:", error);
      toast.error("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex hover:bg-slate-600 hover:text-white px-2 items-center gap-0.5 w-full">
           <UserCog className="mr-2 h-4 w-4" /> Change Role
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileWarning className="text-yellow-500" size={20} />
            Ubah Role User
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Ubah peran dan authoritas User ini menjadi User, Admin atau Super Admin. Jangan gajelas asal adminin.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason" className="text-slate-200">
              New Role
            </Label>

            <Select
              value={newRole}
              onValueChange={(value) => setNewRole(value)
              }>
              <SelectTrigger className="bg-[#0F172A] border-gray-700 text-white h-9 text-sm w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent className="bg-[#1E293B] border-gray-700 text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-800">
              Batal
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white border-none">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengubah
              </>
            ) : (
              "Ubah Role"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
