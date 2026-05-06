import { cn } from "@/lib/utils";
import { MapPin, Navigation, ShieldCheck } from "lucide-react";

/**
 * Stylized SVG "live" map. Not a real geo map, but communicates
 * sensors, flood zones, evacuation routes and safe zones at a glance.
 */
export function FloodMap() {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-2xl glass">
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Map header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-card/80 to-transparent">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Live tactical map</div>
          <div className="font-display text-sm font-semibold">Cedar Valley · 5 km radius</div>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-safe animate-pulse" />
          <span className="text-muted-foreground">Updated · just now</span>
        </div>
      </div>

      <svg viewBox="0 0 800 440" className="absolute inset-0 h-full w-full">
        {/* Rivers */}
        <defs>
          <linearGradient id="river" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.12 215)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.78 0.09 195)" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="floodzone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.22 25)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 25)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="warnzone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.17 75)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.78 0.17 75)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Flood zones */}
        <ellipse cx="290" cy="240" rx="170" ry="90" fill="url(#floodzone)" />
        <ellipse cx="490" cy="200" rx="140" ry="80" fill="url(#warnzone)" />

        {/* Roads */}
        <g stroke="oklch(0.97 0.01 220)" strokeOpacity="0.08" strokeWidth="1.5" fill="none">
          <path d="M0 100 Q 200 120 400 110 T 800 130" />
          <path d="M0 320 Q 250 300 500 340 T 800 320" />
          <path d="M180 0 Q 200 220 240 440" />
          <path d="M520 0 Q 540 220 600 440" />
          <path d="M0 220 L 800 230" strokeDasharray="4 6" />
        </g>

        {/* Cedar river */}
        <path
          d="M0 260 C 150 230 250 290 380 250 S 600 200 800 240"
          stroke="url(#river)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M0 260 C 150 230 250 290 380 250 S 600 200 800 240"
          stroke="oklch(0.97 0.01 220)"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mill creek tributary */}
        <path
          d="M380 250 C 360 320 340 380 320 440"
          stroke="url(#river)"
          strokeWidth="8"
          fill="none"
          opacity="0.75"
        />

        {/* Evacuation routes */}
        <g fill="none" strokeWidth="2.5" strokeLinecap="round">
          <path d="M300 270 L 220 150" stroke="oklch(0.72 0.16 155)" strokeDasharray="2 6">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />
          </path>
          <path d="M460 250 Q 540 200 620 130" stroke="oklch(0.78 0.17 75)" strokeDasharray="2 6">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.4s" repeatCount="indefinite" />
          </path>
          <path d="M340 360 Q 480 380 660 360" stroke="oklch(0.62 0.22 25)" strokeDasharray="2 6">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Sensors */}
        <Marker x={300} y={270} color="oklch(0.62 0.22 25)" pulse label="S1" />
        <Marker x={460} y={250} color="oklch(0.78 0.17 75)" pulse label="S2" />
        <Marker x={150} y={250} color="oklch(0.78 0.09 195)" label="S3" />
        <Marker x={680} y={235} color="oklch(0.72 0.16 155)" label="S4" />

        {/* Safe zones */}
        <SafeMarker x={220} y={150} label="Highland" />
        <SafeMarker x={620} y={130} label="St. Mary's" />
        <SafeMarker x={660} y={360} label="Westbrook" />
        <SafeMarker x={120} y={90} label="N. Hills" />

        {/* Compass */}
        <g transform="translate(740, 380)" opacity="0.7">
          <circle r="22" fill="oklch(0.20 0.05 243)" stroke="oklch(0.78 0.09 195)" strokeOpacity="0.4" />
          <text x="0" y="-10" textAnchor="middle" fontSize="9" fill="oklch(0.97 0.01 220)" fontFamily="Space Grotesk">N</text>
          <path d="M0 -6 L 3 6 L 0 3 L -3 6 Z" fill="oklch(0.62 0.22 25)" />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2 text-[10px]">
        <LegendDot color="bg-danger" label="Flood zone" />
        <LegendDot color="bg-warn" label="Watch zone" />
        <LegendDot color="bg-safe" label="Safe route" />
        <LegendDot color="bg-foam" label="Sensor" />
      </div>
    </div>
  );
}

function Marker({ x, y, color, label, pulse }: { x: number; y: number; color: string; label: string; pulse?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pulse && (
        <>
          <circle r="14" fill={color} fillOpacity="0.18">
            <animate attributeName="r" values="10;26;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle r="6" fill={color} stroke="oklch(0.14 0.04 245)" strokeWidth="2" />
      <text x="10" y="4" fontSize="9" fill="oklch(0.97 0.01 220)" fontFamily="Space Grotesk">{label}</text>
    </g>
  );
}

function SafeMarker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-7" y="-7" width="14" height="14" rx="3" fill="oklch(0.20 0.05 243)" stroke="oklch(0.72 0.16 155)" strokeWidth="1.6" />
      <path d="M-3 0 L -1 2 L 3 -2" stroke="oklch(0.72 0.16 155)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="10" y="4" fontSize="9" fill="oklch(0.97 0.01 220)" fontFamily="Space Grotesk">{label}</text>
    </g>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 rounded-full glass px-2 py-1")}>
      <span className={cn("inline-block h-2 w-2 rounded-full", color)} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export const MapIcons = { MapPin, Navigation, ShieldCheck };