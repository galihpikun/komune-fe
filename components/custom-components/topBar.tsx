import SearchBar from "./SearchBar";
import { Bell, UserCircle } from "lucide-react";

export default function TopBar () {
    return (
        <div className="flex p-6 w-full h-25 bg-white shadow-sm justify-between px-8">
                <SearchBar />
                <div className="flex items-center gap-4">
                    <Bell size={30} className="text-blue-600 mr-4 cursor-pointer" />
                    <UserCircle size={30} className="text-blue-600 cursor-pointer" />
                </div>
            </div>
    )
}