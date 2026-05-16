"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { 
  Users, FileText, AlertTriangle, CheckCircle, 
  TrendingUp, ArrowUpRight, Loader2 
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Dashboard error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // 1. GUARD CLAUSE: Mencegah 'Cannot read properties of null'
  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-blue-500 gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="animate-pulse font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Overview</h1>
        <p className="text-slate-400 font-medium">Manage and monitor your community performance.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Users" 
          value={data.stats.total_users} 
          icon={Users} 
          color="text-blue-400" 
        />
        <StatsCard 
          title="Total Posts" 
          value={data.stats.total_posts} 
          icon={FileText} 
          color="text-violet-400" 
        />
        <StatsCard 
          title="Pending Reports" 
          value={data.stats.pending_reports} 
          icon={AlertTriangle} 
          color="text-red-400" 
        />
        <StatsCard 
          title="Active Tasks" 
          value={data.stats.active_tasks} 
          icon={CheckCircle} 
          color="text-emerald-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART SECTION */}
        <Card className="lg:col-span-2 bg-[#1E293B] border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 bg-[#2B4161]/10 px-8 py-6">
            <CardTitle className="text-white text-lg font-bold">Post Activity (Last 7 Days)</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp size={20} className="text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-8 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: '1px solid #1e293b', 
                    borderRadius: '12px',
                    color: '#fff' 
                  }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card className="bg-[#1E293B] border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-800/50 bg-[#2B4161]/10 px-8 py-6">
            <CardTitle className="text-white text-lg font-bold">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {data.recentPosts.length > 0 ? (
              data.recentPosts.map((post: any) => (
                <div key={post.id} className="flex items-center justify-between group animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex flex-col max-w-[60%]">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1">
                      {post.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">by @{post.username}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={post.status}>{post.status}</Badge>
                    <span className="text-[9px] text-slate-600 font-medium">
                      {new Date(post.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-10 text-sm italic">No recent activity found.</p>
            )}
            
            <Button variant="ghost" className="w-full mt-4 border border-slate-800 text-slate-400 text-xs hover:text-white hover:bg-slate-800 rounded-xl transition-all">
              View All Content <ArrowUpRight size={14} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between shadow-xl hover:border-slate-600 transition-all group">
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
        <p className="text-3xl font-black text-white leading-none tracking-tight">{value}</p>
      </div>
      <div className={`p-4 rounded-2xl bg-[#0C1222] ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
    </div>
  );
}

function Badge({ children, variant }: any) {
  const styles = variant === 'approved' 
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
    : variant === 'pending' 
    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    : "bg-red-500/10 text-red-400 border-red-500/20";
    
  return (
    <span className={`${styles} px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border shadow-sm`}>
      {children}
    </span>
  );
}