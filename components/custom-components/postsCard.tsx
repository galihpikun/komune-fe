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
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  avatar: string | null;
  forum_name: string;
  forum_slug: string;
  total_comments: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
  images: string[];
}

export default function PostsCard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${API_URL}/api/posts`, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        setPosts(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="rounded-3xl border-none w-full max-w-3xl shadow-sm bg-white overflow-hidden">
          {/* HEADER */}
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
            <div className="flex gap-3">
              {/* AVATAR */}
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
                  post.username.charAt(0).toUpperCase()
                )}
              </div>

              {/* USER INFO */}
              <div>
                <h2 className="font-semibold text-gray-900 leading-none">
                  {post.username}
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold uppercase text-blue-600">
                    {post.forum_name}
                  </span>

                  <span className="text-xs text-gray-400">•</span>

                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
              </div>
            </div>

            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="pt-0">
            <h1 className="font-semibold text-lg text-gray-900 mb-2">
              {post.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className="mt-5">
                <Carousel className="w-full">
                  <CarouselContent>
                    {post.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-full">
                        <div className="rounded-2xl overflow-hidden bg-gray-100">
                          <img
                            src={`${API_URL}/uploads/posts/${image}`}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-87 object-cover"
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

          {/* FOOTER */}
          <CardFooter className="flex items-center justify-between border-t py-4">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-blue-600 hover:opacity-80">
                <ThumbsUp size={18} />
                <span className="text-sm font-medium">{post.total_likes}</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500 hover:opacity-80">
                <ThumbsDown size={18} />
                <span className="text-sm font-medium">
                  {post.total_dislikes}
                </span>
              </button>

              <button className="flex items-center gap-2 text-gray-500 hover:opacity-80">
                <MessageSquare size={18} />
                <span className="text-sm font-medium">
                  {post.total_comments}
                </span>
              </button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
