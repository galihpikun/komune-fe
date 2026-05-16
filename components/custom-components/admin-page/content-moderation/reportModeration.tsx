"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck, Eye } from "lucide-react";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ReportPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("pending");

  const fetchReports = async () => {
    setLoading(true);
    try {
      // Sesuaikan filter status jika backend kamu mendukung query status
      const response = await fetch(`${API_URL}/api/reports`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      if (result.success) {
        // Filter manual di frontend jika backend return semua data
        const filtered = result.data.filter((r: any) => r.status === activeFilter);
        setReports(filtered);
      }
    } catch (error) {
      toast.error("Gagal mengambil data laporan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, [activeFilter]);

  const handleResolve = async (id: number, action: "delete" | "keep") => {
    try {
      const response = await fetch(`${API_URL}/api/reports/resolve/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify({ action }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        fetchReports();
      }
    } catch (error) {
      toast.error("Gagal menyelesaikan laporan");
    }
  };

  const handleReview = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/reports/review/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Laporan ditandai sedang ditinjau");
        fetchReports();
      }
    } catch (error) {
      toast.error("Gagal memperbarui status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-6 p-6">
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Reports Management</h1>
          <div className="flex gap-2 bg-slate-800 p-1 rounded-xl">
            {["pending", "reviewed", "resolved"].map((f) => (
              <Button
                key={f}
                variant={activeFilter === f ? "default" : "ghost"}
                onClick={() => setActiveFilter(f)}
                className="capitalize rounded-lg h-8 text-xs text-white hover:text-blue-500"
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {reports.length === 0 && !loading && (
          <div className="text-slate-500 text-center py-10">Tidak ada laporan.</div>
        )}

        {reports.map((report) => (
          <div key={report.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <Card className="lg:col-span-2 rounded-3xl border-none shadow-sm bg-[#1E293B] text-white overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-slate-700/50 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <AlertTriangle className="text-red-500" size={18} />
                  <span className="text-sm font-bold text-red-400">Reported Post</span>
                </div>
                <Badge className="bg-red-500/10 text-red-400 border-none capitalize">
                  {report.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Info Penulis Asli */}
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`${API_URL}/uploads/users/${report.author_avatar}`} />
                    <AvatarFallback>{report.author_username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">Posted by @{report.author_username}</span>
                </div>

                <h2 className="font-semibold text-lg text-gray-200">{report.post_title}</h2>
                <p className="text-gray-300 text-sm line-clamp-3">{report.post_content}</p>

                {report.post_images && report.post_images.length > 0 && (
                  <div className="mt-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {report.post_images.map((image: any, index: number) => (
                          <CarouselItem key={index} className="basis-full">
                            <div className="rounded-2xl overflow-hidden bg-gray-800 aspect-video">
                              <img
                                src={`${API_URL}/uploads/posts/${image}`}
                                className="w-full h-full object-cover"
                                alt="Reported content"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {report.post_images.length > 1 && (
                        <>
                          <CarouselPrevious className="left-3" />
                          <CarouselNext className="right-3" />
                        </>
                      )}
                    </Carousel>
                  </div>
                )}

                {/* Box Alasan Report */}
                <div className="mt-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                   <p className="text-xs font-bold text-red-400 uppercase mb-1">Reason for Report:</p>
                   <p className="text-sm text-slate-200 italic">"{report.reason}"</p>
                </div>
              </CardContent>

              {activeFilter !== "resolved" && (
                <CardFooter className="flex gap-3 border-t border-gray-700/50 py-4">
                  {activeFilter === "pending" && (
                    <Button 
                      onClick={() => handleReview(report.id)}
                      className="bg-slate-700 hover:bg-slate-600 rounded-xl gap-2 text-white flex-1"
                    >
                      <Eye size={16} /> Mark as Reviewed
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleResolve(report.id, "delete")}
                    className="bg-red-600 hover:bg-red-700 rounded-xl gap-2 text-white flex-1"
                  >
                    <XCircle size={16} /> Delete Post
                  </Button>
                  <Button 
                    onClick={() => handleResolve(report.id, "keep")}
                    
                    className="hover:bg-green-700 bg-green-500 hover:text-white rounded-xl gap-2 flex-1"
                  >
                    <ShieldCheck size={16} /> Keep Post
                  </Button>
                </CardFooter>
              )}
            </Card>

            <aside className="bg-[#1E293B]/50 rounded-3xl p-5 border border-slate-700/50">
              <h3 className="text-slate-500 text-xs font-bold uppercase mb-4">Reporter Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`${API_URL}/uploads/users/${report.reporter_avatar}`} />
                    <AvatarFallback>{report.reporter_username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">@{report.reporter_username}</span>
                    <span className="text-[10px] text-slate-500">
                      Reported on {new Date(report.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-400 mb-2">Report Status</p>
                  <Badge className="bg-blue-500/10 text-blue-400 border-none">
                    Waiting for Action
                  </Badge>
                </div>
              </div>
            </aside>
          </div>
        ))}
      </div>
    </div>
  );
}