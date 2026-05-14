import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, FileWarning, Trash } from "lucide-react"

export function DropdownReport({postId}:any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger  asChild>
        <Button variant="ghost" className="text-gray-200 hover:text-gray-600 hover:bg-[]"><MoreHorizontal size={20} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="left" className="bg-slate-900 text-white border border-slate-700">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Post Options</DropdownMenuLabel>
          <DropdownMenuItem className="hover:bg-slate-600"><Pencil></Pencil>Update</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-slate-600"><FileWarning></FileWarning>Report</DropdownMenuItem>
          <DropdownMenuItem variant="destructive"><Trash></Trash>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
