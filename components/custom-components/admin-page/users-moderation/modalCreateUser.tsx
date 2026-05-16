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
import { API_URL } from "@/lib/api";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateUser() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  function resetForm() {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
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

  async function handleSubmit() {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please Fill in All The FIelds", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/users/admin-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, {
          position: "top-center",
        });
        return;
      }

      toast.success("Berhasil Create Akun, silahkan Login!", {
        position: "top-center",
      });
      resetForm();
      router.refresh();
    } catch (error) {
      toast.error("Failed to add Create an Account, Please try again!", {
        position: "top-center",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg">
          <Plus size={18} />
          Create Admin User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border-none bg-[#1E293B] text-white p-6 overflow-hidden">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl text-white">Create User</DialogTitle>

          <DialogDescription className="text-gray-400 text-sm">
            Create a new admin or user account.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 px-4 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Username</Label>

            <Input
              name="username"
              placeholder="Enter username..."
              value={formData.username}
              onChange={(e) => handleInputChanges(e.target)}
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Email</Label>

            <Input
              type="email"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={(e) => handleInputChanges(e.target)}
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Password</Label>

            <Input
              type="password"
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={(e) => handleInputChanges(e.target)}
              className="bg-[#0F172A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
            />
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-200 text-sm">Role</Label>

            <Select
              value={formData.role}
              onValueChange={(value) =>
                handleInputChanges({
                  name: "role",
                  value,
                })
              }>
              <SelectTrigger className="bg-[#0F172A] border-gray-700 text-white h-9 text-sm">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent className="bg-[#1E293B] border-gray-700 text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
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
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4">
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
