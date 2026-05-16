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
import { ClipboardList, Loader2, Wrench } from "lucide-react";
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

export function ModalUpdateWorkStatus({ 
  postId, 
  currentStatus, 
  onSuccess 
}: { 
  postId: number, 
  currentStatus: string,
  onSuccess: () => void 
}) {
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!newStatus) return toast.error("Pilih status terlebih dahulu!");
    
    if (currentStatus === newStatus) {
      return toast.error("Status tidak boleh sama dengan sebelumnya!");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/report-work/status/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status_kerja: newStatus
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Status kerja berhasil diperbarui");
        setNewStatus("");
        setOpen(false);
        onSuccess(); // Refresh data di tabel
      } else {
        toast.error(result.message || "Gagal mengubah status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex hover:bg-slate-600 hover:text-white px-2 items-center gap-0.5 w-full justify-start">
           <Wrench className="mr-2 h-4 w-4 text-blue-400" /> Update Status
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-900 text-white border-slate-700 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="text-blue-500" size={20} />
            Update Status
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Perbarui progres penanganan laporan ini. Pastikan status sesuai dengan kondisi lapangan yang sebenarnya.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status" className="text-slate-200">
              Pilih Status Baru
            </Label>

            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value)}>
              <SelectTrigger className="bg-[#0F172A] border-gray-700 text-white h-10 text-sm w-full rounded-xl">
                <SelectValue placeholder="Pilih status kerja" />
              </SelectTrigger>

              <SelectContent className="bg-[#1E293B] border-gray-700 text-white rounded-xl">
                <SelectItem value="not_reviewed">Not Reviewed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
              Batal
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}