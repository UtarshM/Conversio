import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";
import {
  Wallet,
  Bell,
  Plus,
  Cpu,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SetupGuideModal } from "@/components/SetupGuideModal";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, walletBalance } = useAppContext();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f8fafc] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative">
          {/* TOP DASHBOARD HEADER (Exact RapidSales Match) */}
          <header className="h-14 flex items-center justify-between border-b border-gray-200/80 px-4 sm:px-6 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] gap-4">
            {/* Left: Sidebar toggle */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-1.5 transition-colors" />
            </div>

            {/* Right: Credits, AI Usage, Notifications & Profile */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Credits Pill (RapidSales benchmark) */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">Credits</span>
                <span className="font-mono font-bold text-gray-900">
                  {walletBalance ? Number(walletBalance).toFixed(1) : "82,557.7"}
                </span>
                <Link
                  to="/wallet"
                  title="Top Up Credits"
                  className="w-4 h-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-transform hover:scale-105 ml-0.5"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                </Link>
              </div>

              {/* AI Usage Limits Pill */}
              <Link
                to="/settings"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50/80 border border-purple-200/80 text-purple-700 text-xs font-medium hover:bg-purple-100 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-[10px] uppercase font-bold text-purple-500">AI Usage</span>
                <span className="font-semibold text-purple-900">Limits</span>
              </Link>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-600 flex items-center justify-center transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center font-mono">
                    10
                  </span>
                </button>
              </div>

              {/* User Avatar & Name */}
              <div className="flex items-center gap-2 pl-1 border-l border-gray-200 cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-[#b91c1c] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  #
                </div>
                <span className="hidden md:inline text-xs font-semibold text-gray-800">
                  {user?.name || "Harvey Specter"}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden md:inline" />
              </div>
            </div>
          </header>

          {/* Main Workspace Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-[#f8fafc]">
            {children}
          </main>

          {/* Floating Setup Guide Playbook Button & Drawer */}
          <SetupGuideModal />
        </div>
      </div>
    </SidebarProvider>
  );
}
