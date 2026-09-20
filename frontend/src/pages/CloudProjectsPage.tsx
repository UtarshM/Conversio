import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Database,
  Terminal,
  KeyRound,
  Plus,
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Globe,
  Layers,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Code2
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface CloudProject {
  id: string;
  name: string;
  region: string;
  environment: "Production" | "Staging" | "Development";
  dbStatus: "Healthy" | "Maintenance" | "Provisioning";
  dbSize: string;
  apiRequests: string;
  functionsRun: string;
  aiEnabled: boolean;
  createdAt: string;
}

const mockProjects: CloudProject[] = [
  {
    id: "proj-prod-01",
    name: "conversio-core-production",
    region: "Mumbai (ap-south-1)",
    environment: "Production",
    dbStatus: "Healthy",
    dbSize: "4.2 GB / 20 GB",
    apiRequests: "1.4M / mo",
    functionsRun: "420K",
    aiEnabled: true,
    createdAt: "2026-01-15",
  },
  {
    id: "proj-staging-02",
    name: "conversio-ai-vector-store",
    region: "Singapore (ap-southeast-1)",
    environment: "Staging",
    dbStatus: "Healthy",
    dbSize: "1.8 GB / 10 GB",
    apiRequests: "320K / mo",
    functionsRun: "180K",
    aiEnabled: true,
    createdAt: "2026-02-01",
  },
  {
    id: "proj-dev-03",
    name: "mobile-app-backend-dev",
    region: "Frankfurt (eu-central-1)",
    environment: "Development",
    dbStatus: "Healthy",
    dbSize: "450 MB / 5 GB",
    apiRequests: "45K / mo",
    functionsRun: "12K",
    aiEnabled: false,
    createdAt: "2026-03-10",
  },
];

export default function CloudProjectsPage() {
  const [projects, setProjects] = useState<CloudProject[]>(mockProjects);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newRegion, setNewRegion] = useState("Mumbai (ap-south-1)");
  const [newEnv, setNewEnv] = useState<"Production" | "Staging" | "Development">("Development");
  const [aiEnabled, setAiEnabled] = useState(true);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const created: CloudProject = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      name: newProjName.toLowerCase().replace(/\s+/g, "-"),
      region: newRegion,
      environment: newEnv,
      dbStatus: "Healthy",
      dbSize: "10 MB / 5 GB",
      apiRequests: "0 / mo",
      functionsRun: "0",
      aiEnabled,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjects([created, ...projects]);
    setNewProjName("");
    setIsCreateOpen(false);
    toast({
      title: "Project Provisioned",
      description: `Conversio Cloud backend "${created.name}" is now live with PostgreSQL, Auth, and APIs.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Conversio Cloud BaaS Engine
            </div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Developer Projects &amp; Infrastructure</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Instant PostgreSQL, Auto REST/GraphQL APIs, Auth, Object Storage, Realtime WebSockets, and Edge Functions for your applications.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/25 px-5 py-6 rounded-2xl"
            >
              <Plus className="w-4 h-4 mr-2" /> New Cloud Project
            </Button>
          </div>
        </div>

        {/* Global Infrastructure Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>ACTIVE PROJECTS</span>
              <Server className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{projects.length}</p>
            <span className="text-[11px] text-emerald-600 font-medium">100% Uptime across all regions</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>TOTAL POSTGRES STORAGE</span>
              <HardDrive className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">6.45 GB</p>
            <span className="text-[11px] text-slate-500 font-medium">Auto-scaling enabled</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>API REQUESTS (THIS MONTH)</span>
              <Activity className="w-4 h-4 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">1.76M</p>
            <span className="text-[11px] text-emerald-600 font-medium">Avg Latency: 18ms</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>AI VECTOR EMBEDDINGS</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">842,100</p>
            <span className="text-[11px] text-amber-600 font-medium">pgvector Index Active</span>
          </div>
        </div>

        {/* Create Project Modal */}
        {isCreateOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" /> Provision Conversio Cloud Project
                </h3>
                <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PROJECT NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. mobile-app-backend"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">REGION</label>
                    <select
                      value={newRegion}
                      onChange={(e) => setNewRegion(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Mumbai (ap-south-1)">Mumbai (ap-south-1)</option>
                      <option value="Singapore (ap-southeast-1)">Singapore (ap-southeast-1)</option>
                      <option value="Dubai (me-central-1)">Dubai (me-central-1)</option>
                      <option value="Frankfurt (eu-central-1)">Frankfurt (eu-central-1)</option>
                      <option value="Virginia (us-east-1)">Virginia (us-east-1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ENVIRONMENT</label>
                    <select
                      value={newEnv}
                      onChange={(e) => setNewEnv(e.target.value as any)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Development">Development</option>
                      <option value="Staging">Staging</option>
                      <option value="Production">Production</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800">Enable AI Gateway &amp; pgvector</p>
                    <p className="text-[11px] text-slate-500">Vector search and LLM Model Router pre-configured</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiEnabled}
                    onChange={(e) => setAiEnabled(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 rounded"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                    Provision Project
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" /> Active Developer Projects
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900 font-mono">{proj.name}</h3>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      {proj.dbStatus}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {proj.environment}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-slate-400" /> {proj.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-slate-400" /> DB: {proj.dbSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-slate-400" /> API: {proj.apiRequests}
                    </span>
                    {proj.aiEnabled && (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <Zap className="w-3.5 h-3.5" /> AI Vector Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link to="/cloud/database">
                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50">
                      <Database className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> DB Studio
                    </Button>
                  </Link>
                  <Link to="/cloud/api-explorer">
                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50">
                      <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> API Explorer
                    </Button>
                  </Link>
                  <Link to="/cloud/database?tab=sql">
                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50">
                      <Terminal className="w-3.5 h-3.5 mr-1.5 text-violet-600" /> SQL Console
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "API Credentials Copied",
                        description: `Database URL & Anon Public Key for ${proj.name} copied to clipboard.`,
                      });
                    }}
                    className="rounded-xl hover:bg-slate-100"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
