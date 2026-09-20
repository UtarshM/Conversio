import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Wallet,
  Users,
  FileText,
  Link2,
  Settings,
  LogOut,
  Receipt,
  Inbox,
  Megaphone,
  Bot,
  BarChart3,
  UsersRound,
  UserCog,
  Palette,
  Database,
  Terminal,
  Code2,
  ShieldAlert,
  Sparkles,
  Handshake,
  BadgeCheck,
  PhoneCall,
  Search,
  ChevronRight,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/context/AppContext";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const collapsed = sidebarState === "collapsed";
  const navigate = useNavigate();
  const { signOut, user, branding } = useAppContext();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const role = user?.role || "USER";

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-[#1a2228] bg-[#0c1014] text-gray-300">
        <SidebarHeader className="p-3 bg-[#0c1014]">
          {/* Brand Header */}
          <div className="flex items-center justify-between gap-2 px-1 py-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/20">
                {branding?.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="h-5 w-5 object-contain" />
                ) : (
                  <span className="text-white font-black text-sm tracking-tighter">RS</span>
                )}
              </div>
              {!collapsed && (
                <div className="truncate">
                  <h1 className="font-sans text-sm font-bold text-white leading-tight truncate">
                    {branding?.brandName || "Conversio"}
                  </h1>
                  <p className="text-[10px] text-gray-400 font-medium">Autonomous Revenue OS</p>
                </div>
              )}
            </div>
          </div>

          {/* Find a page... Ctrl K Search (Benchmarked from RapidSales) */}
          {!collapsed && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full h-8 px-2.5 rounded-lg bg-[#141b21] hover:bg-[#1a242c] border border-white/5 text-xs text-gray-400 hover:text-gray-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Find a page...</span>
                </span>
                <kbd className="font-mono text-[9px] px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                  Ctrl K
                </kbd>
              </button>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="bg-[#0c1014] px-2 scrollbar-thin">
          {/* Primary: Dashboard */}
          <SidebarGroup className="p-0 pt-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard"
                    end
                    className="h-9 px-3 rounded-lg text-gray-300 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between font-medium text-xs"
                    activeClassName="bg-[#ea580c]/15 text-[#f97316] font-bold border-l-2 border-[#ea580c]"
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>Dashboard</span>}
                    </div>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Group 1: AUDIENCE */}
          <SidebarGroup className="p-0 pt-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider h-6">
                Audience
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/contacts"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Contacts</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/campaigns"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Megaphone className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Campaigns</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Group 2: CHANNELS */}
          <SidebarGroup className="p-0 pt-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider h-6">
                Channels
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/ecommerce-recovery"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>AI Calling</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/inbox"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>WhatsApp</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/automations"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bot className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Email</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Group 3: LEADS */}
          <SidebarGroup className="p-0 pt-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider h-6">
                Leads
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/leads"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        {!collapsed && <span>Qualified Leads</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/contacts"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Inbox className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Platform Leads</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Group 4: REPORTS */}
          <SidebarGroup className="p-0 pt-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider h-6">
                Reports
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/analytics"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Automation Reports</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/analytics"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center justify-between text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                        {!collapsed && <span>Analytics</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-3 w-3 text-gray-600" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Operations & Settings Group */}
          <SidebarGroup className="p-0 pt-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider h-6">
                Operations
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/templates"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center gap-2.5 text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      {!collapsed && <span>Templates</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/wallet"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center gap-2.5 text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <Wallet className="h-3.5 w-3.5 shrink-0" />
                      {!collapsed && <span>Wallet &amp; Billing</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/settings"
                      end
                      className="h-8 px-3 rounded-lg text-gray-400 hover:bg-[#141b21] hover:text-white transition-all flex items-center gap-2.5 text-xs"
                      activeClassName="bg-[#141b21] text-white font-semibold"
                    >
                      <Settings className="h-3.5 w-3.5 shrink-0" />
                      {!collapsed && <span>Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer: RapidSales User Profile Card */}
        <SidebarFooter className="p-2 bg-[#0c1014] border-t border-[#1a2228]">
          <div className="p-2 rounded-xl bg-[#141b21] border border-white/5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#b91c1c] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                #
              </div>
              {!collapsed && (
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.name || "Harvey Specter"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">
                    {user?.email || "support@hashtechy.com"}
                  </p>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  navigate("/login");
                }}
                title="Logout"
                className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
