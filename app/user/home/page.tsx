"use client";

import AppSidebar from "@/components/custom-components/sidebarUser";
import TopBar from "@/components/custom-components/topBar";
import PostsCard from "@/components/custom-components/postsCard";

export default function Home() {
  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-10">
          <PostsCard />
        </div>
      </div>
    </div>
  );
}