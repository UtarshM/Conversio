import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePartnerAuth } from "../context/PartnerAuthContext";
import {
  Sparkles,
  LayoutDashboard,
  Globe,
  Building2,
  Receipt,
  LogOut,
  ExternalLink,
  Award,
  Wallet,
} from "lucide-react";

export const PartnerNavbar: React.FC = () => {
  const { partner } = usePartnerAuth();
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Partner Tag */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">CONVERSIO</span>
              <span className="ml-1.5 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Partner OS
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                isCurrent("/dashboard")
                  ? "bg-slate-800 text-emerald-400 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Overview
            </Link>

            <Link
              to="/white-label"
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                isCurrent("/white-label")
                  ? "bg-slate-800 text-emerald-400 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> White-Label & Domain
            </Link>

            <Link
              to="/workspaces"
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                isCurrent("/workspaces")
                  ? "bg-slate-800 text-emerald-400 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Client Accounts
            </Link>

            <Link
              to="/commissions"
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                isCurrent("/commissions")
                  ? "bg-slate-800 text-emerald-400 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Receipt className="w-3.5 h-3.5" /> Commissions Ledger
            </Link>
          </nav>
        </div>

        {/* Right Info: Tier, Balance & External Link */}
        <div className="flex items-center gap-3">
          {partner && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Wallet className="w-3 h-3 text-emerald-400" /> Balance:
              </span>
              <strong className="text-emerald-400 font-bold">
                ₹{(partner.unpaidBalance || 0).toLocaleString()}
              </strong>
            </div>
          )}

          <Link
            to="/"
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            Landing Page <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
};
