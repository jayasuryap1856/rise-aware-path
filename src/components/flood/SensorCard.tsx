import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus, Activity } from "lucide-react";
import type { Sensor } from "./data";
import { riskLabel } from "./data";

const ringByStatus: Record<Sensor["status"], string> = {
  safe: "from-safe/30 to-transparent",
  watch: "from-foam/30 to-transparent",
  warn: "from-warn/30 to-transparent",
  danger: "from-danger/40 to-transparent",
};

const dotByStatus: Record<Sensor["status"], string> = {
  safe: "bg-safe",
  watch: "bg-foam",
  warn: "bg-warn",
  danger: "bg-danger",
};

export function SensorCard({ sensor }: { sensor: Sensor }) {
  const pct = Math.min(100, (sensor.level / sensor.threshold) * 100);
  const TrendIcon = sensor.trend > 1 ? ArrowUpRight : sensor.trend < -1 ? ArrowDownRight : Minus;

  // Sparkline path
  const w = 220;
  const h = 48;
  const min = Math.min(...sensor.history);
  const max = Math.max(...sensor.history);
  const range = max - min || 1;
  const pts = sensor.history
    .map((v, i) => `${(i / (sensor.history.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <div className={cn("relative overflow-hidden rounded-2xl glass p-4")}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", ringByStatus[sensor.status])} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              {sensor.river}
            </div>
            <h4 className="font-display text-base font-semibold mt-1">{sensor.name}</h4>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotByStatus[sensor.status])}>
              {sensor.status === "danger" && (
                <span className={cn("absolute inset-0 rounded-full pulse-ring", dotByStatus[sensor.status])} />
              )}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {riskLabel[sensor.status]}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="font-display text-3xl font-bold tabular-nums">
              {sensor.level.toFixed(2)}
              <span className="text-sm text-muted-foreground ml-1">m</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <TrendIcon className="h-3 w-3" />
              {sensor.trend > 0 ? "+" : ""}
              {sensor.trend} cm / 15min
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-28 h-12 opacity-90">
            <defs>
              <linearGradient id={`g-${sensor.id}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pts}
              className={
                sensor.status === "danger"
                  ? "text-danger"
                  : sensor.status === "warn"
                  ? "text-warn"
                  : sensor.status === "watch"
                  ? "text-foam"
                  : "text-safe"
              }
            />
            <polygon
              points={`0,${h} ${pts} ${w},${h}`}
              fill={`url(#g-${sensor.id})`}
              className={
                sensor.status === "danger"
                  ? "text-danger"
                  : sensor.status === "warn"
                  ? "text-warn"
                  : sensor.status === "watch"
                  ? "text-foam"
                  : "text-safe"
              }
            />
          </svg>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
            <span>0 m</span>
            <span>Threshold {sensor.threshold} m</span>
          </div>
          <div className="relative h-2 rounded-full bg-secondary/60 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                sensor.status === "danger"
                  ? "bg-danger"
                  : sensor.status === "warn"
                  ? "bg-warn"
                  : sensor.status === "watch"
                  ? "bg-foam"
                  : "bg-safe",
              )}
              style={{ width: `${pct}%` }}
            />
            <div className="absolute top-0 right-0 h-full w-px bg-foreground/40" />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground">Updated {sensor.updatedAt}</div>
        </div>
      </div>
    </div>
  );
}