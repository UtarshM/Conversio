import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Radio,
  Bot,
  Send,
  Zap,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";

export function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-4 left-0 right-0 z-[9999] px-4 w-full flex justify-center pointer-events-none">
      <div className="w-full max-w-[1200px] pointer-events-auto relative">
        <div className="bg-white/98 backdrop-blur-xl h-[60px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/90 rounded-2xl flex items-center justify-between px-6 transition-all duration-300">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/home/logo.jpg" alt="Conversio AI" className="h-9 w-9 rounded-xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform" />
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">Conversio</span>
          </Link>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center justify-center gap-7">
            <Link
              to="/home"
              className={`text-sm font-medium transition-colors ${isActive("/home") || isActive("/") ? "text-emerald-600 font-bold" : "text-slate-700 hover:text-emerald-600"}`}
            >
              Home
            </Link>

            <Link
              to="/playground"
              className={`text-sm font-medium transition-colors ${isActive("/playground") || isActive("/sandbox") ? "text-emerald-600 font-bold" : "text-slate-700 hover:text-emerald-600"}`}
            >
              Playground
            </Link>

            {/* Features Dropdown Toggle */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-4 ${
                  featuresOpen ? "text-emerald-600 font-bold" : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                Features <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${featuresOpen ? "rotate-180 text-emerald-600" : ""}`} />
              </button>

              {/* FEATURES MEGA MENU DROPDOWN */}
              {featuresOpen && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[920px] bg-white border border-slate-200 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-6 grid grid-cols-12 gap-6 text-left font-sans animate-in fade-in zoom-in-95 duration-200 z-[10000]">
                  
                  {/* Column 1: Core Toolkit Highlights */}
                  <div className="col-span-4 space-y-2 border-r border-slate-100 pr-4">
                    <Link
                      to="/home#features"
                      className="p-3 rounded-2xl hover:bg-slate-50 flex items-start gap-3 transition-colors group block"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">All features</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Conversio's full toolkit to convert and grow</p>
                      </div>
                    </Link>

                    <Link
                      to="/playground"
                      className="p-3 rounded-2xl hover:bg-slate-50 flex items-start gap-3 transition-colors group block"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">How Conversio Works</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Visualizing the intent-driven shopper flow</p>
                      </div>
                    </Link>

                    <Link
                      to="/omnichannel"
                      className="p-3 rounded-2xl hover:bg-slate-50 flex items-start gap-3 transition-colors group block"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Omnichannel Marketing</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">(Intent based pipeline)</p>
                      </div>
                    </Link>

                    <Link
                      to="/playground"
                      className="p-3 rounded-2xl hover:bg-slate-50 flex items-start gap-3 transition-colors group block"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">AI calling agent &amp; chatbot</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">(Support &amp; sales)</p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Get Your Sales Rolling Funnel */}
                  <div className="col-span-5 space-y-3 border-r border-slate-100 pr-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      GET YOUR SALES ROLLING WITH CONVERSIO
                    </span>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {/* Step 1 */}
                      <Link to="/omnichannel" className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-300 transition-all block">
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">1 Acquire &amp; Convert</span>
                        <h5 className="text-[11px] font-bold text-slate-800">Growth Triggers</h5>
                        <p className="text-[9px] text-slate-500 leading-tight">Grow your audience and convert visitors.</p>
                      </Link>

                      {/* Step 2 */}
                      <Link to="/playground" className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-300 transition-all block">
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">2 Activate &amp; Support</span>
                        <h5 className="text-[11px] font-bold text-slate-800">AI Voice &amp; Chat</h5>
                        <p className="text-[9px] text-slate-500 leading-tight">Engage users with personalized campaigns.</p>
                      </Link>

                      {/* Step 3 */}
                      <Link to="/home#features" className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-300 transition-all block">
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">3 Retain &amp; Grow</span>
                        <h5 className="text-[11px] font-bold text-slate-800">Repeat Orders</h5>
                        <p className="text-[9px] text-slate-500 leading-tight">Build long-term relationships.</p>
                      </Link>
                    </div>

                    <div className="p-3 bg-slate-950 text-white rounded-2xl flex items-center justify-between text-xs font-mono">
                      <span>🚀 Average D2C ROI: +32.4% Recovery</span>
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] h-7 px-3 rounded-lg" onClick={() => navigate("/playground")}>
                        Test Sandbox
                      </Button>
                    </div>
                  </div>

                  {/* Column 3: Features List */}
                  <div className="col-span-3 space-y-3 pl-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">FEATURES</span>
                    
                    <div className="space-y-2 text-xs text-slate-700">
                      <Link to="/home#features" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-semibold transition-colors">
                        <Send className="w-4 h-4 text-emerald-600" /> Campaigns
                      </Link>
                      <Link to="/home#features" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-semibold transition-colors">
                        <Zap className="w-4 h-4 text-blue-600" /> Automations
                      </Link>
                      <Link to="/omnichannel" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-semibold transition-colors">
                        <Target className="w-4 h-4 text-purple-600" /> Segmentation
                      </Link>
                      <Link to="/playground" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-semibold transition-colors">
                        <Sparkles className="w-4 h-4 text-amber-600" /> Popups &amp; Conversio Pass
                      </Link>
                      <Link to="/playground" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-semibold transition-colors">
                        <BarChart3 className="w-4 h-4 text-emerald-600" /> Reports &amp; Analytics
                      </Link>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <a href="/home#pricing" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
              Pricing
            </a>

            <Link
              to="/partner"
              className={`text-sm font-medium transition-colors ${isActive("/partner") ? "text-emerald-600 font-bold" : "text-slate-700 hover:text-emerald-600"}`}
            >
              Partner Program
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-emerald-600 font-bold" : "text-slate-700 hover:text-emerald-600"}`}
            >
              Blog &amp; Resources
            </Link>

            <Link
              to="/cloud/projects"
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1 border border-slate-200"
            >
              ⚡ Cloud BaaS
            </Link>
          </nav>

          {/* Action CTAs: Book a Demo Lead Capture */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/contact")} className="text-slate-700 hover:text-slate-900 font-medium text-xs">
              Contact Us
            </Button>
            <Button className="bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-xs font-semibold px-4 py-2 transition-all shadow-sm" onClick={() => navigate("/contact")}>
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
