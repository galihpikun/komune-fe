"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "../ui/button";
import Link from "next/link";

interface Forum {
  id: number;
  name: string;
  icon_image: string;
  total_members: number;
}

export default function TrendingForums() {
  const [forums, setForums] = useState<Forum[]>([]);

  useEffect(() => {
    async function fetchForums() {
      try {
        const response = await fetch(`${API_URL}/api/forums/trending`, {
           cache: "no-store",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        setForums(result.data || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchForums();
  }, []);

  return (
    <div className="flex flex-col gap-5 text-gray-200">
      <Card className="rounded-3xl border-none shadow-sm bg-[#1E293B]">
      <CardHeader>
        <CardTitle className="text-xl text-gray-200">Trending Forums</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {forums.map((forum) => (
          <div
            key={forum.id}
            className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={`${API_URL}/uploads/forums/${forum.icon_image}`}
                alt={forum.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />

              <div className="min-w-0">
                <h1 className="font-semibold text-gray-200 truncate">{forum.name}</h1>

                <p className="text-sm text-gray-300">
                  {forum.total_members} members
                </p>
              </div>
            </div>

            <Button size="sm">
              Join
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
    <Card className="p-5 rounded-2xl bg-linear-to-t from-sky-700 to-indigo-700 text-white">
      <CardTitle>Find a Community or Join into an already made one.</CardTitle>
      <CardContent className="flex justify-around gap-5">
        <Button className="bg-white text-blue-500 hover:scale-105 transition-all duration-200 hover:bg-blue-300 hover:text-blue-800">Create one</Button>
        <Link href="" className="border-white border-3 rounded-lg px-2 py-1 hover:scale-105 transition-all duration-200 hover:bg-white hover:text-blue-500">Find one</Link>
      </CardContent>
    </Card>
    </div>
  );
}
