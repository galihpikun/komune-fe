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
import { ThumbsUp, ThumbsDown, MoreHorizontal, Loader } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CommentSheet from "./commentsSheet";

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  avatar: string | null;
  total_comments: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
  images: string[];
}

export default function PostCardSingular({ postId }: { postId: any }) {
  const [post, setPost] = useState<Post | null>(null);


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
          <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center text-white font-bold">
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
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-200 text-lg leading-none">
              {post.username}
            </h2>
            <span className="text-xs text-gray-400">
  {new Date(post.created_at).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
</span>
          </div>
        </div>
        <button className="text-gray-200 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </CardHeader>

      <CardContent className="pt-0">
        <h1 className="font-semibold text-lg text-gray-200 mb-2">
          {post.title}
        </h1>
        <p className="text-gray-300 leading-relaxed">{post.content}</p>

        {post.images && post.images.length > 0 && (
          <div className="mt-5">
            <Carousel className="w-full">
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="rounded-2xl overflow-hidden bg-gray-800">
                      <img
                        src={`${API_URL}/uploads/posts/${image}`}
                        alt="Post content"
                        className="w-full h-80 object-cover"
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

      <CardFooter className="flex items-center justify-between border-t border-gray-600 py-4">
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
