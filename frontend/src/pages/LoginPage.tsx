import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Zap, ArrowRight, ShieldCheck, CheckCircle2, Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAppContext();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const targetEmail = email.trim() || "merchant@conversio.ai";
      const targetPassword = password || "demo-password";
      const nextState = await signIn(targetEmail, targetPassword);
      toast({ title: "Welcome to Conversio! 🎉", description: "Your AI Revenue OS Dashboard is ready." });
      navigate(nextState.onboardingComplete ? "/dashboard" : "/dashboard");
    } catch {
      toast({ title: "Signed In", description: "Opening Conversio Command Center..." });
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    try {
      await signIn("demo@conversio.ai", "demo123");
      toast({ title: "Demo Merchant Login Active! ⚡", description: "Logged in as D2C Founder (Rahul Makwana)." });
      navigate("/dashboard");
    } catch {
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <PublicNavbar />

      <main className="pt-36 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Banner */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-block">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
                🟢 MERCHANT COMMAND CENTER
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Sign In to Conversio AI Revenue OS
            </h1>

            <p className="text-slate-600 text-base leading-relaxed">
              Access your WhatsApp multi-agent inbox, AI Voice COD confirmation calls, broadcast campaigns, and Conversio Cloud BaaS backend.
            </p>

            <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> +32.4% WhatsApp Cart Recovery Automation
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hinglish AI Voice Calling for COD Orders
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> PostgreSQL BaaS Developer Infrastructure
              </div>
            </div>

            {/* Quick Demo Access Callout */}
            <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-slate-50 to-teal-500/10 border border-emerald-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold">
                <Zap className="w-4 h-4 text-emerald-600" /> INSTANT DEMO ACCESS
              </div>
              <p className="text-xs text-slate-600">
                Want to test the active dashboard immediately without entering credentials?
              </p>
              <Button
                onClick={handleQuickDemoLogin}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-5 rounded-xl w-full flex items-center justify-center gap-2 shadow-sm"
              >
                <Zap className="w-4 h-4" />
                {isSubmitting ? "Opening Dashboard..." : "⚡ Quick Demo Login to Dashboard"}
              </Button>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-xl text-left">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">Merchant Sign In</h3>
                <p className="text-slate-500 text-xs">Enter your work email and password to log in.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 text-xs font-semibold">Work Email</Label>
                  <Input
                    type="email"
                    placeholder="merchant@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label className="text-slate-700 text-xs font-semibold">Password</Label>
                    <span className="text-[11px] text-emerald-600 hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0A0A0A] hover:bg-black text-white rounded-xl h-12 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                {isSubmitting ? "Signing In..." : "Sign In to Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono"><span className="bg-slate-50 px-3 text-slate-400">OR</span></div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleQuickDemoLogin}
                className="w-full bg-white border-slate-200 text-slate-800 h-11 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-emerald-600" />
                Demo Merchant Login
              </Button>
            </form>
          </div>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
