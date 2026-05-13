import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-700 px-4 py-3 rounded-2xl w-1/2">
      <Search size={18} className="text-gray-300" />

      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-gray-300 text-sm"
      />
    </div>
  );
}