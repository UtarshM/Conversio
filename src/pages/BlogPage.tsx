import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import {
  MessageSquare,
  Search,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Share2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Cart Recovery" | "RTO Reduction" | "WhatsApp Marketing" | "AI Voice" | "Comparisons";
  readTime: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  bgGradient: string;
  content: string[];
}

const mockPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "recover-abandoned-carts-whatsapp-ai",
    title: "How D2C Brands Recover 32%+ Abandoned Carts using WhatsApp & AI Voice Automation",
    excerpt: "Learn how top e-commerce brands in India use automated 3-touchpoint WhatsApp sequences combined with AI voice calls to turn cart drop-offs into paid orders.",
    category: "Cart Recovery",
    readTime: "6 min read",
    date: "Aug 12, 2026",
    coverImage: "/blog/cart_recovery.jpg",
    author: {
      name: "Rahul Sharma",
      role: "Head of Growth @ Conversio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
    },
    featured: true,
    bgGradient: "from-emerald-600 via-teal-700 to-slate-900",
    content: [
      "Cart abandonment is the #1 revenue leak for D2C brands, averaging 70-75% across Shopify and WooCommerce stores in India.",
      "Traditional email recovery yields less than 2% click-through rates. WhatsApp, however, boasts 98% open rates and 45% engagement rates.",
      "The 3-Touchpoint Intent Recovery Framework:",
      "1. T+15 Mins (WhatsApp Message): Send a personalized WhatsApp notification with the cart items and a 1-click checkout button.",
      "2. T+2 Hours (5% Prepay Incentive): Offer a ₹100 or 5% instant discount if the customer completes payment via UPI or Razorpay.",
      "3. T+12 Hours (Automated AI Voice Call): Trigger a human-like Conversio AI Voice Call asking if they faced any checkout errors or need help placing the order."
    ]
  },
  {
    id: "post-2",
    slug: "cod-to-prepaid-reduce-rto-rates-45-percent",
    title: "COD to Prepaid: The Ultimate Strategy to Reduce RTO Rates by 45% in India",
    excerpt: "Return to Origin (RTO) eats up 20-30% of logistics margins for Indian e-commerce. Here is how automated COD verification and prepay incentives fix it.",
    category: "RTO Reduction",
    readTime: "5 min read",
    date: "Aug 10, 2026",
    coverImage: "/blog/rto_reduction.jpg",
    author: {
      name: "Priya Patel",
      role: "E-Commerce Analyst",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop"
    },
    bgGradient: "from-blue-600 via-indigo-700 to-slate-900",
    content: [
      "RTO (Return to Origin) costs e-commerce businesses reverse shipping fees, stuck inventory, and packaging losses.",
      "Over 60% of unconfirmed Cash on Delivery (COD) orders end up rejected at the customer's doorstep.",
      "How Conversio Solves RTO:",
      "• Instant Address & Pin-Code Verification via WhatsApp Cloud API.",
      "• Prepayment Incentive Link: Give ₹150 OFF when converting COD to UPI Prepaid.",
      "• Instant Fake Order Flagging: Block fraudulent pin-codes before dispatch."
    ]
  },
  {
    id: "post-3",
    slug: "conversio-vs-interakt-vs-wati-comparison",
    title: "Conversio vs Interakt vs Wati: Which WhatsApp Platform Has Highest ROI in 2026?",
    excerpt: "A deep dive comparing Meta conversation costs, multi-agent CRM capabilities, AI voice integration, and developer cloud APIs across top WhatsApp platforms.",
    category: "Comparisons",
    readTime: "8 min read",
    date: "Aug 05, 2026",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    author: {
      name: "Vikram Mehta",
      role: "Product Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    bgGradient: "from-purple-600 via-slate-800 to-slate-950",
    content: [
      "Choosing the right WhatsApp Business API partner impacts your margins and customer conversion.",
      "Interakt and Wati charge heavy per-message markups on top of Meta's rates.",
      "Conversio offers 100% Direct Meta Pass-Through pricing with zero message markup, integrated AI Voice calling, and a full Supabase-like Developer BaaS cloud!"
    ]
  },
  {
    id: "post-4",
    slug: "5-myths-ai-voice-calling-ecommerce",
    title: "5 Myths About AI Voice Calling for E-Commerce Order Verification",
    excerpt: "Is AI voice natural? Does it sound robotic? We dispel common myths and show real call recordings converting COD orders.",
    category: "AI Voice",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    coverImage: "/blog/ai_voice.jpg",
    author: {
      name: "Rahul Sharma",
      role: "Head of Growth @ Conversio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
    },
    bgGradient: "from-amber-600 via-orange-700 to-slate-900",
    content: [
      "Myth 1: AI voice sounds robotic. Fact: Ultra-low latency ElevenLabs & Deepgram models speak fluent Hindi, Hinglish, and regional dialects with human pauses.",
      "Myth 2: Customers hang up. Fact: Conversio AI Voice has an 82% call completion rate for COD order confirmations."
    ]
  }
];

