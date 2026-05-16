"use client";

import { useState } from "react";
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

import { Plus, ImagePlus, Loader2, X } from "lucide-react";

export function CreatePost() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
  });

  function resetForm() {
    setFormData({
      title: "",
      content: "",
      category: "",
      location: "",
    });

    setImages([]);
    setPreviewImages([]);
  }

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    const fileArray = Array.from(files);

    setImages((prev) => [...prev, ...fileArray]);

    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...previewUrls]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Please fill all required fields", {
        position: "top-center",
      });

      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("category", formData.category);
      submitData.append("location", formData.location);

      images.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create post", {
          position: "top-center",
        });

        return;
      }

      toast.success("Post created successfully!", {
        position: "top-center",
      });

      const postId = data.data.id;

      resetForm();

      router.push(`/user/post/${postId}`);
    } catch (error) {
      toast.error("Failed to create post, please try again!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-7 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg">
          <Plus size={18} />
          Create A Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border-none bg-[#1E293B] text-white p-6 overflow-hidden">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl text-white">Create Post</DialogTitle>

          <DialogDescription className="text-gray-400 text-sm">
            Share information or reports with the community.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2">
          {/* TITLE */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Title</Label>

            <Input
              name="title"
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) =>
                handleInputChanges({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
            />
          </div>

          {/* CATEGORY & LOCATION IN ONE ROW */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-200 text-sm">Category</Label>

              <Select
                value={formData.category}
                onValueChange={(value) =>
                  handleInputChanges({
                    name: "category",
                    value,
                  })
                }>
                <SelectTrigger className="bg-[#0F172A] border-gray-700 text-white h-9 text-sm">
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

            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-200 text-sm">
                Location{" "}
                <span className="text-gray-500 text-[10px] ml-1">(Opt)</span>
              </Label>

              <Input
                name="location"
                placeholder="Where?"
                value={formData.location}
                onChange={(e) =>
                  handleInputChanges({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Content</Label>

            <Textarea
              name="content"
              placeholder="Write your post content..."
              value={formData.content}
              onChange={(e) =>
                handleInputChanges({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 min-h-25 resize-none focus-visible:ring-blue-500 text-sm"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-200 text-sm">Images</Label>

            <label
              htmlFor="images"
              className="border-2 border-dashed border-gray-700 rounded-xl p-4 bg-[#0F172A] hover:border-blue-500 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2">
              <ImagePlus size={24} className="text-blue-400" />
              <p className="text-xs text-gray-400">Click to upload images</p>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* PREVIEW */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-1">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden bg-[#0F172A]">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-gray-700 bg-[#0F172A] text-white hover:bg-[#2B4161] h-9 px-4">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            onClick={(e: any) => handleSubmit(e)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
