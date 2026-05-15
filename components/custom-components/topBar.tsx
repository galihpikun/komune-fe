import { NotificationBell } from "./notification";
import SearchBar from "./SearchBar";
import { UserCircle } from "lucide-react";



export default function TopBar () {



    return (
        <div className="flex p-6 w-full h-25 bg-[#0F172A] shadow-sm justify-between px-8">
                <SearchBar />
                <div className="flex items-center gap-10">
                    <NotificationBell></NotificationBell>
                    <UserCircle size={30} className="text-blue-600 cursor-pointer" />
                </div>
            </div>
    )
}