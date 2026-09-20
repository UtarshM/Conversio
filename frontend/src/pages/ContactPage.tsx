import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Sparkles,
  Send,
  Building2,
  Mail,
  Phone,
  User,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brandName, setBrandName] = useState("");
  const [platform, setPlatform] = useState("Shopify");
  const [monthlyOrders, setMonthlyOrders] = useState("1,000 - 5,000 orders/mo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !brandName) {
      toast({
        title: "Please fill all required fields",
        description: "Name, Work Email, Mobile Number, and Brand Name are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Demo Request Submitted! 🎉",
        description: "Our D2C growth specialist will contact you on WhatsApp within 15 minutes.",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Shared Public Navbar */}
      <PublicNavbar />

      {/* Main Container */}
      <main className="pt-36 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Left Side: Brand Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <Badge className="bg-emerald-100 text-emerald-800 border-none font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold">
              BOOK A 1-ON-1 DEMO
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
              Scale Your D2C Store with Conversio AI
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              Book a custom 15-minute walkthrough with our revenue operations team. See how top Indian D2C brands recover dropped checkouts and eliminate COD RTO losses.
            </p>

            <div className="space-y-4 pt-2 font-medium text-slate-700 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span>+32.4% Average WhatsApp Abandoned Cart Recovery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span>45% Reduction in COD RTO via Hinglish AI Voice Calls</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span>Instant 2-minute Shopify &amp; WooCommerce Integration</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> TRUSTED BY D2C LEADERS
              </div>
              <p className="text-xs text-slate-600 italic">
                "Conversio helped us convert 42% of our COD orders to prepaid within 14 days of launch!"
              </p>
              <div className="text-xs font-bold text-slate-900 font-mono">– Growth Lead, Kadam Leather Boots</div>
            </div>
          </div>

          {/* Right Side: Lead Capture Form */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-[32px] p-8 md:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center space-y-6 py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thank You, {fullName}!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your demo request for <span className="font-bold text-slate-900">{brandName}</span> has been received. Our senior strategy consultant will reach out to you on <span className="font-bold text-slate-900">{phone}</span> via WhatsApp.
                </p>
                <Button onClick={() => navigate("/playground")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-8 rounded-xl text-xs">
                  Explore Live Playground
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900">Request Demo &amp; Free Trial</h3>
                  <p className="text-slate-500 text-xs">Fill in your store details below to connect with an AI revenue specialist.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" /> Full Name *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. Rahul Makwana"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" /> Work Email *
                      </Label>
                      <Input
                        required
                        type="email"
                        placeholder="rahul@yourbrand.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" /> WhatsApp Number *
                      </Label>
                      <Input
                        required
                        placeholder="+91 98250 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" /> Brand Name *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. Kadam Leather"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 h-11 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-500" /> E-Commerce Platform
                      </Label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 h-11 px-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Shopify">Shopify</option>
                        <option value="WooCommerce">WooCommerce</option>
                        <option value="Custom Store">Custom Stack / API</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-500" /> Monthly Order Volume
                      </Label>
                      <select
                        value={monthlyOrders}
                        onChange={(e) => setMonthlyOrders(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 h-11 px-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="< 1,000 orders/mo">&lt; 1,000 orders/mo</option>
                        <option value="1,000 - 5,000 orders/mo">1,000 - 5,000 orders/mo</option>
                        <option value="5,000 - 25,000 orders/mo">5,000 - 25,000 orders/mo</option>
                        <option value="25,000+ orders/mo">25,000+ orders/mo (Enterprise)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A0A0A] hover:bg-black text-white rounded-xl h-12 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting Request..." : "Book 1-on-1 Demo"}
                </Button>

                <p className="text-[11px] text-slate-500 text-center font-mono">🔒 Zero spam guaranteed. ISO 27001 &amp; GDPR Compliant.</p>
              </form>
            )}
          </div>

        </div>

      </main>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
