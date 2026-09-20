import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  Cpu,
  Brain,
  Search,
  Check,
  Terminal,
  Activity,
  Layers,
  Bot,
  Play
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ModelRoute {
  provider: "Google Gemini" | "OpenAI" | "Anthropic";
  modelName: string;
  avgLatency: string;
  tokenCost: string;
  priority: number;
  status: "Active" | "Fallback";
}

const mockRoutes: ModelRoute[] = [
  { provider: "Google Gemini", modelName: "gemini-2.0-flash", avgLatency: "180ms", tokenCost: "$0.0001 / 1K", priority: 1, status: "Active" },
  { provider: "OpenAI", modelName: "gpt-4o-mini", avgLatency: "240ms", tokenCost: "$0.00015 / 1K", priority: 2, status: "Fallback" },
  { provider: "Anthropic", modelName: "claude-3-5-haiku", avgLatency: "290ms", tokenCost: "$0.00025 / 1K", priority: 3, status: "Fallback" },
];

export default function AiVectorStudioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleHybridSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        {
          id: "vec-8910",
          chunkText: "WhatsApp Business Cloud API webhook setup & permanent access token configuration...",
          similarity: 0.942,
          metadata: { doc_id: "doc-meta-01", category: "API_DOCS" }
        },
        {
          id: "vec-8911",
          chunkText: "COD Order Verification voice calling flow using Deepgram Nova-2 STT and ElevenLabs TTS...",
          similarity: 0.887,
          metadata: { doc_id: "doc-voice-04", category: "VOICE_CALLING" }
        }
      ]);
      toast({ title: "Hybrid Search Complete", description: "Searched pgvector index with 0.94 max similarity." });
    }, 400);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
              <Zap className="w-3.5 h-3.5 fill-current" /> AI &amp; Vector Infrastructure Platform
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900 mt-2">pgvector &amp; AI Gateway Studio</h1>
            <p className="text-slate-500 text-xs mt-1">
              Store 1536-dimensional embeddings, execute hybrid vector search, and route LLM prompts across Gemini, OpenAI, and Anthropic.
            </p>
          </div>
        </div>

        {/* AI Gateway Model Router Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-500" /> LLM Model Router &amp; Fallback Gateway
            </h2>
            <Badge className="bg-emerald-100 text-emerald-800 border-none">Model Router Active</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockRoutes.map((route) => (
              <div key={route.modelName} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{route.provider}</span>
                  <Badge variant={route.status === "Active" ? "default" : "outline"} className={route.status === "Active" ? "bg-emerald-600 text-white" : ""}>
                    Priority #{route.priority} {route.status}
                  </Badge>
                </div>
                <p className="text-base font-bold text-slate-900 font-mono">{route.modelName}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-3">
                  <span>Latency: <strong className="text-slate-800">{route.avgLatency}</strong></span>
                  <span>Cost: <strong className="text-slate-800">{route.tokenCost}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* pgvector Hybrid Search Console */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" /> pgvector Hybrid Search &amp; Embedding Inspector
            </h3>
            <p className="text-xs text-slate-500">Test semantic vector distance queries using <code className="font-mono text-emerald-600">embedding &lt;=&gt; query_vector</code>.</p>
          </div>

          <form onSubmit={handleHybridSearch} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter search prompt (e.g. WhatsApp webhook setup or COD voice verification)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button type="submit" disabled={isSearching} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl px-6">
              {isSearching ? "Searching..." : "Vector Search"}
            </Button>
          </form>

          {/* Search Results */}
          {searchResults && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 font-mono">NEAREST VECTOR NEIGHBORS (SIMILARITY RANKED)</span>
              <div className="space-y-3">
                {searchResults.map((res) => (
                  <div key={res.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900">{res.id}</span>
                      <Badge className="bg-emerald-100 text-emerald-800 border-none font-mono">
                        Cosine Similarity: {(res.similarity * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 font-mono">{res.chunkText}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conversio MCP Server Banner */}
        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Conversio MCP Server (`conversio-mcp`)</h3>
                <p className="text-xs text-slate-400">Official Model Context Protocol server exposing database inspection, SQL queries, and migration tools to AI coding agents.</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">MCP ACTIVE</Badge>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
