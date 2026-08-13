import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

const clientLogos = [
  { name: "L&T", src: "/clients/L&T.jpg" },
  { name: "Indian Oil", src: "/clients/Indian_Oil_Logo.svg.png" },
  { name: "GMM Pfaudler", src: "/clients/GMM Pfaudler.png" },
  { name: "ACG Pharma", src: "/clients/ACG Pharma.png" },
  { name: "Cybernetik", src: "/clients/Cybernetik.png" },
  { name: "Indo MIM", src: "/clients/Indo MIM.jfif" },
  { name: "Vulkan", src: "/clients/Vulkan.png" },
  { name: "Gansons", src: "/clients/Gansons.jpg" },
  { name: "Surya", src: "/clients/Surya.png" },
  { name: "Standard Glass", src: "/clients/Standard glass.png" },
  { name: "Metal Forms", src: "/clients/Metal forms.png" },
  { name: "Bioaspire", src: "/clients/Bioaspire.png" },
];

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800 text-left pt-16 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* TRUSTED CLIENT LOGOS BANNER */}
        <div className="mb-14 pb-12 border-b border-slate-800/80">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              TRUSTED BY 700+ ENTERPRISE &amp; D2C BRANDS
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="h-10 px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-center hover:border-emerald-500/50 transition-all group"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-6 max-w-[100px] object-contain filter grayscale group-hover:grayscale-0 transition-all brightness-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* COLUMN 1: Brand, Official Meta Partner Badge, Parent Company */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Brand Logo & Tagline */}
            <div className="space-y-3">
              <Link to="/" className="flex items-center gap-2.5">
                <img src="/home/logo.jpg" alt="Conversio AI" className="h-10 w-10 rounded-xl object-cover border border-slate-700 shadow-md" />
                <span className="font-display text-2xl font-bold tracking-tight text-white">Conversio</span>
              </Link>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Enhance customer interactions, boost sales, and automate conversations with our AI-driven WhatsApp Business solutions.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> A Product Unit of <strong>Scalezix Ventures LLP</strong>
              </div>
            </div>

            {/* G2 High Performer Badges & Security Seals */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-md font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" /> High Performer 2026
                </span>
                <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-md font-bold">
                  Asia Leader
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md font-bold">
                  D2C Top Rated
                </span>
                <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-md font-bold">
                  India #1 ROI
                </span>
              </div>

              {/* Compliance ISO */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold text-[11px]">ISO 27001</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold text-[11px]">AICPA SOC</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200">
                  <span className="font-semibold text-[11px] text-emerald-400">GDPR Compliant</span>
                </div>
              </div>

              {/* OFFICIAL META BUSINESS PARTNER LOGO BADGE */}
              <div className="p-2.5 bg-slate-900/90 border border-blue-500/40 rounded-2xl flex items-center gap-4 max-w-sm shadow-md hover:border-blue-400 transition-colors">
                <img
                  src="/home/meta-badge-dark.png"
                  alt="Meta Business Partner"
                  className="h-11 w-auto object-contain"
                />
                <div className="border-l border-slate-800 pl-3">
                  <span className="text-[11px] font-bold text-slate-200 block">Official Tech Partner</span>
                  <span className="text-[10px] text-emerald-400 font-mono block">WhatsApp Cloud API</span>
                </div>
              </div>
            </div>

            {/* Ask AI about Conversio Bar */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                Ask AI <Sparkles className="w-3 h-3 text-amber-400" /> about Conversio:
              </span>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-emerald-400">🤖</span>
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-purple-400">✨</span>
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-blue-400">🌐</span>
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-amber-400">⚡</span>
              </div>
            </div>

          </div>

          {/* COLUMN 2: Quick Links & Resources */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono border-b border-emerald-500/30 pb-1 inline-block">Quick links</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono border-b border-emerald-500/30 pb-1 inline-block">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/blog" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* COLUMN 3: Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono border-b border-emerald-500/30 pb-1 inline-block">Features</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link to="/home#features" className="hover:text-white transition-colors">Abandoned Cart recovery</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">COD Orders to Prepaid</Link></li>
              <li><Link to="/playground" className="hover:text-white transition-colors">Customer Service &amp; Support</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">WhatsApp Order Alerts</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">New Product Launch</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">Repeat Orders</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">WhatsApp for Upselling</Link></li>
              <li><Link to="/home#features" className="hover:text-white transition-colors">WhatsApp Broadcast</Link></li>
              <li><Link to="/playground" className="hover:text-white transition-colors">WhatsApp Chatbot</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: Support & Compare */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono border-b border-emerald-500/30 pb-1 inline-block">Support</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/playground" className="hover:text-white transition-colors">Support Chatbot</Link></li>
                <li><Link to="/omnichannel" className="hover:text-white transition-colors">OmniChannel CRM</Link></li>
                <li><Link to="/playground" className="hover:text-white transition-colors">Support Analytics</Link></li>
                <li><Link to="/partner" className="hover:text-white transition-colors">Retail Channel Partner Support</Link></li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono border-b border-emerald-500/30 pb-1 inline-block">Compare</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/contact" className="hover:text-white transition-colors">Conversio vs Interakt</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Conversio vs AI Sensy</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Conversio vs Wati</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Conversio vs LimeChat</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex flex-wrap gap-6">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy &amp; Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Refund &amp; Cancellation Policy</Link>
          </div>
          <p>© 2026 Scalezix Ventures LLP. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
