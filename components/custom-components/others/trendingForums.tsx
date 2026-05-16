"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TrendingUp, MessageSquarePlus, Search } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { CreatePost } from "../modal-user/createPost";

export default function TrendingPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTrendingPosts() {
      try {
        const response = await fetch(`${API_URL}/api/posts/trending`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        setPosts(result.data || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrendingPosts();
  }, []);

  return (
    <div className="flex flex-col gap-6 text-gray-200">
      {/* Trending Section */}
      <Card className="rounded-[2rem] border border-slate-700/50 shadow-xl bg-[#1E293B] overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-4">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            Trending Now
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col p-0">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/user/post/${post.id}`}
                className={`flex items-center justify-between p-5 transition-all hover:bg-slate-800/50 group ${
                  index !== posts.length - 1
                    ? "border-b border-slate-700/30"
                    : ""
                }`}>
                <div className="flex flex-col gap-1">
                  <h1 className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <p className="text-xs flex items-center gap-1.5 text-slate-400">
                      <Heart
                        size={14}
                        className="text-red-500 fill-red-500/20"
                      />
                      {post.total_likes.toLocaleString()} likes
                    </p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
                  Read
                </div>
              </Link>
            ))
          ) : (
            <p className="p-10 text-center text-slate-500 text-sm italic">
              No trending posts today.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="relative p-8 rounded-[2rem] bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              Share Your Thoughts
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Have something interesting to say? Start a conversation and
              connect with others.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl py-6 transition-transform active:scale-95">
              <CreatePost></CreatePost>
            </Button>

            <Link
              href="/explore"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
              <Search size={16} />
              Explore More
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
