"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ThumbsUp,
  ThumbsDown,
  Loader,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CommentSheet from "./commentsSheet";
import { DropdownReport } from "./postDropdown"; // Pastikan dropdown diimport
import { Badge } from "@/components/ui/badge"; // Pastikan badge diimport

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  username: string;
  avatar: string | null;
  category: string; // Tambahan
  location?: string; // Tambahan
  status_kerja: string; // Tambahan
  total_comments: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
  images: string[];
}

export default function PostCardSingular({ postId }: { postId: any }) {
  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setPost(result.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleReaction = async (type: "like" | "dislike") => {
    if (!post) return;

    try {
      const response = await fetch(`${API_URL}/api/post-reactions/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ type }),
      });

      const result = await response.json();
      if (result.success) {
        fetchPost();
      }
    } catch (error) {
      console.error(`Error ${type} post:`, error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="p-5 flex items-center gap-2 text-white">
        <Loader className="animate-spin" />
        Loading post...
      </div>
    );
  }

  return (
    <Card className="rounded-3xl border-none w-full max-w-3xl shadow-sm bg-[#1E293B] text-white overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex gap-3 items-center">
          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
            {post.avatar ? (
              <Image
                src={post.avatar}
                alt={post.username}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : (
              post.username?.charAt(0).toUpperCase()
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-200 text-lg leading-none">
                {post.username}
              </h2>
              {/* BADGE KATEGORI */}
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-400 border-none text-[10px] h-5">
                {post.category}
              </Badge>
            </div>

            {/* LOKASI */}
            {post.location && (
              <div className="flex items-center gap-1 text-gray-400 mt-1">
                <MapPin size={12} className="text-red-400" />
                <span className="text-xs italic">{post.location}</span>
              </div>
            )}

            <span className="text-[10px] text-gray-500 mt-0.5">
              {new Date(post.created_at).toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <DropdownReport postId={post.id} postOwnerId={post.user_id} />

          {/* STATUS KERJA (Hanya jika Report) */}
          {post.category === "Report" && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                post.status_kerja === "resolved"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : post.status_kerja === "in_progress"
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              }`}>
              {post.status_kerja === "resolved" ? (
                <CheckCircle size={12} />
              ) : (
                <Clock size={12} />
              )}
              {post.status_kerja === "resolved" && "Selesai"}
              {post.status_kerja === "in_progress" && "Sedang Diproses"}
              {post.status_kerja === "not_reviewed" && "Belum Ditinjau"}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <h1 className="font-semibold text-lg text-gray-200 mb-2">
          {post.title}
        </h1>
        <p className="text-gray-300 leading-relaxed text-sm">{post.content}</p>

        {post.images && post.images.length > 0 && (
          <div className="mt-5">
            <Carousel className="w-full">
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="rounded-2xl overflow-hidden bg-gray-800 aspect-video">
                      <img
                        src={`${API_URL}/uploads/posts/${image}`}
                        alt="Post content"
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

      <CardFooter className="flex items-center justify-between border-t border-gray-700/50 py-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleReaction("like")}
            className="flex items-center gap-2 text-blue-400 hover:scale-110 transition-transform active:opacity-50">
            <ThumbsUp size={18} />
            <span className="text-sm font-medium">{post.total_likes}</span>
          </button>

          <button
            onClick={() => handleReaction("dislike")}
            className="flex items-center gap-2 text-red-400 hover:scale-110 transition-transform active:opacity-50">
            <ThumbsDown size={18} />
            <span className="text-sm font-medium">{post.total_dislikes}</span>
          </button>

          <CommentSheet postId={post.id} totalComments={post.total_comments} />
        </div>
      </CardFooter>
    </Card>
  );
}
