"use client";

import AppSidebar from "@/components/custom-components/sidebarUser";
import TopBar from "@/components/custom-components/topBar";
import PostsCard from "@/components/custom-components/postsCard";
import TrendingForums from "@/components/custom-components/trendingForums";
import UserPosts from "@/components/custom-components/userPosts";

export default function userPost() {
  return (
    <div className="flex min-h-screen bg-[#0C1222]">
      
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen border-r border-slate-800">
        <AppSidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">

        <header className="sticky top-0 z-20">
          <TopBar />
        </header>

        <main className="flex flex-1 justify-center lg:justify-start">
          <UserPosts></UserPosts>          
          
          

        </main>
      </div>
    </div>
  );
}