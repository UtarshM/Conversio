import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  Users,
  Trello,
  Inbox,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Link2,
  FileText,
  Wallet,
  Settings,
  X,
  ArrowRight,
} from "lucide-react";

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  url: string;
  icon: any;
  shortcut?: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  { id: "p1", title: "Founder Command Center", category: "Platform", url: "/dashboard", icon: LayoutDashboard, shortcut: "G D" },
  { id: "p2", title: "Customer 360 & Timeline", category: "Customer", url: "/contacts", icon: Users, shortcut: "G C" },
  { id: "p3", title: "Sales CRM Deal Pipeline", category: "CRM", url: "/leads", icon: Trello, shortcut: "G L" },
  { id: "p4", title: "Unified Omnichannel Inbox", category: "Inbox", url: "/inbox", icon: Inbox, shortcut: "G I" },
  { id: "p5", title: "AI Revenue Opportunities", category: "Revenue", url: "/ecommerce-recovery", icon: Sparkles, shortcut: "G O" },
  { id: "p6", title: "Customer Journey Automations", category: "Workflows", url: "/automations", icon: Bot, shortcut: "G A" },
  { id: "p7", title: "Broadcast Campaigns & Cadences", category: "Campaigns", url: "/campaigns", icon: MessageSquare, shortcut: "G B" },
  { id: "p8", title: "Revenue Attribution & Analytics", category: "Reports", url: "/analytics", icon: BarChart3, shortcut: "G R" },
  { id: "p9", title: "Connect Channels (WhatsApp, Telephony)", category: "Channels", url: "/connect", icon: Link2 },
  { id: "p10", title: "Message Templates", category: "Assets", url: "/templates", icon: FileText },
  { id: "p11", title: "Wallet Balance & Credits", category: "Billing", url: "/wallet", icon: Wallet },
  { id: "p12", title: "Store Settings & Webhooks", category: "System", url: "/settings", icon: Settings },
];

export function CommandPaletteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or key listener
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = PALETTE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl bg-[#070e12] border border-white/15 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a page, customer, deal, or workflow... (Esc to close)"
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[380px] overflow-y-auto space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No matching pages found for "{query}"
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className="p-3 rounded-2xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] text-gray-300 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <span>Navigate with ↵ or mouse</span>
          <span className="flex items-center gap-1">Conversio Global Command Palette</span>
        </div>
      </div>
    </div>
  );
}
