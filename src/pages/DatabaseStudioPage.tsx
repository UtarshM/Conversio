import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Terminal,
  Table as TableIcon,
  Layers,
  ShieldCheck,
  Plus,
  Play,
  Download,
  Search,
  Check,
  Zap,
  Code2,
  RefreshCw,
  Sparkles,
  GitBranch,
  FolderLock,
  Clock,
  Radio,
  FileCode,
  HardDrive,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router-dom";

interface TableSchema {
  name: string;
  rowCount: number;
  columns: { name: string; type: string; isPrimary?: boolean; isNullable?: boolean }[];
}

const mockTables: TableSchema[] = [
  {
    name: "contacts",
    rowCount: 1420,
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "phone", type: "varchar(20)" },
      { name: "name", type: "varchar(255)" },
      { name: "workspace_id", type: "uuid" },
      { name: "created_at", type: "timestamptz" },
    ],
  },
  {
    name: "conversations",
    rowCount: 3890,
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "channel", type: "varchar(50)" },
      { name: "status", type: "varchar(50)" },
      { name: "contact_id", type: "uuid" },
      { name: "sla_status", type: "varchar(50)" },
    ],
  },
  {
    name: "ai_knowledge_embeddings",
    rowCount: 842100,
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "document_id", type: "uuid" },
      { name: "chunk_text", type: "text" },
      { name: "embedding", type: "vector(1536)" },
      { name: "metadata", type: "jsonb" },
    ],
  },
  {
    name: "orders",
    rowCount: 540,
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "order_number", type: "varchar(100)" },
      { name: "amount", type: "numeric(10,2)" },
      { name: "payment_status", type: "varchar(50)" },
      { name: "is_cod", type: "boolean" },
    ],
  },
];

const mockExtensions = [
  { name: "pgvector", desc: "Vector similarity search and embeddings storage for AI applications", enabled: true },
  { name: "PostGIS", desc: "Geographic and spatial location query support", enabled: false },
  { name: "pg_trgm", desc: "Trigram matching for fast fuzzy string search", enabled: true },
  { name: "uuid-ossp", desc: "UUID generation algorithms (v4, v5)", enabled: true },
  { name: "pgcrypto", desc: "Cryptographic functions for password hashing & encryption", enabled: true },
];

const mockBuckets = [
  { name: "public-assets", public: true, files: 1240, size: "1.2 GB" },
  { name: "customer-documents", public: false, files: 340, size: "840 MB" },
  { name: "ai-knowledge-docs", public: false, files: 92, size: "240 MB" },
];

const mockFunctions = [
  { name: "payment-webhook", runtime: "TypeScript (Deno)", status: "Active", invocations: "42.1k", avgDuration: "14ms" },
  { name: "whatsapp-intent-handler", runtime: "TypeScript (Deno)", status: "Active", invocations: "128.4k", avgDuration: "28ms" },
  { name: "generate-embedding-vector", runtime: "Python 3.11", status: "Active", invocations: "18.2k", avgDuration: "140ms" },
];

