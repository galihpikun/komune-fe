"use client";

import AppSidebar from "@/components/custom-components/sidebarUser";
import TopBar from "@/components/custom-components/topBar";
import PostsCard from "@/components/custom-components/postsCard";
import TrendingForums from "@/components/custom-components/trendingForums";

export default function Home() {
  return (

    <div className="flex min-h-screen bg-[#0C1222]">
      
     
      <div className="sticky top-0 h-screen">
        <AppSidebar />
      </div>

      <div className="flex flex-col flex-1">

        <div className="sticky top-0 z-10">
          <TopBar />
        </div>


        <div className="flex flex-1">
          

          <div className="flex-1 p-10">
            <PostsCard />
          </div>

          <div className="w-90 fixed right-5 p-5">
            <TrendingForums />
          </div>

        </div>
      </div>
    </div>
  );
}