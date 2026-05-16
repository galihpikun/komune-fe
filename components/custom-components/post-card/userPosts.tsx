"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import {
  Loader,
  MapPin,
  MessageSquare,
  ThumbsUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { DropdownReport } from "../dropdowns/postDropdown";
import Link from "next/link";

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  category: string;
  location?: string;
  status: "pending" | "approved" | "rejected";
  status_kerja: "not_reviewed" | "in_progress" | "resolved";
  total_comments: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
  images: string[] | null;
  username: string;
  avatar: string | null;
}

export default function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/user-posts`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setPosts(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-400 gap-3">
        <Loader className="animate-spin text-blue-500" size={32} />
        <p className="text-sm font-medium">Fetching your history...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 pb-10 gap-8 w-full max-w-[1400px] mx-auto py-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Your Reports & Posts
        </h2>
        <p className="text-slate-400 text-sm">
          Manage and track your submitted community reports.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="w-full h-full items-center justify-center">
          <p className="text-lg text-center text-white font-medium">
            You dont have a post yet,
            <br />
            start <span className="text-blue-500 font-semibold ">
              Posting
            </span>{" "}
            and <span className="text-blue-500 font-semibold ">Reporting</span>!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-[#1E293B] border-slate-700/50 overflow-hidden rounded-[1.5rem] shadow-xl flex flex-col h-full">
              <div className="relative group w-full aspect-video bg-slate-900 overflow-hidden rounded-t-xl">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  <Badge
                    className={`
      text-[10px] uppercase font-bold px-2 py-0.5 border-none shadow-lg
      ${
        post.status === "approved"
          ? "bg-emerald-500 text-white"
          : post.status === "rejected"
            ? "bg-rose-500 text-white"
            : "bg-amber-500 text-black"
      }
    `}>
                    {post.status}
                  </Badge>
                </div>
                {post.images && post.images.length > 0 ? (
                  <Carousel className="w-full h-full">
                    {/* PENTING: Kita pakai ml-0 untuk reset margin negatif Shadcn
         dan h-full supaya kontennya narik ke atas/bawah 
      */}
                    <CarouselContent className="h-full ml-0">
                      {post.images.map((image, index) => (
                        /* pl-0 supaya gambar benar-benar mepet ke kiri 
             h-full supaya gambar memenuhi tinggi aspect-video 
          */
                        <CarouselItem key={index} className="pl-0 h-full">
                          <img
                            src={`${API_URL}/uploads/posts/${image}`}
                            alt="Post content"
                            className="w-full h-full object-cover select-none pointer-events-none"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {post.images.length > 1 && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CarouselPrevious className="left-2 h-8 w-8 bg-black/50 border-none text-white hover:bg-black/80 backdrop-blur-sm" />
                        <CarouselNext className="right-2 h-8 w-8 bg-black/50 border-none text-white hover:bg-black/80 backdrop-blur-sm" />
                      </div>
                    )}
                  </Carousel>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 bg-slate-900/30 gap-2">
                    <AlertCircle size={32} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                      No Media Available
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1 leading-tight">
                    {post.title}
                  </h3>
                  <DropdownReport postId={post.id} postOwnerId={post.user_id} />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Calendar size={10} />
                    {new Date(post.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>

                <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
                  {post.content}
                </p>

                <div className="mt-auto space-y-3 pt-3 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    {/* Keliatan status kerja kalau report doang */}
                    {post.category.toLowerCase() === "report" ? (
                      <div
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black tracking-tighter ${
                          post.status_kerja === "resolved"
                            ? "bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                            : post.status_kerja === "in_progress"
                              ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                              : "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                        }`}>
                        {post.status_kerja === "resolved" ? (
                          <CheckCircle2 size={12} strokeWidth={3} />
                        ) : (
                          <Clock size={12} strokeWidth={3} />
                        )}
                        {post.status_kerja === "resolved"
                          ? "RESOLVED"
                          : post.status_kerja === "in_progress"
                            ? "PROCESSING"
                            : "PENDING"}
                      </div>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-3 text-slate-400 font-medium">
                      <div className="flex items-center gap-1 text-[10px]">
                        <ThumbsUp size={12} className="text-slate-500" />{" "}
                        {post.total_likes}
                      </div>
                      <div className="flex items-center gap-1 text-[10px]">
                        <MessageSquare size={12} className="text-slate-500" />{" "}
                        {post.total_comments}
                      </div>
                      <Link
                        href={`/user/post/${post.id}`}
                        className="px-2 py-1 text-sm text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 rounded">
                        Visit Posts
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
