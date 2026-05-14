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
      
     
      <div className="sticky top-0 h-screen">
        <AppSidebar />
      </div>

      <div className="flex flex-col flex-1">

        <div className="sticky top-0 z-10">
          <TopBar />
        </div>


        <div className="flex flex-1">
          

          <div className="flex-1 p-10">
            {/* post card nanti */}
            <PostCardSingular postId={id}></PostCardSingular>
          </div>

          <div className="w-90 fixed right-5 p-5">
            <TrendingForums />
          </div>

        </div>
      </div>
    </div>
  );
}