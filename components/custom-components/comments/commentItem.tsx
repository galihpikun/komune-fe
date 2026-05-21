"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { API_URL } from "@/lib/api";

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

export default function CommentItem({
  comment,
  onReply,
  onUpdate,
  onDelete,
  currentUserId,
  level = 0,
}: {
  comment: Comment;
  onReply: (parentId: number, content: string) => void;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  currentUserId: number | null;
  level?: number;
}){
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.content);

  // Perbandingan yang aman antara ID login dan ID pemilik komen
  const isOwner =
    currentUserId !== null && Number(currentUserId) === Number(comment.user_id);

  // COMMENT ITEM REDESIGN

return (
  <div className="space-y-3">
    <div className="group relative overflow-hidden rounded-3xl border border-[#1E293B] bg-[#111827]/95 p-4 transition-all duration-300 hover:border-[#2B4161] hover:bg-[#131c2f]">
      {/* subtle glow */}
      <div className="absolute right-[-40px] top-[-40px] h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />

      <div className="relative flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#2B4161] bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white shadow-lg">
            {comment.avatar ? (
              <img
                src={`${API_URL}/uploads/users/${comment.avatar}`}
                className="h-full w-full object-cover"
                alt="avatar"
              />
            ) : (
              comment.username[0].toUpperCase()
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col">
          {/* Top */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {comment.username}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Community Member
              </p>
            </div>

          
          </div>

          {/* Text */}
          <div className="mt-3">
            <p className="text-sm leading-7 text-gray-200">
              {comment.content}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-5 text-xs">
            {/* Reply */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="font-medium text-gray-400 transition hover:text-blue-400">
                  Reply
                </button>
              </DialogTrigger>

              <DialogContent className="border border-[#1E293B] bg-[#0A0F1E] text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">
                    Reply Comment
                  </DialogTitle>

                  <DialogDescription className="text-gray-400">
                    Continue the discussion respectfully.
                  </DialogDescription>
                </DialogHeader>

                <Input
                  className="mt-3 h-12 rounded-xl border-[#1E293B] bg-[#111827] text-white focus-visible:ring-blue-500"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="rounded-xl bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        if (!replyText.trim()) return;
                        onReply(comment.id, replyText);
                        setReplyText("");
                      }}
                    >
                      Send Reply
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Owner Actions */}
            {isOwner && (
              <>
                {/* Edit */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="font-medium text-gray-400 transition hover:text-yellow-400">
                      Edit
                    </button>
                  </DialogTrigger>

                  <DialogContent className="border border-[#1E293B] bg-[#0A0F1E] text-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl text-white">
                        Edit Comment
                      </DialogTitle>

                      <DialogDescription className="text-gray-400">
                        Update your comment content.
                      </DialogDescription>
                    </DialogHeader>

                    <Input
                      className="mt-3 h-12 rounded-xl border-[#1E293B] bg-[#111827] text-white focus-visible:ring-blue-500"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="rounded-xl bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            if (!editText.trim()) return;
                            onUpdate(comment.id, editText);
                          }}
                        >
                          Save Changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="font-medium text-red-400 transition hover:text-red-300">
                      Delete
                    </button>
                  </DialogTrigger>

                  <DialogContent className="border border-[#1E293B] bg-[#0A0F1E] text-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl text-white">
                        Delete Comment?
                      </DialogTitle>
                    </DialogHeader>

                    <DialogDescription className="text-gray-400">
                      This action cannot be undone.
                    </DialogDescription>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => onDelete(comment.id)}
                          className="rounded-xl"
                        >
                          Yes, Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Replies */}
    {comment.replies.length > 0 && (
      <div
        className={`space-y-3 ${
          level === 0
            ? "ml-8 border-l border-[#1E293B] pl-5"
            : "ml-5 border-l border-[#172033] pl-4"
        }`}
      >
        {comment.replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReply={onReply}
            onUpdate={onUpdate}
            onDelete={onDelete}
            currentUserId={currentUserId}
            level={level + 1}
          />
        ))}
      </div>
    )}
  </div>
);
}
