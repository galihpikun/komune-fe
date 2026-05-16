import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteAlertDialog({ postId }: any) {
  const router = useRouter();

  console.log(postId)
  async function removePost(postId: any) {
    try {
      await fetch(`${API_URL}/api/posts/${postId}`, {
        method: "DELETE",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      
      toast.success("Post berhasil dihapus");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Post gagal dihapus");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-full items-center gap-2">
          <Trash size={16} />
          <span>Delete Post</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1E293B]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-50">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-200">
            This action cannot be undone. this post will be permanentlu <span className="text-red-500 font-medium">deleted</span> from our database. its gon be gone nga.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive"onClick={() => removePost(postId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
