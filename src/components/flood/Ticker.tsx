import { Radio } from "lucide-react";

const updates = [
  "Hooghly +8cm in last 15min at Howrah Bridge",
  "IMD issued Red Alert for Mumbai · valid until 23:30 IST",
  "LBS Marg underpass closed to all traffic",
  "Vivekananda School shelter open · 322 spaces available",
  "Monsoon cell tracking NE at 28 kph over Konkan",
  "12,482 push notifications delivered via NDMA Sachet",
  "NDRF Team-4 deployed to Kurla West",
  "Power restored to Dadar substation",
  "BMC helpline 1916 · NDRF 011-26701728",
];

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-card/30 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 md:px-6 py-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-foam shrink-0">
          <Radio className="h-3 w-3" />
          Live feed
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap ticker-track">
            {[...updates, ...updates].map((u, i) => (
              <span key={i} className="text-xs text-muted-foreground">
                <span className="text-warn mr-2">●</span>
                {u}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </div>
  );
}