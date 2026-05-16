"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import {
  Loader,
  UserPlus,
  Users as UsersIcon,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { columns } from "@/components/custom-components/admin-page/users-moderation/columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CreateUser from "./modalCreateUser";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/get-users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => console.log("Delete", id);
  const changeRole = async (id: number) => console.log("Change Role", id);

  const table = useReactTable({
    data: users,
    columns: columns(deleteUser, changeRole),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState:{
      pagination:{
        pageSize:5
      }
    }
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-20 text-blue-500 gap-4">
        <Loader className="animate-spin" size={40} />
        <p className="animate-pulse font-medium">Fetching secure data...</p>
      </div>
    );

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={UsersIcon}
          color="text-blue-400"
        />
        <StatsCard
          title="Admins"
          value={users.filter((u) => u.role !== "user").length}
          icon={UserCheck}
          color="text-violet-400"
        />
        <StatsCard
          title="Super Admins"
          value={users.filter((u) => u.role === "super_admin").length}
          icon={ShieldAlert}
          color="text-emerald-400"
        />
      </div>

      <div className="bg-[#1E293B] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#2B4161]/20">
          <div>
            <h2 className="text-xl font-bold text-white">User Directory</h2>
            <p className="text-sm text-slate-400">
              Manage and moderate your community members
            </p>
          </div>
          <CreateUser></CreateUser>
        </div>

        <div className="p-4">
          <Table>
            <TableHeader className="hover:bg-transparent">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-slate-800 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-slate-800 hover:bg-[#2B4161]/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-slate-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-slate-800 flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex items-center gap-5">
      <div className={`p-4 rounded-2xl bg-[#0C1222] ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
          {title}
        </p>
        <p className="text-2xl font-black text-white leading-none mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}