const categories = ["All Posts", "Cart Recovery", "RTO Reduction", "WhatsApp Marketing", "AI Voice", "Comparisons"];

export default function BlogPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCat = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = mockPosts.find((p) => p.featured) || mockPosts[0];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      {/* Unified Public Floating Header */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 bg-gradient-to-b from-[#CDE4F7]/40 via-[#FDF0E1]/40 to-white text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 uppercase tracking-widest text-[10px] py-1 px-3 mb-4">
            Conversio Playbooks &amp; Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            E-Commerce Conversion &amp; WhatsApp Growth Playbooks
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Tactics, case studies, and guides on recovering abandoned carts, eliminating RTO losses, and scaling D2C sales with Conversio AI.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search playbooks (e.g. cart recovery, RTO, AI voice)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-12 pr-4 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-y border-slate-100 py-4 bg-white sticky top-[76px] z-40 shadow-xs">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Main Article Card */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div
            onClick={() => setActivePost(featuredPost)}
            className="group cursor-pointer rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-2 bg-white hover:border-emerald-300 transition-all duration-300"
          >
            <div className="relative overflow-hidden min-h-[300px] lg:min-h-[380px]">
              <img src={featuredPost.coverImage} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-8 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 text-white border-none text-[10px] px-2.5 py-1">{featuredPost.category}</Badge>
                  <span className="text-xs text-white/90 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-9 h-9 rounded-full object-cover border-2 border-white/40" />
                  <div>
                    <p className="text-xs font-bold text-white">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-white/80">{featuredPost.author.role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">Featured Playbook</span>
                <h2 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{featuredPost.excerpt}</p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3-Touchpoint Automated Flow Strategy
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> WhatsApp + AI Voice Telephony Benchmarks
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                Read Complete Playbook <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Latest Articles &amp; Case Studies</h2>
            <span className="text-xs text-slate-500 font-mono">{filteredPosts.length} Articles Found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Article Cover Image Header */}
                <div className="w-full aspect-[16/9] overflow-hidden bg-slate-100 relative">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-slate-900 backdrop-blur-md shadow-xs border-none text-[10px] font-bold">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-mono backdrop-blur-xs">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-[11px] font-medium text-slate-700">{post.author.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Converting CTA Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6 relative z-10">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-3 py-1">
            ⚡ Start Recovering Lost Carts Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to add 15-30% repeat revenue with Conversio AI?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Join 700+ D2C brands using WhatsApp Cloud API, automated COD verification, and AI Voice calling.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-8 py-3 font-semibold" onClick={() => navigate("/signup")}>
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className={`p-8 bg-gradient-to-r ${activePost.bgGradient} text-white relative`}>
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <Badge className="bg-white/20 text-white border-none text-[10px] mb-3">{activePost.category}</Badge>
              <h2 className="text-2xl font-bold leading-snug">{activePost.title}</h2>
              <div className="flex items-center gap-4 mt-4 text-xs text-white/80">
                <span>By {activePost.author.name}</span>
                <span>• {activePost.date}</span>
                <span>• {activePost.readTime}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
              {activePost.content.map((paragraph, idx) => (
                <p key={idx} className={paragraph.startsWith("•") || paragraph.startsWith("1.") ? "font-bold text-slate-900 pl-2" : ""}>
                  {paragraph}
                </p>
              ))}

              {/* Inline High ROI Product Card */}
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Automate this exact flow in Conversio
                </h4>
                <p className="text-xs text-emerald-800">
                  Connect your Shopify store in 2 minutes and launch automated WhatsApp &amp; AI Voice recovery campaigns instantly.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs mt-2" onClick={() => navigate("/signup")}>
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Public Footer */}
      <PublicFooter />
    </div>
  );
}
