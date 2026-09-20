import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";
import { Wallet, Sparkles, ShoppingBag, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, walletBalance, whatsApp } = useAppContext();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#04080a] text-white font-sans selection:bg-emerald-500 selection:text-black">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#04080a]">
          {/* TOP DASHBOARD HEADER */}
          <header className="h-16 flex items-center justify-between border-b border-white/10 px-6 bg-[#070e12] shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="mr-1 text-gray-400 hover:text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white font-display flex items-center gap-2">
                  {user ? `Workspace • ${user.name}` : "The Bombay Botanics • Founder OS"}
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </p>
                <p className="text-[11px] text-gray-400 font-mono">
                  Shopify Live Sync Active • Meta Cloud API Connected
                </p>
              </div>
            </div>

            {/* Right Status Badges */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-gray-300 font-medium transition-colors"
              >
                <span>Live Store View</span>
              </Link>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-inner">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Balance: <strong className="font-mono text-emerald-400">₹{walletBalance.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 overflow-auto bg-[#04080a]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
