import ReportPage from "@/components/custom-components/admin-page/content-moderation/reportModeration";
import AdminSidebar from "@/components/custom-components/navigation/sidebarAdmin";
import AdminTopbar from "@/components/custom-components/navigation/topbarAdmin";

export default function postsModeration() {
  return (
    <div className="h-screen bg-[#0C1222] flex overflow-hidden">
      <div className="hidden lg:block h-full border-r border-slate-800">
        <AdminSidebar />
      </div>

      <main className="flex-1 flex flex-col min-w-0 h-full">
        <AdminTopbar />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 lg:p-8">
            <ReportPage />
          </div>
        </div>
      </main>
    </div>
  );
}
