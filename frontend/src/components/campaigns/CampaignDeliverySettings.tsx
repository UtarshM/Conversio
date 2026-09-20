import { useState } from "react";
import {
  RotateCcw,
  Layers,
  Clock,
  Info,
  ArrowRight,
  ArrowLeft,
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
  title = "Create Campaign",
  stepIndicator = "Delivery — Step 4 of 5",
  hideNavButtons = false,
}: DeliverySettingsProps) {
  const [retryFailed, setRetryFailed] = useState(false);
  const [batchSize, setBatchSize] = useState(25);
  const [gapBetweenBatches, setGapBetweenBatches] = useState(5);
  const [minGapSeconds, setMinGapSeconds] = useState(5);
  const [maxGapSeconds, setMaxGapSeconds] = useState(10);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Step Header (Matching RapidSales Screenshot) */}
      <div className="pb-4 border-b border-gray-200/80">
        <h2 className="text-xl font-bold text-gray-900 font-sans">{title}</h2>
        <p className="text-xs text-gray-400 font-mono mt-0.5">{stepIndicator}</p>
      </div>

      {/* Box 1: Retry Failed Messages */}
      <div className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Retry failed messages</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Add a fallback template to a WhatsApp step in the Sequence Builder to enable retry.
              </p>
            </div>
          </div>

          <Switch
            checked={retryFailed}
            onCheckedChange={setRetryFailed}
            className="data-[state=checked]:bg-[#ea580c]"
          />
        </div>
      </div>

      {/* Box 2: Audience Batching */}
      <div className="p-6 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mt-0.5">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-gray-900">Audience batching</h4>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Split the send into smaller batches. Leave size at 0 to send all at once.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-700 font-semibold">Batch size</Label>
            <div className="relative">
              <Input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="bg-white border-gray-200 text-gray-900 font-mono h-11 pr-20 text-sm focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                recipients
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-700 font-semibold">Gap between batches</Label>
            <div className="relative">
              <Input
                type="number"
                value={gapBetweenBatches}
                onChange={(e) => setGapBetweenBatches(Number(e.target.value))}
                className="bg-white border-[#ea580c] text-gray-900 font-mono h-11 pr-14 text-sm ring-1 ring-[#ea580c]/20"
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
      <div className="p-6 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-gray-900">Gap between recipients</h4>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              A random delay in this range is applied before each message so sends look natural.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-700 font-semibold">Minimum gap</Label>
            <div className="relative">
              <Input
                type="number"
                value={minGapSeconds}
                onChange={(e) => setMinGapSeconds(Number(e.target.value))}
                className="bg-white border-gray-200 text-gray-900 font-mono h-11 pr-14 text-sm focus:border-[#ea580c]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                sec
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Minimum 2 seconds</span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-700 font-semibold">Maximum gap</Label>
            <div className="relative">
              <Input
                type="number"
                value={maxGapSeconds}
                onChange={(e) => setMaxGapSeconds(Number(e.target.value))}
                className="bg-white border-gray-200 text-gray-900 font-mono h-11 pr-14 text-sm focus:border-[#ea580c]"
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
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/80">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-9 px-4 rounded-lg bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Button>

          <span className="text-xs font-mono text-gray-400">{stepIndicator}</span>

          <Button
            onClick={onNext}
            className="h-9 px-6 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
