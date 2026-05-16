"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ModerationPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("pending");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/posts/moderation?status=${activeFilter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      if (result.success) setPosts(result.data);
    } catch (error) {
      toast.error("Gagal mengambil data moderasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [activeFilter]);

  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      const endpoint = action === "approve" ? "approve" : "reject";
      const response = await fetch(`${API_URL}/api/posts/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        fetchPosts(); 
      }
    } catch (error) {
      toast.error("Gagal melakukan eksekusi");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      {/* KIRI: LIST POSTS */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Moderation Queue</h1>
          <div className="flex gap-2 bg-slate-800 p-1 rounded-xl">
            {["pending", "approved", "rejected"].map((f) => (
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

        {posts.length === 0 && !loading && (
           <div className="text-slate-500 text-center py-10">Antrean kosong.</div>
        )}

        {posts.map((post) => (
          <div key={post.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* CARD POST */}
            <Card className="lg:col-span-2 rounded-3xl border-none shadow-sm bg-[#1E293B] text-white overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`${API_URL}/uploads/users/${post.avatar}`} />
                  <AvatarFallback>{post.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <h2 className="font-semibold text-gray-200">{post.username}</h2>
                  <span className="text-[10px] text-gray-500">
                    {new Date(post.created_at).toLocaleString("id-ID")}
                  </span>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-400 border-none capitalize">{post.status}</Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <h1 className="font-semibold text-lg text-gray-200 mb-2">{post.title}</h1>
                <p className="text-gray-300 text-sm">{post.content}</p>
                {post.images && post.images.length > 0 && (
              <div className="mt-5">
                <Carousel className="w-full">
                  <CarouselContent>
                    {post.images.map((image:any, index:any) => (
                      <CarouselItem key={index} className="basis-full">
                        <div className="rounded-2xl overflow-hidden bg-gray-800 aspect-video">
                          <img
                            src={`${API_URL}/uploads/posts/${image}`}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {post.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-3" />
                      <CarouselNext className="right-3" />
                    </>
                  )}
                </Carousel>
              </div>
            )}
              </CardContent>
              {activeFilter === "pending" && (
                <CardFooter className="grid grid-cols-2 gap-3 border-t border-gray-700/50 py-4">
                  <Button onClick={() => handleAction(post.id, "approve")} className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2 text-white">
                    <CheckCircle size={16} /> Approve
                  </Button>
                  <Button onClick={() => handleAction(post.id, "reject")} variant="destructive" className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-300 rounded-xl gap-2">
                    <XCircle size={16} /> Reject
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* ASIDE / INSIGHTS (Langsung nempel di sebelah card masing-masing) */}
            <aside className="bg-[#1E293B]/50 rounded-3xl p-5 border border-slate-700/50">
              <h3 className="text-slate-500 text-xs font-bold uppercase mb-4">Mod Insights</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Approved</span>
                  <span className="text-white font-medium">{post.user_approved_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Approval Rate</span>
                  <span className="text-blue-400 font-bold">
                    {post.user_post_count > 0 
                      ? Math.round((post.user_approved_count / post.user_post_count) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-red-400/80 mb-2 text-xs">
                    <AlertTriangle size={14} />
                    <span className="font-semibold">Reports</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">No reports on this user.</p>
                </div>
              </div>
            </aside>
          </div>
        ))}
      </div>
    </div>
  );
}