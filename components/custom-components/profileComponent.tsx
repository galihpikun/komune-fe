"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Pastikan sudah install component textarea shadcn
import {
  Edit2,
  Save,
  X,
  User,
  Camera,
  LogOut,
  Loader2,
  Mail,
  Info,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
    bio: "", // Bio ditambahkan
  });

  function handleInputChanges({ name, value }: { name: string; value: string }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_URL}/api/users/get-me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setFormData({
          username: result.data.username || "",
          email: result.data.email || "",
          avatar: result.data.avatar || "",
          bio: result.data.bio || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleSave() {
    if (!formData.username || !formData.email) {
      toast.error("Username and Email are required");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/api/users/side/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          bio: formData.bio, // Mengirim bio ke backend
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success("Profile updated!");
      setIsEditing(false);
      fetchUserData();
    } catch (error: any) {
      toast.error(error.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarUpload() {
    if (!selectedAvatar) return;
    try {
      setUploadingAvatar(true);
      const submitData = new FormData();
      submitData.append("avatar", selectedAvatar);

      const response = await fetch(`${API_URL}/api/users/upload-avatar`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: submitData,
      });

      if (!response.ok) throw new Error();
      toast.success("Avatar updated!");
      setSelectedAvatar(null);
      setPreviewAvatar("");
      fetchUserData();
    } catch (error) {
      toast.error("Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/api/auth/log-out`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } finally {
      localStorage.removeItem("token");
      toast.success("Logged out");
      router.push("/login");
    }
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-40 text-white gap-3">
        <Loader2 className="animate-spin" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-10">
      <div className="bg-[#1E293B] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
        {/* COVER BANNER */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative" />

        <div className="px-6 sm:px-10 pb-10">
          {/* HEADER SECTION (Avatar & Info) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
              {/* AVATAR BOX */}
              <div className="relative group">
                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-[6px] border-[#1E293B] overflow-hidden bg-[#0F172A] shadow-2xl">
                  <img
                    src={previewAvatar || (formData.avatar ? `${API_URL}/uploads/users/${formData.avatar}` : "")}
                    alt="Profile"
                    className={`h-full w-full object-cover ${!previewAvatar && !formData.avatar ? "hidden" : "block"}`}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  {!previewAvatar && !formData.avatar && (
                    <div className="h-full w-full flex items-center justify-center text-slate-500 bg-slate-900">
                      <User size={60} />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center sm:text-left mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {formData.username}
                </h1>
                <p className="text-blue-400 font-medium text-sm">Community Member</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-center gap-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6">
                  <Edit2 size={16} className="mr-2" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                    {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid lg:grid-cols-12 gap-8 mt-12">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-[#0F172A]/50 rounded-3xl p-6 sm:p-8 border border-slate-800/50 space-y-6">
                
                {/* USERNAME */}
                <div className="space-y-3">
                  <Label className="text-slate-500 flex items-center gap-2"><User size={14}/> Username</Label>
                  <Input
                    disabled={!isEditing}
                    name="username"
                    value={formData.username}
                    onChange={(e) => handleInputChanges({ name: e.target.name, value: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white disabled:border-transparent disabled:bg-transparent disabled:px-0 disabled:text-xl font-semibold transition-all"
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-3">
                  <Label className="text-slate-500 flex items-center gap-2"><Mail size={14}/> Email Address</Label>
                  <Input
                    disabled={!isEditing}
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChanges({ name: e.target.name, value: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white disabled:border-transparent disabled:bg-transparent disabled:px-0 transition-all"
                  />
                </div>

                {/* BIO */}
                <div className="space-y-3">
                  <Label className="text-slate-500 flex items-center gap-2"><Info size={14}/> Bio</Label>
                  <Textarea
                    disabled={!isEditing}
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChanges({ name: e.target.name, value: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white min-h-[120px] resize-none disabled:border-transparent disabled:bg-transparent disabled:px-0 disabled:opacity-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: UPLOAD & LOGOUT */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* UPLOAD AVATAR CARD */}
              <div className="bg-[#0F172A]/50 rounded-3xl p-6 border border-slate-800/50">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Camera size={18} className="text-blue-400"/> Change Photo
                </h3>
                <label className="group border-2 border-dashed border-slate-800 hover:border-blue-500/50 transition-all rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-900/30">
                  <Camera size={32} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <p className="text-xs text-slate-500 text-center font-medium">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedAvatar(file);
                        setPreviewAvatar(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                {selectedAvatar && (
                  <Button onClick={handleAvatarUpload} disabled={uploadingAvatar} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    {uploadingAvatar ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Confirm Upload
                  </Button>
                )}
              </div>

              {/* STATS AREA */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Posts" value="12" />
                <StatCard label="Reports" value="5" />
                <StatCard label="Joined" value="2024" />
              </div>

              {/* LOGOUT BUTTON */}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full py-6 rounded-2xl border border-red-500/10 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold mt-auto"
              >
                <LogOut size={18} className="mr-2" /> Logout Account
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0F172A]/50 border border-slate-800 rounded-2xl p-4 text-center">
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</p>
      <p className="text-xl font-black text-white mt-1">{value}</p>
    </div>
  );
}