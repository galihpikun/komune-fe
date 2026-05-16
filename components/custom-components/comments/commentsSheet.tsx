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
      <SheetTrigger className="flex items-center gap-2 text-gray-300 hover:opacity-80">
        <MessageSquare size={18} />
        <span className="text-sm font-medium">{totalComments}</span>
      </SheetTrigger>

      <SheetContent className="bg-[#1E293B] text-gray-100 border-0 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-gray-100">
            Comments ({totalComments})
          </SheetTitle>
          <SheetDescription className="text-gray-200">
            Please be respectful in the discussion.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {tree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={replyComment}
              onUpdate={updateComment}
              onDelete={deleteComment}
              currentUserId={currentUserId} // 3. ID yang sudah di-decode diteruskan
            />
          ))}
        </div>

        <div className="border-t border-gray-700 p-3 space-y-2">
          <div className="flex flex-col gap-2">
             <Textarea
              placeholder={currentUserId ? "Write a comment..." : "Login to comment"}
              disabled={!currentUserId}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-[#0F172A] border-gray-700 text-white"
            />
            <div className="flex justify-end">
              <Button 
                onClick={createComment} 
                disabled={!currentUserId}
                className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}