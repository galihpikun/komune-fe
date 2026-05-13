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
}: {
  comment: Comment;
  onReply: (parentId: number, content: string) => void;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  currentUserId: number | null;
}) {
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.content);

  // Perbandingan yang aman antara ID login dan ID pemilik komen
  const isOwner = currentUserId !== null && Number(currentUserId) === Number(comment.user_id);

  return (
    <div className="space-y-2">
      {/* Container utama komen menggunakan 2B4161 (extra bright card) */}
      <div className="flex gap-3 p-3 rounded-xl bg-[#2B4161] text-white">
        <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
          {comment.avatar ? (
            <img src={comment.avatar} className="w-full h-full object-cover" alt="avatar" />
          ) : (
            comment.username[0].toUpperCase()
          )}
        </div>

        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold">{comment.username}</span>
          <p className="text-sm text-gray-100">{comment.content}</p>

          <div className="flex gap-3 mt-2 text-xs text-gray-300">
            {/* Tombol Reply selalu ada untuk siapa saja */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:underline">Reply</button>
              </DialogTrigger>
              {/* Dialog menggunakan 0F172A (secondary background) */}
              <DialogContent className="bg-[#0F172A] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Reply comment</DialogTitle>
                  <DialogDescription>Reply to the comments you desire to start a discussion.</DialogDescription>
                </DialogHeader>
                <Input
                  className="bg-[#1E293B] border-gray-600 text-white focus:ring-blue-500"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write reply..."
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        if (!replyText.trim()) return;
                        onReply(comment.id, replyText);
                        setReplyText("");
                      }}
                    >
                      Send
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Tombol Edit & Delete hanya muncul jika isOwner true */}
            {isOwner && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:underline">Edit</button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0F172A] border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">Edit comment</DialogTitle>
                      <DialogDescription>Change the mistakes of your lorem ipsum.</DialogDescription>
                    </DialogHeader>
                    <Input
                      className="bg-[#1E293B] border-gray-600 text-white focus:ring-blue-500"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            if (!editText.trim()) return;
                            onUpdate(comment.id, editText);
                          }}
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0F172A] border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">Delete this comment?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-gray-400 text-sm">Action cannot be undone.</DialogDescription>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => onDelete(comment.id)}
                        >
                          Yes delete
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

      {/* REPLIES (Recursive) */}
      {comment.replies.length > 0 && (
        <div className="ml-6 pl-3 border-l border-gray-600 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}