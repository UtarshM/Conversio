import { Link } from "react-router-dom";
import { Shield, CheckCircle2 } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-slate-50 text-slate-900 border-t border-slate-200/90 font-sans">
      <div className="container mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-left">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img src="/home/logo.jpg" alt="Conversio AI" className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-xs" />
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-slate-900">Conversio AI</span>
                <p className="text-[11px] text-emerald-600 font-mono font-bold">AI Revenue Operating System</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Conversio helps D2C brands &amp; enterprises capture, qualify, sell, and retain customers across WhatsApp, Instagram, SMS, Voice, and Developer Cloud APIs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs bg-emerald-100/80 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Meta Business Partner
              </span>
              <span className="text-xs bg-slate-200/70 border border-slate-300 text-slate-800 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> ISO 27001 &amp; GDPR
              </span>
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">Product Modules</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><Link to="/home#features" className="hover:text-emerald-600 transition-colors">Abandoned Cart Recovery</Link></li>
              <li><Link to="/home#features" className="hover:text-emerald-600 transition-colors">COD to Prepaid Verification</Link></li>
              <li><Link to="/home#features" className="hover:text-emerald-600 transition-colors">Omnichannel Shared Inbox</Link></li>
              <li><Link to="/home#features" className="hover:text-emerald-600 transition-colors">WhatsApp Order Alerts</Link></li>
              <li><Link to="/playground" className="hover:text-emerald-600 transition-colors">AI Voice Telephony</Link></li>
              <li><Link to="/omnichannel" className="hover:text-emerald-600 transition-colors">Conversio Pass Identity</Link></li>
            </ul>
          </div>

          {/* Conversio Cloud BaaS */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">Conversio Cloud</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><Link to="/cloud/projects" className="hover:text-emerald-600 transition-colors">Postgres Projects</Link></li>
              <li><Link to="/cloud/database" className="hover:text-emerald-600 transition-colors">Database Studio &amp; SQL</Link></li>
              <li><Link to="/cloud/api-explorer" className="hover:text-emerald-600 transition-colors">Auto REST &amp; GraphQL APIs</Link></li>
              <li><Link to="/cloud/ai-vector" className="hover:text-emerald-600 transition-colors">pgvector &amp; LLM Gateway</Link></li>
              <li><Link to="/cloud/api-explorer" className="hover:text-emerald-600 transition-colors">API Keys Gateway</Link></li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><Link to="/blog" className="hover:text-emerald-600 transition-colors">Blog &amp; Playbooks</Link></li>
              <li><Link to="/partner" className="hover:text-emerald-600 transition-colors">Partner Program</Link></li>
              <li><Link to="/playground" className="hover:text-emerald-600 transition-colors">Live Sandbox</Link></li>
              <li><a href="mailto:support@conversio.ai" className="hover:text-emerald-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Conversio Technologies Private Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security Overview</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
