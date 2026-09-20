import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";
import {
  Wallet,
  Search,
  Bell,
  Sparkles,
  Plus,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SetupGuideModal } from "@/components/SetupGuideModal";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, walletBalance, whatsApp } = useAppContext();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#04080a] text-white font-sans selection:bg-emerald-500 selection:text-black">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#04080a] relative">
          {/* TOP DASHBOARD HEADER (Benchmarked from RapidSales) */}
          <header className="h-16 flex items-center justify-between border-b border-white/10 px-4 sm:px-6 bg-[#070e12] shadow-sm backdrop-blur-xl gap-4">
            {/* Left: Sidebar toggle & Store Status */}
            <div className="flex items-center gap-3 min-w-0">
              <SidebarTrigger className="mr-1 text-gray-400 hover:text-emerald-400 shrink-0" />
              <div className="hidden md:block">
                <p className="text-sm font-bold text-white font-display flex items-center gap-2 truncate">
                  {user ? `${user.name} • Workspace` : "The Bombay Botanics • Founder OS"}
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </p>
                <p className="text-[11px] text-gray-400 font-mono truncate">
                  Shopify Store Live Sync Active
                </p>
              </div>
            </div>

            {/* Center: Search input button (Ctrl K) */}
            <div className="flex-1 max-w-xs lg:max-w-sm">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full h-9 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-gray-400 hover:text-gray-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">Find a page, deal, contact...</span>
                </span>
                <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Right: Credits, AI Usage, Notifications & Profile */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Credits Pill (RapidSales benchmark) */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/80">Credits</span>
                <span className="text-white">₹{walletBalance.toLocaleString()}</span>
                <button
                  onClick={() => window.location.href = "/wallet"}
                  title="Top Up Credits"
                  className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-110 transition-transform ml-0.5"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                </button>
              </div>

              {/* AI Usage Limits Pill */}
              <Link
                to="/settings"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium hover:bg-purple-500/20 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Limits</span>
              </Link>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 flex items-center justify-center transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center font-mono">
                    10
                  </span>
                </button>
              </div>

              {/* User Avatar */}
              <div className="flex items-center gap-2 pl-1 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-bold text-xs flex items-center justify-center shadow-md">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span className="hidden xl:inline text-xs font-semibold text-gray-200">
                  {user?.name || "Utkarsh Makwana"}
                </span>
              </div>
            </div>
          </header>

          {/* Main Workspace Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-[#04080a]">
            {children}
          </main>

          {/* Floating Setup Guide Playbook Button & Drawer */}
          <SetupGuideModal />

          {/* Global Command Palette */}
          <CommandPaletteModal
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
