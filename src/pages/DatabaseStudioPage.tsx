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
  Key
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

export default function DatabaseStudioPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "tables";
  const [activeTab, setActiveTab] = useState<"tables" | "sql" | "designer" | "extensions" | "rls">(initialTab as any);
  
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
    setExtensions(extensions.map(ext => ext.name === name ? { ...ext, enabled: !ext.enabled } : ext));
    toast({
      title: "Extension State Changed",
      description: `PostgreSQL extension "${name}" updated.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                PostgreSQL 16.2
              </Badge>
              <span className="text-xs text-slate-400 font-mono">Project: conversio-core-production</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900 mt-1">Database Studio</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab("tables")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "tables" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 inline mr-1.5" /> Table Editor
            </button>
            <button
              onClick={() => setActiveTab("sql")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "sql" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 inline mr-1.5" /> SQL Console
            </button>
            <button
              onClick={() => setActiveTab("designer")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "designer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5" /> ER Schema
            </button>
            <button
              onClick={() => setActiveTab("extensions")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "extensions" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 inline mr-1.5" /> Extensions
            </button>
            <button
              onClick={() => setActiveTab("rls")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "rls" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1.5" /> RLS Security
            </button>
          </div>
        </div>

        {/* TAB 1: Table Editor */}
        {activeTab === "tables" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Tables List */}
            <div className="p-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tables ({mockTables.length})</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-600">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Table
                </Button>
              </div>

              <div className="space-y-1">
                {mockTables.map((tbl) => (
                  <button
                    key={tbl.name}
                    onClick={() => setSelectedTable(tbl.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      selectedTable === tbl.name ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <TableIcon className="w-3.5 h-3.5 text-slate-400" /> {tbl.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{tbl.rowCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table Content Spreadsheet View */}
            <div className="md:col-span-3 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-mono">public.{selectedTable}</h3>
                  <p className="text-xs text-slate-400">PostgreSQL Schema Definition &amp; Row Preview</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Insert Row
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
                  </Button>
                </div>
              </div>

              {/* Columns Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                    <tr>
                      <th className="p-3">COLUMN NAME</th>
                      <th className="p-3">DATA TYPE</th>
                      <th className="p-3">PRIMARY KEY</th>
                      <th className="p-3">NULLABLE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockTables.find((t) => t.name === selectedTable)?.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-900">{col.name}</td>
                        <td className="p-3 text-emerald-600 font-semibold">{col.type}</td>
                        <td className="p-3">{col.isPrimary ? <Badge className="bg-amber-100 text-amber-800 border-none">PK</Badge> : "-"}</td>
                        <td className="p-3 text-slate-400">{col.isNullable ? "YES" : "NO"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SQL Console */}
        {activeTab === "sql" && (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-3xl p-4 text-white space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">PostgreSQL Editor / Executable Console</span>
                <Button
                  onClick={handleExecuteSql}
                  disabled={isExecutingSql}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> {isExecutingSql ? "Executing..." : "Run SQL Query"}
                </Button>
              </div>

              <textarea
                rows={5}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-sm p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Query Results */}
            {sqlResults && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>QUERY RESULTS (3 ROWS)</span>
                  <span>Execution Time: 14ms</span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                      <tr>
                        {Object.keys(sqlResults[0] || {}).map((key) => (
                          <th key={key} className="p-3 uppercase">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sqlResults.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          {Object.values(row).map((val: any, vIdx) => (
                            <td key={vIdx} className="p-3 text-slate-800">{String(val)}</td>
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

        {/* TAB 3: Extensions Manager */}
        {activeTab === "extensions" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">PostgreSQL Extensions Marketplace</h3>
              <p className="text-xs text-slate-500">Enable advanced database functions like Vector Search, PostGIS, or Fuzzy Trigram Match with one click.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extensions.map((ext) => (
                <div key={ext.name} className="p-5 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono text-sm">{ext.name}</span>
                      {ext.name === "pgvector" && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">AI Vector Enabled</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{ext.desc}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={ext.enabled ? "default" : "outline"}
                    onClick={() => toggleExtension(ext.name)}
                    className={ext.enabled ? "bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl" : "rounded-xl"}
                  >
                    {ext.enabled ? <Check className="w-3.5 h-3.5 mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                    {ext.enabled ? "Enabled" : "Enable"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RLS Security Policy Builder */}
        {activeTab === "rls" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Row Level Security (RLS) Policy Generator
              </h3>
              <p className="text-xs text-slate-500">Secure table rows automatically using context variable expressions like <code className="font-mono text-emerald-600">auth.uid()</code>.</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-4">
              <div className="text-xs font-mono text-slate-400">Generated SQL Policy Command:</div>
              <pre className="text-emerald-400 font-mono text-xs overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
{`CREATE POLICY "Users can only read their own workspace contacts"
ON public.contacts
FOR SELECT
USING (workspace_id = auth.jwt() ->> 'workspace_id');`}
              </pre>
              <Button onClick={() => toast({ title: "RLS Policy Applied", description: "Security policy enabled for contacts table." })} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl">
                Apply RLS Policy
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
