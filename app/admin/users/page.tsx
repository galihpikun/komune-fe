import AdminSidebar from "@/components/custom-components/navigation/sidebarAdmin";
import AdminTopbar from "@/components/custom-components/navigation/topbarAdmin";
import UserManagement from "@/components/custom-components/admin-page/users-moderation/usersCards";

export default function usersModeration() {
  return (
    <div className="min-h-screen bg-[#0C1222] flex overflow-hidden">
      <div className="hidden lg:block">
        <AdminSidebar  />
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
      
        />

        <div className="p-4 lg:p-8 text-white overflow-y-auto">
          <h2 className="text-2xl font-bold">Users Moderation</h2>
          <UserManagement></UserManagement>
        </div>
      </main>
    </div>
  );
}
