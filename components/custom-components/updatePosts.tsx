"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Loader2, Info } from "lucide-react";

interface UpdatePostProps {
  postId: number;
}

export function UpdatePost({ postId }: UpdatePostProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
  });

  const fetchPostDetail = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();

      if (result.success) {
        const post = result.data;
        setFormData({
          title: post.title,
          content: post.content,
          category: post.category,
          location: post.location || "",
        });

        setExistingImages(post.images || []);
      }
    } catch (error) {
      console.error("Failed to fetch post detail:", error);
    } finally {
      setFetching(false);
    }
  };

  function handleInputChanges({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      // Kirim JSON biasa karena tidak ada file gambar
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update post");
        return;
      }

      toast.success("Post updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => open && fetchPostDetail()}>
      <DialogTrigger asChild>
        <div className="flex w-full items-center gap-2 cursor-pointer">
          <Edit2 size={14} /> Edit Post
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border-none bg-[#1E293B] text-white p-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl">Update Post</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Modify your post details.
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2">
            {/* TITLE */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-200 text-sm">Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={(e) =>
                  handleInputChanges({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                className="bg-[#0F172A] border-gray-700 text-white focus-visible:ring-blue-500 h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CATEGORY */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-200 text-sm">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChanges({ name: "category", value })
                  }>
                  <SelectTrigger className="bg-[#0F172A] border-gray-700 h-9 text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-gray-700 text-white">
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Announcement">Announcement</SelectItem>
                    <SelectItem value="Ask">Ask</SelectItem>
                    <SelectItem value="Discussion">Discussion</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* LOCATION */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-200 text-sm">Location</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChanges({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  }
                  className="bg-[#0F172A] border-gray-700 text-white h-9"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-200 text-sm">Content</Label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={(e) =>
                  handleInputChanges({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                className="bg-[#0F172A] border-gray-700 text-white min-h-[100px] resize-none focus-visible:ring-blue-500 text-sm"
              />
            </div>

            {existingImages.length > 0 && (
              <div className="flex flex-col gap-2">
                <Label className="text-gray-200 text-sm">Post Images</Label>
                <div className="grid grid-cols-4 gap-2">
                  {existingImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-lg overflow-hidden border border-gray-700 aspect-square">
                      <img
                        src={`${API_URL}/uploads/posts/${img}`}
                        className="w-full h-full object-cover"
                        alt="Post content"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-1 text-amber-400">
                  <Info size={14} className="mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] leading-relaxed italic">
                    * Gambar tidak dapat diubah. Jika ingin mengganti gambar,
                    harap hapus postingan ini dan buat postingan baru.
                  </p>
                </div>
              </div>
            )}
          </form>
        )}

        <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-gray-700 bg-[#0F172A] text-white h-9">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={loading || fetching}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-6">
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
