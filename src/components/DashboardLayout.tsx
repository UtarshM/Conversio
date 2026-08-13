import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, walletBalance, whatsApp } = useAppContext();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="mr-2" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user ? `Welcome back, ${user.name}` : "Conversio Workspace"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {whatsApp.connected ? `${whatsApp.displayPhoneNumber} connected` : "Connect WhatsApp to start messaging"}
                </p>
              </div>

              {/* Portal Mode Switcher */}
              <div className="hidden md:flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border text-xs font-semibold">
                <a href="/dashboard" className="px-2.5 py-1 rounded-lg bg-background shadow-xs text-foreground font-bold">
                  Business OS
                </a>
                <a href="/cloud/projects" className="px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground">
                  Conversio Cloud (BaaS)
                </a>
                <a href="/partners/dashboard" className="px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground">
                  Partner OS
                </a>
              </div>
            </div>
            <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground">
              Wallet: Rs {walletBalance.toLocaleString()}
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto gradient-subtle">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
