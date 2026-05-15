import PostCardSingular from "@/components/custom-components/postcard";
import AppSidebar from "@/components/custom-components/sidebarUser";
import TopBar from "@/components/custom-components/topBar";
import TrendingForums from "@/components/custom-components/trendingForums";


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

export default async function Post({params}:any) {
    const {id} = await params;

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
              
              {/* Home posts */}
              <div className="w-full max-w-3xl p-4 md:p-10">
                <PostCardSingular postId={id} />
              </div>
    
              {/* Sampingan aside */}
              <aside className="hidden xl:block w-[350px] sticky top-[100px] h-fit p-5 mr-5">
                <TrendingForums />
              </aside>
    
            </main>
          </div>
        </div>
  );
}