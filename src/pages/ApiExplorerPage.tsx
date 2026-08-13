import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Key,
  Copy,
  Check,
  Send,
  Globe,
  Lock,
  Layers,
  Terminal,
  Play
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ApiEndpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  desc: string;
  table: string;
}

const mockEndpoints: ApiEndpoint[] = [
  { method: "GET", path: "/rest/v1/contacts", desc: "List contacts with pagination & filter operators", table: "contacts" },
  { method: "POST", path: "/rest/v1/contacts", desc: "Insert one or more contacts", table: "contacts" },
  { method: "GET", path: "/rest/v1/conversations", desc: "Query conversation timelines", table: "conversations" },
  { method: "POST", path: "/rest/v1/orders", desc: "Create e-commerce order entry", table: "orders" },
  { method: "POST", path: "/graphql", desc: "Execute unified GraphQL queries & mutations", table: "all" },
];

export default function ApiExplorerPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(mockEndpoints[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast({ title: "Copied to Clipboard", description: `${label} has been copied.` });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestApi = () => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      setTestResponse(JSON.stringify({
        status: 200,
        ok: true,
        data: [
          { id: "c-1001", phone: "+919876543210", name: "Rahul Sharma", workspace_id: "ws-alpha" },
          { id: "c-1002", phone: "+919812345678", name: "Priya Patel", workspace_id: "ws-alpha" }
        ],
        meta: { total: 2, page: 1, limit: 10 }
      }, null, 2));
    }, 300);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Code2 className="w-3.5 h-3.5" /> Auto-Generated Data APIs
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900 mt-2">API Explorer &amp; Key Gateway</h1>
            <p className="text-slate-500 text-xs mt-1">
              Every database table in your project automatically exposes REST and GraphQL APIs protected by API Keys &amp; RLS policies.
            </p>
          </div>
        </div>

        {/* API Credentials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Anon Key */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Public Anon API Key</h3>
                  <p className="text-[11px] text-slate-400">Safe for client-side React/Mobile apps. Enforces RLS.</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-none">CLIENT SAFE</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/60 font-mono text-xs text-slate-700">
              <span className="truncate max-w-[280px]">cv_anon_key_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard("cv_anon_key_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "Anon Key")}
                className="h-7 text-xs"
              >
                {copiedKey === "Anon Key" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          {/* Service Role Secret Key */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Service Role Secret Key</h3>
                  <p className="text-[11px] text-slate-400">Server-side only. Bypasses Row Level Security (RLS).</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-none">SECRET</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/60 font-mono text-xs text-slate-700">
              <span className="truncate max-w-[280px]">cv_service_key_secret_894102941094109...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard("cv_service_key_secret_894102941094109...", "Service Key")}
                className="h-7 text-xs"
              >
                {copiedKey === "Service Key" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive API Tester */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Endpoints Sidebar */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Auto-Generated Endpoints</span>
            <div className="space-y-2">
              {mockEndpoints.map((ep) => (
                <button
                  key={ep.path + ep.method}
                  onClick={() => { setSelectedEndpoint(ep); setTestResponse(null); }}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all ${
                    selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                      ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={ep.method === "GET" ? "bg-blue-100 text-blue-800 border-none text-[10px]" : "bg-emerald-100 text-emerald-800 border-none text-[10px]"}>
                      {ep.method}
                    </Badge>
                    <span className="font-bold text-slate-800 font-mono">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{ep.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tester Canvas */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Badge className="bg-blue-100 text-blue-800 border-none">{selectedEndpoint.method}</Badge>
                  <span className="font-bold text-slate-900">https://api.conversio.cloud/v1{selectedEndpoint.path}</span>
                </div>
                <Button
                  onClick={handleTestApi}
                  disabled={isRequesting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Send Request
                </Button>
              </div>

              <p className="text-xs text-slate-500">{selectedEndpoint.desc}</p>

              {/* Request Headers Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 font-mono text-xs space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Request Headers:</div>
                <div className="text-slate-700">apikey: cv_anon_key_eyJhbGciOi...</div>
                <div className="text-slate-700">Authorization: Bearer cv_anon_key_eyJhbGciOi...</div>
                <div className="text-slate-700">Content-Type: application/json</div>
              </div>
            </div>

            {/* Response Canvas */}
            {testResponse && (
              <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                  <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
                  <span>Content-Type: application/json</span>
                </div>
                <pre className="text-emerald-400 font-mono text-xs overflow-x-auto p-2">
                  {testResponse}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