export default function DatabaseStudioPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "tables";
  const [activeTab, setActiveTab] = useState<"tables" | "sql" | "designer" | "extensions" | "rls" | "storage" | "functions" | "branching">(initialTab as any);

  const [selectedTable, setSelectedTable] = useState<string>("contacts");
  const [sqlQuery, setSqlQuery] = useState<string>("SELECT * FROM contacts WHERE created_at > NOW() - INTERVAL '7 days' LIMIT 50;");
  const [sqlResults, setSqlResults] = useState<any[] | null>([
    { id: "c-1001", phone: "+919876543210", name: "Rahul Sharma", workspace_id: "ws-alpha", created_at: "2026-08-12 14:30:00" },
    { id: "c-1002", phone: "+919812345678", name: "Priya Patel", workspace_id: "ws-alpha", created_at: "2026-08-12 15:10:00" },
    { id: "c-1003", phone: "+919988776655", name: "Amit Kumar", workspace_id: "ws-alpha", created_at: "2026-08-12 16:45:00" },
  ]);
  const [isExecutingSql, setIsExecutingSql] = useState(false);
  const [extensions, setExtensions] = useState(mockExtensions);

  const handleExecuteSql = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setIsExecutingSql(false);
      toast({
        title: "Query Executed Successfully",
        description: "Returned 3 rows in 14ms.",
      });
    }, 400);
  };

  const toggleExtension = (name: string) => {
    setExtensions(prev =>
      prev.map(ext => ext.name === name ? { ...ext, enabled: !ext.enabled } : ext)
    );
    toast({
      title: "Extension Updated",
      description: `Toggled status for ${name}.`,
    });
  };

  const activeTableSchema = mockTables.find(t => t.name === selectedTable) || mockTables[0];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px] uppercase text-emerald-600 bg-emerald-50 border-emerald-200">
                POSTGRESQL 16.2 BAAS
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] uppercase text-blue-600 bg-blue-50 border-blue-200">
                PGVECTOR ACTIVE
              </Badge>
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight mt-1 text-foreground">Conversio Database Studio</h1>
            <p className="text-muted-foreground text-xs">Direct Postgres table manager, SQL runner, RLS policy builder, Storage &amp; Edge Functions.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs h-9 font-medium" onClick={() => setActiveTab("sql")}>
              <Terminal className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Open SQL Editor
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground font-medium text-xs h-9">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Table
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 border-b border-border pb-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("tables")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "tables" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" /> Table Editor
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "sql" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> SQL Editor
          </button>
          <button
            onClick={() => setActiveTab("designer")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "designer" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> ERD Schema Designer
          </button>
          <button
            onClick={() => setActiveTab("rls")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "rls" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> RLS Security
          </button>
          <button
            onClick={() => setActiveTab("storage")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "storage" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" /> Object Storage
          </button>
          <button
            onClick={() => setActiveTab("functions")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "functions" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Edge Functions
          </button>
          <button
            onClick={() => setActiveTab("branching")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "branching" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" /> DB Branching
          </button>
          <button
            onClick={() => setActiveTab("extensions")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === "extensions" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Extensions
          </button>
        </div>

        {/* TAB 1: TABLE EDITOR */}
        {activeTab === "tables" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3 border border-border rounded-xl p-3 bg-card space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground font-mono uppercase tracking-wider block px-2">TABLES ({mockTables.length})</span>
              <div className="space-y-1">
                {mockTables.map(t => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTable(t.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                      selectedTable === t.name ? "bg-accent font-bold text-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <TableIcon className="w-3.5 h-3.5 text-emerald-600" /> {t.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{t.rowCount}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-9 border border-border rounded-xl p-4 bg-card space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-1.5">
                    <TableIcon className="w-4 h-4 text-emerald-600" /> {activeTableSchema.name}
                  </h3>
                  <Badge variant="secondary" className="font-mono text-[10px]">{activeTableSchema.rowCount} rows</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono">Insert Row</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono"><Download className="w-3 h-3 mr-1" /> Export CSV</Button>
                </div>
              </div>

              <div className="overflow-x-auto border border-border rounded-lg">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-muted text-muted-foreground uppercase text-[10px] border-b border-border">
                    <tr>
                      {activeTableSchema.columns.map(c => (
                        <th key={c.name} className="p-2.5 font-bold">
                          {c.name} <span className="text-[9px] font-normal text-muted-foreground">({c.type})</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-600">c-9011a</td>
                      <td className="p-2.5">+919825012345</td>
                      <td className="p-2.5">Rahul Makwana</td>
                      <td className="p-2.5 text-muted-foreground">ws-prod-01</td>
                      <td className="p-2.5 text-muted-foreground">2026-08-14 00:12:00</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-600">c-9012b</td>
                      <td className="p-2.5">+919811122233</td>
                      <td className="p-2.5">Ananya Roy</td>
                      <td className="p-2.5 text-muted-foreground">ws-prod-01</td>
                      <td className="p-2.5 text-muted-foreground">2026-08-14 00:15:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SQL EDITOR */}
        {activeTab === "sql" && (
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-4 bg-slate-950 text-slate-100 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-400" /> SQL Query Runner
                </span>
                <Button size="sm" onClick={handleExecuteSql} disabled={isExecutingSql} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-8 text-xs">
                  <Play className="w-3.5 h-3.5 mr-1" /> {isExecutingSql ? "Executing..." : "Run Query (Ctrl+Enter)"}
                </Button>
              </div>
              <textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                rows={5}
                className="w-full bg-transparent border-none text-emerald-300 focus:outline-none font-mono text-xs leading-relaxed resize-none"
              />
            </div>

            {sqlResults && (
              <div className="border border-border rounded-xl p-4 bg-card space-y-2">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase">Query Results (3 rows returned)</span>
                <div className="overflow-x-auto border border-border rounded-lg">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-muted text-muted-foreground uppercase text-[10px]">
                      <tr>
                        {Object.keys(sqlResults[0] || {}).map(k => (
                          <th key={k} className="p-2.5 font-bold">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {sqlResults.map((r, i) => (
                        <tr key={i}>
                          {Object.values(r).map((v: any, j) => (
                            <td key={j} className="p-2.5 text-foreground">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OBJECT STORAGE */}
        {activeTab === "storage" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockBuckets.map(b => (
                <div key={b.name} className="p-4 border border-border rounded-xl bg-card space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-foreground flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-emerald-600" /> {b.name}
                    </span>
                    <Badge variant={b.public ? "secondary" : "outline"} className="text-[10px] font-mono">
                      {b.public ? "Public CDN" : "Private RLS"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>{b.files} files</span>
                    <span>{b.size} used</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full text-xs h-8">Browse Objects</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EDGE FUNCTIONS */}
        {activeTab === "functions" && (
          <div className="border border-border rounded-xl p-4 bg-card space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <h3 className="text-sm font-bold font-mono">Serverless Edge Functions</h3>
              <Button size="sm" className="h-8 text-xs"><Plus className="w-3.5 h-3.5 mr-1" /> Deploy Function</Button>
            </div>
            <div className="space-y-2">
              {mockFunctions.map(f => (
                <div key={f.name} className="p-3 border border-border rounded-xl flex items-center justify-between bg-muted/30">
                  <div className="space-y-0.5">
                    <span className="font-mono text-xs font-bold text-foreground flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-purple-600" /> /functions/{f.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{f.runtime} • {f.invocations} requests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-600 font-bold">{f.avgDuration}</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">{f.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DATABASE BRANCHING */}
        {activeTab === "branching" && (
          <div className="p-6 border border-border rounded-xl bg-card space-y-4 text-center max-w-xl mx-auto">
            <GitBranch className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold font-display">Database Branching &amp; Preview Backends</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Create isolated Git-like database branches for pull requests. Test migrations safely before merging to production.
            </p>
            <div className="p-3 bg-muted rounded-xl font-mono text-xs text-left space-y-1 border border-border">
              <span className="text-emerald-600 font-bold">🌿 main (Production Postgres)</span>
              <div className="pl-4 text-muted-foreground">└── 🌿 feat/add-loyalty-points (Preview Branch #42)</div>
            </div>
            <Button className="bg-emerald-600 text-white font-bold text-xs h-9">Create Branch</Button>
          </div>
        )}

        {/* TAB 6: EXTENSIONS */}
        {activeTab === "extensions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extensions.map(ext => (
              <div key={ext.name} className="p-4 border border-border rounded-xl bg-card flex items-start justify-between">
                <div className="space-y-1 max-w-xs">
                  <span className="font-mono text-xs font-bold text-foreground block">{ext.name}</span>
                  <p className="text-[11px] text-muted-foreground leading-snug">{ext.desc}</p>
                </div>
                <Button
                  size="sm"
                  variant={ext.enabled ? "default" : "outline"}
                  onClick={() => toggleExtension(ext.name)}
                  className="text-xs h-8"
                >
                  {ext.enabled ? "Enabled" : "Enable"}
                </Button>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
