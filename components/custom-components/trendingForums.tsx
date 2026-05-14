"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Forum {
  id: number;
  name: string;
  icon_image: string;
  total_members: number;
}

export default function TrendingForums() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTrendingPosts() {
      try {
        const response = await fetch(
          `${API_URL}/api/posts/trending`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await response.json();

        setPosts(result.data || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrendingPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      <Card className="rounded-3xl border-none shadow-sm bg-[#1E293B]">
        <CardHeader>
          <CardTitle className="text-xl text-gray-200">
            Trending Posts
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
           {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between "
        >
          <div>
            <h1 className="font-semibold text-white">
              {post.title}
            </h1>

            <p className="text-sm flex items-center gap-2 text-gray-400">
              <Heart size={20} className="text-red-500"></Heart> {post.total_likes} likes
            </p>
          </div>

          <Link
            href={`/user/post/${post.id}`}
            className="bg-blue-500 px-3 py-2 rounded-lg text-white text-sm"
          >
            View
          </Link>
        </div>
      ))}
        </CardContent>
      </Card>
      <Card className="p-5 rounded-2xl bg-linear-to-t from-sky-700 to-indigo-700 text-white">
        <CardTitle className="text-lg">
          See an Innapropriate Posts? <br /><span className="font-semibold">Report it!</span> 
        </CardTitle>

        <CardContent className="flex justify-around gap-5">
          <Button className="bg-white text-blue-500 hover:scale-105 transition-all duration-200 hover:bg-blue-300 hover:text-blue-800">
            Create one
          </Button>
          <Link
            href=""
            className="border-white border-3 rounded-lg px-2 py-1 hover:scale-105 transition-all duration-200 hover:bg-white hover:text-blue-500">
            Find one
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
