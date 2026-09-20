import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OutreachAnalyticsCard } from "@/components/dashboard/OutreachAnalyticsCard";
import {
  Megaphone,
  Users,
  MessageSquare,
  Bot,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        {/* Exact RapidSales Benchmark: Outreach Analytics, KPIs & Daily Spend */}
        <OutreachAnalyticsCard />

        {/* Quick Launchpad Cards matching clean enterprise look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Link
            to="/campaigns"
            className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-all group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#ea580c] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Megaphone className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">New Campaign</p>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">Anti-ban jitter &amp; batching</p>
            </div>
          </Link>

          <Link
            to="/contacts"
            className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-all group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">Audience Hub</p>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">Segments &amp; Customer 360</p>
            </div>
          </Link>

          <Link
            to="/inbox"
            className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-all group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">Unified Inbox</p>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">Live chats &amp; AI autopilot</p>
            </div>
          </Link>

          <Link
            to="/ecommerce-recovery"
            className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-all group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">AI Calling</p>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">Automated cart &amp; COD voice</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
