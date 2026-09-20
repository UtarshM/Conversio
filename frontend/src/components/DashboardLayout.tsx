import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";
import { Wallet, Sparkles, Building2, Layers, CheckCircle2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, walletBalance, whatsApp } = useAppContext();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white text-slate-900 font-sans">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
          
          {/* TOP DASHBOARD HEADER */}
          <header className="h-16 flex items-center justify-between border-b border-slate-200/80 px-6 bg-white shadow-xs">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="mr-1 text-slate-700 hover:text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                  {user ? `Welcome back, ${user.name}` : "Conversio Merchant Workspace"}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {whatsApp?.connected ? `WhatsApp Business Connected (${whatsApp.displayPhoneNumber || "+91 98765 43210"})` : "Meta Cloud API Active"}
                </p>
              </div>
            </div>

            {/* Wallet Credit Badge */}
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-2xs">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Wallet Balance: <strong className="font-mono text-emerald-700">₹{walletBalance.toLocaleString()}</strong></span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 overflow-auto bg-slate-50/60">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
