"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { API_URL } from "@/lib/api";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import CommentItem from "./commentItem";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode"; // 1. Import ini

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  parent_comment_id: number | null;
  content: string;
  is_deleted: boolean;
  created_at: string;
  username: string;
  avatar: string | null;
  total_likes: number;
  total_dislikes: number;
  replies: Comment[];
};

// Interface untuk isi token kamu
interface DecodedToken {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function CommentSheet({
  postId,
  totalComments,
}: {
  postId: number;
  totalComments: number;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function fetchComments() {
    const res = await fetch(`${API_URL}/api/comments/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    setComments(result.data);
  }

  useEffect(() => {
    // 2. Decode token untuk dapat ID
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setCurrentUserId(decoded.id); // Set ID dari token (hasilnya 4)
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    fetchComments();
  }, [postId, token]);

  const buildTree = (comments: any[]): Comment[] => {
    const map = new Map<number, Comment>();
    const roots: Comment[] = [];

    comments.forEach((c) => {
      map.set(c.id, { ...c, replies: [] });
    });

    comments.forEach((c) => {
      const node = map.get(c.id)!;
      if (c.parent_comment_id) {
        const parent = map.get(c.parent_comment_id);
        if (parent) parent.replies.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const tree = buildTree(comments);

  async function createComment() {
    if (!content.trim()) return;
    await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post_id: postId,
        content,
        parent_comment_id: null,
      }),
    });
    setContent("");
    await fetchComments();
  }

  async function replyComment(parentId: number, content: string) {
    await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post_id: postId,
        content,
        parent_comment_id: parentId,
      }),
    });
    await fetchComments();
  }

  async function updateComment(id: number, content: string) {
    await fetch(`${API_URL}/api/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    await fetchComments();
  }

  async function deleteComment(id: number) {
    await fetch(`${API_URL}/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchComments();
  }

  return (
  <Sheet>
    <SheetTrigger className="group flex items-center gap-2 rounded-full border border-[#2B4161] bg-[#111827]/80 px-4 py-2 text-gray-300 transition-all duration-300 hover:border-blue-500 hover:bg-[#1E293B] hover:text-white">
      <MessageSquare
        size={17}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-sm font-semibold">{totalComments}</span>
    </SheetTrigger>

    <SheetContent className="border-l border-[#1E293B] bg-[#0A0F1E] p-0 text-white sm:max-w-xl">
      {/* Top Glow */}
      <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header */}
      <SheetHeader className="border-b border-[#1E293B] bg-[#0F172A]/90 px-6 py-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <SheetTitle className="text-2xl font-bold text-white">
              Discussion
            </SheetTitle>

            <SheetDescription className="mt-1 text-sm text-gray-400">
              {totalComments} people joined this conversation.
            </SheetDescription>
          </div>

          
        </div>
      </SheetHeader>

      {/* Comments */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-[#1E293B]">
        {tree.length > 0 ? (
          tree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={replyComment}
              onUpdate={updateComment}
              onDelete={deleteComment}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#111827] border border-[#1E293B]">
              <MessageSquare className="text-blue-400" size={28} />
            </div>

            <h2 className="text-lg font-semibold text-white">
              No comments yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-gray-400">
              Start the discussion and share your thoughts with the community.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Input */}
      <div className="border-t border-[#1E293B] bg-[#0F172A]/90 p-5 backdrop-blur-xl">
        <div className="rounded-3xl border border-[#1E293B] bg-[#111827]/90 p-4 shadow-2xl">
          <Textarea
            placeholder={
              currentUserId
                ? "Share your thoughts..."
                : "Login to join the discussion"
            }
            disabled={!currentUserId}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-5 resize-none border-0 bg-transparent p-0 text-sm text-white placeholder:text-gray-500 focus-visible:ring-0"
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Be respectful and constructive.
            </p>

            <Button
              onClick={createComment}
              disabled={!currentUserId}
              className="h-11 rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700"
            >
              Send Comment
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);
}