import PostCardSingular from "@/components/custom-components/post-card/postcard";
import ProfilePage from "@/components/custom-components/others/profileComponent";
import AppSidebar from "@/components/custom-components/navigation/sidebarUser";
import TopBar from "@/components/custom-components/navigation/topBar";
import TrendingForums from "@/components/custom-components/others/trendingForums";

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  avatar: string | null;
  total_comments: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
  images: string[];
}

export default async function Post({ params }: any) {
  const { id } = await params;

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

        <main className="flex flex-1 justify-center pt-5 p-10 lg:justify-center">
          <ProfilePage></ProfilePage>
        </main>
      </div>
    </div>
  );
}
