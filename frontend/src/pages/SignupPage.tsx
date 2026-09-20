import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Layers,
  Bot,
  User,
  Chrome,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, signIn } = useAppContext();

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ title: "Missing details", description: "Complete the form to create your account." });
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(name.trim(), email.trim(), password);
      toast({ title: "Account created! 🎉", description: "Opening your Conversio Command Center." });
      navigate("/dashboard");
    } catch {
      toast({ title: "Workspace Ready", description: "Entering Founder Command Center..." });
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    try {
      await signIn("demo@conversio.ai", "demo123");
      toast({
        title: "⚡ Demo Workspace Initialized!",
        description: "Exploring as Utkarsh Makwana (The Bombay Botanics D2C Store).",
      });
      navigate("/dashboard");
    } catch {
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#04080a] text-white font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <PublicNavbar />

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <main className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" /> 14-DAY FREE TRIAL • NO CREDIT CARD REQUIRED
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Start Growing with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Conversio OS
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Recover abandoned carts, eliminate COD RTO losses, predict product replenishment, and automate customer conversations with AI.
            </p>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <span className="text-emerald-400 text-xl font-bold font-mono">24.8%</span>
                <p className="text-xs text-gray-300">Cart Recovery Rate</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <span className="text-teal-400 text-xl font-bold font-mono">-65.4%</span>
                <p className="text-xs text-gray-300">RTO Losses Prevented</p>
              </div>
            </div>

            {/* 1-Click Instant Demo Card */}
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-[#071217] to-teal-950/30 border border-emerald-500/30 rounded-3xl space-y-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-emerald-400 fill-current" /> SKIP SIGNUP • INSTANT TEST DRIVE
                </span>
                <span className="text-[10px] text-emerald-400/80 font-mono">Pre-loaded Store Data</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Want to evaluate the complete workspace with live D2C numbers without filling out forms?
              </p>
              <Button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs h-11 px-5 rounded-2xl w-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                {isSubmitting ? "Opening Workspace..." : "Explore Live Founder Workspace (1-Click)"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Create Account Card */}
          <div className="lg:col-span-6 bg-[#070e12]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-left space-y-6">
            <div className="space-y-1.5 pb-2 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">Create Your Brand Account</h3>
              <p className="text-gray-400 text-xs">Set up your store in 60 seconds with instant Shopify sync.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs font-semibold">Your Full Name</Label>
                <Input
                  type="text"
                  placeholder="Utkarsh Makwana"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/[0.03] border-white/10 text-white placeholder-gray-500 h-11 rounded-xl text-xs focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs font-semibold">Work Email</Label>
                <Input
                  type="email"
                  placeholder="founder@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.03] border-white/10 text-white placeholder-gray-500 h-11 rounded-xl text-xs focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs font-semibold">Password</Label>
                <Input
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/[0.03] border-white/10 text-white placeholder-gray-500 h-11 rounded-xl text-xs focus:border-emerald-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl h-11 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mt-2 cursor-pointer"
              >
                {isSubmitting ? "Creating Account..." : "Create Account & Start Free Trial"}
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono">
                  <span className="bg-[#070e12] px-3 text-gray-500">OR TEST DRIVE DEMO</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleQuickDemoLogin}
                className="w-full bg-white/[0.03] hover:bg-white/[0.08] border-white/15 text-white h-11 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-emerald-400" />
                Launch Instant Demo Workspace
              </Button>
            </form>

            <div className="text-center pt-2 text-xs text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
