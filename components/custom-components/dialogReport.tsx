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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Pastikan sudah install: npx shadcn-ui@latest add textarea
import { FileWarning, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner"; // Atau library toast pilihanmu

export function DialogReport({ postId }: { postId: number }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      return toast.error("Alasan harus diisi!");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          post_id: postId,
          reason: reason,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Laporan berhasil dikirim");
        setReason("");
        setOpen(false); // Tutup dialog
      } else {
        toast.error(result.message || "Gagal mengirim laporan");
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
        <div className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer hover:bg-slate-800 rounded-sm text-sm transition-colors">
          <FileWarning size={16} className="text-yellow-500" />
          <span>Report Post</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileWarning className="text-yellow-500" size={20} />
            Laporkan Postingan
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Bantu kami memahami apa yang salah dengan postingan ini. Laporanmu
            akan ditinjau oleh admin.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason" className="text-slate-200">
              Alasan Pelaporan
            </Label>
            <Textarea
              id="reason"
              placeholder="Contoh: Konten tidak pantas, SARA, atau penipuan..."
              className="bg-slate-800 border-slate-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
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
            className="bg-red-600 hover:bg-red-700 text-white border-none">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Laporan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
