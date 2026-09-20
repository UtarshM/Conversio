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

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAppContext();

  const isEmailConfirmationRequired = (error: unknown) => (
    error instanceof Error && /email confirmation is required/i.test(error.message)
  );

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ title: "Missing details", description: "Complete the form to create your account." });
      return;
    }

    setIsSubmitting(true);

    try {
      const nextState = await signUp(name.trim(), email.trim(), password);
      toast({ title: "Account created", description: "Let's finish onboarding your workspace." });
      navigate(nextState.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      if (isEmailConfirmationRequired(error)) {
        toast({
          title: "Check your email",
          description: "Your account was created. Confirm your email, then sign in to open your workspace.",
        });
        navigate("/login");
        return;
      }

      toast({
        title: "Signup blocked",
        description: getAuthErrorMessage(error, "We could not create your account right now."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);

    try {
      if (activeApiAdapter === "supabase" && hasSupabaseEnv) {
        await signInWithGoogle();
        return;
      }

      const nextState = await signUp("Conversio Founder", "founder@conversio.ai", "demo-password");
      toast({ title: "Google account connected", description: "Your workspace has been created." });
      navigate(nextState.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      if (isEmailConfirmationRequired(error)) {
        toast({
          title: "Check your email",
          description: "Your account was created. Confirm your email, then sign in to open your workspace.",
        });
        navigate("/login");
        return;
      }

      toast({
        title: "Google signup failed",
        description: getAuthErrorMessage(error, "We could not start Google signup right now."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex gradient-subtle">
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 items-center justify-center p-12 overflow-hidden border-r border-slate-800">
        <img src="/home/login_hero.jpg" alt="Conversio AI Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-65 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-lg space-y-6 text-left">
          <div className="flex items-center gap-3">
            <img src="/home/logo.jpg" alt="Conversio" className="h-12 w-12 rounded-2xl border border-white/20 shadow-lg object-cover" />
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">Conversio AI</span>
              <p className="text-xs text-emerald-400 font-mono">AI Revenue Operating System</p>
            </div>
          </div>

          <h1 className="text-4xl font-display font-extrabold text-white leading-tight">
            Start Growing with Conversio AI
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Join 700+ D2C brands &amp; tech partners automating repeat revenue via official WhatsApp Cloud APIs.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl space-y-1">
              <span className="text-emerald-400 text-lg font-bold font-mono">+32.4%</span>
              <p className="text-[11px] text-slate-300">Cart Recovery Rate</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl space-y-1">
              <span className="text-emerald-400 text-lg font-bold font-mono">45% Less RTO</span>
              <p className="text-[11px] text-slate-300">COD Converted to Prepaid</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <img src="/home/logo.jpg" alt="Conversio AI" className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-xs" />
            <h1 className="font-display text-xl font-bold text-foreground">Conversio AI</h1>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Create your account</h2>
          <p className="text-muted-foreground mb-8">Get started for free in under 2 minutes</p>

          <div className="space-y-4">
            <Button variant="outline" size="lg" className="w-full justify-center gap-2" onClick={handleGoogleSignup} disabled={isSubmitting}>
              <Chrome className="h-5 w-5" /> Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or</span></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm" />
            </div>
            <Button variant="gradient" size="lg" className="w-full" onClick={handleSignup} disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign in</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
