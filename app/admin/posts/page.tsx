import AdminSidebar from "@/components/custom-components/navigation/sidebarAdmin";
import AdminTopbar from "@/components/custom-components/navigation/topbarAdmin";

export default function postsModeration() {
  return (
    <div className="min-h-screen bg-[#0C1222] flex overflow-hidden">
      <div className="hidden lg:block">
        <AdminSidebar  />
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
        
        />

        <div className="p-4 lg:p-8 text-white overflow-y-auto">
          <h2 className="text-2xl font-bold">Posts Overview</h2>
        </div>
      </main>
    </div>
  );
}
