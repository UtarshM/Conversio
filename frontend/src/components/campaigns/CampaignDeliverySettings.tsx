import { useState } from "react";
import {
  RotateCcw,
  Layers,
  Clock,
  ShieldCheck,
  Info,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DeliverySettingsProps {
  onBack?: () => void;
  onNext?: () => void;
  title?: string;
  stepIndicator?: string;
  hideNavButtons?: boolean;
}

export function CampaignDeliverySettings({
  onBack,
  onNext,
  title = "Delivery Controls",
  stepIndicator = "Step 3 of 4 · Anti-Ban Safeguards",
  hideNavButtons = false,
}: DeliverySettingsProps) {
  const [retryFailed, setRetryFailed] = useState(false);
  const [batchSize, setBatchSize] = useState(25);
  const [gapBetweenBatches, setGapBetweenBatches] = useState(5);
  const [minGapSeconds, setMinGapSeconds] = useState(5);
  const [maxGapSeconds, setMaxGapSeconds] = useState(10);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{stepIndicator}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Anti-Ban Warm-up Active
          </span>
        </div>
      </div>

      {/* Box 1: Retry Failed Messages */}
      <div className="p-5 rounded-2xl bg-[#070e12] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Retry failed messages</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Add a fallback template to a WhatsApp step in the Sequence Builder to enable retry.
              </p>
            </div>
          </div>

          <Switch
            checked={retryFailed}
            onCheckedChange={setRetryFailed}
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>
      </div>

      {/* Box 2: Audience Batching */}
      <div className="p-6 rounded-2xl bg-[#070e12] border border-white/10 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mt-0.5">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white">Audience batching</h4>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Split the send into smaller batches. Leave size at 0 to send all at once.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-300 font-semibold">Batch size</Label>
            <div className="relative">
              <Input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="bg-white/[0.02] border-white/10 text-white font-mono h-11 pr-20 text-sm focus:border-emerald-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                recipients
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-300 font-semibold">Gap between batches</Label>
            <div className="relative">
              <Input
                type="number"
                value={gapBetweenBatches}
                onChange={(e) => setGapBetweenBatches(Number(e.target.value))}
                className="bg-white/[0.02] border-white/10 text-white font-mono h-11 pr-14 text-sm focus:border-emerald-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                min
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">5–60 minutes</span>
          </div>
        </div>
      </div>

      {/* Box 3: Gap Between Recipients (Natural Human Jitter) */}
      <div className="p-6 rounded-2xl bg-[#070e12] border border-white/10 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white">Gap between recipients</h4>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              A random delay in this range is applied before each message so sends look natural.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-300 font-semibold">Minimum gap</Label>
            <div className="relative">
              <Input
                type="number"
                value={minGapSeconds}
                onChange={(e) => setMinGapSeconds(Number(e.target.value))}
                className="bg-white/[0.02] border-white/10 text-white font-mono h-11 pr-14 text-sm focus:border-emerald-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                sec
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Minimum 2 seconds</span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-300 font-semibold">Maximum gap</Label>
            <div className="relative">
              <Input
                type="number"
                value={maxGapSeconds}
                onChange={(e) => setMaxGapSeconds(Number(e.target.value))}
                className="bg-white/[0.02] border-white/10 text-white font-mono h-11 pr-14 text-sm focus:border-emerald-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                sec
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Any value 2 min</span>
          </div>
        </div>
      </div>

      {/* Bottom Step Progression Bar */}
      {!hideNavButtons && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-10 px-4 rounded-xl bg-white/[0.03] border-white/10 text-gray-300 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <span className="text-xs font-mono text-gray-400">{stepIndicator}</span>

          <Button
            onClick={onNext}
            className="h-10 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
