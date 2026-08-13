import { Button } from "@/components/ui/button";
import { MessageSquare, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";
import { activeApiAdapter } from "@/lib/api";
import { hasSupabaseEnv } from "@/lib/supabase/client";
import { signInWithGoogle } from "@/lib/supabase/auth";
import { getAuthErrorMessage } from "@/lib/authErrors";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAppContext();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast({ title: "Missing details", description: "Enter your email and password to continue." });
      return;
    }

    setIsSubmitting(true);

    try {
      const nextState = await signIn(email.trim(), password);
      toast({ title: "Signed in", description: "Your workspace is ready." });
      navigate(nextState.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      toast({
        title: "Login failed",
        description: getAuthErrorMessage(error, "We could not sign you in right now."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);

    try {
      if (activeApiAdapter === "supabase" && hasSupabaseEnv) {
        await signInWithGoogle();
        return;
      }

      const nextState = await signIn("founder@conversio.ai", "demo-password");
      toast({ title: "Signed in with Google", description: "Demo account connected successfully." });
      navigate(nextState.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      toast({
        title: "Google login failed",
        description: getAuthErrorMessage(error, "We could not start Google login right now."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex gradient-subtle">
      {/* Left side - graphic panel in LIGHT MODE */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white border-r border-slate-200/80 p-12 flex-col justify-between overflow-hidden">
        {/* Background Image Showcase */}
        <img src="/home/login_hero.jpg" alt="Conversio AI Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-15 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg space-y-6 text-left my-auto"
        >
          <div className="flex items-center gap-3">
            <img src="/home/logo.jpg" alt="Conversio" className="h-12 w-12 rounded-2xl border border-slate-200 shadow-sm object-cover" />
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900">Conversio AI</span>
              <p className="text-xs text-emerald-700 font-mono font-bold">AI Revenue Operating System</p>
            </div>
          </div>

          <h1 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Scale D2C Marketing &amp; E-Commerce Conversion
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed font-normal">
            Automate repeat orders, recover abandoned carts via WhatsApp, and verify COD orders with conversational AI voice calling.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl space-y-1 shadow-2xs">
              <span className="text-emerald-700 text-xl font-extrabold font-mono">+32.4%</span>
              <p className="text-[11px] text-slate-600 font-medium">Cart Recovery Rate</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl space-y-1 shadow-2xs">
              <span className="text-emerald-700 text-xl font-extrabold font-mono">45% Less RTO</span>
              <p className="text-[11px] text-slate-600 font-medium">COD Converted to Prepaid</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <img src="/home/logo.jpg" alt="Conversio AI" className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-xs" />
            <h1 className="font-display text-xl font-bold text-foreground">Conversio AI</h1>
          </div>

          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <div className="space-y-4">
            <Button variant="outline" size="lg" className="w-full justify-center gap-2" onClick={handleGoogleLogin} disabled={isSubmitting}>
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm"
              />
            </div>

            <Button variant="gradient" size="lg" className="w-full" onClick={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="text-primary font-medium hover:underline">
              Sign up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
