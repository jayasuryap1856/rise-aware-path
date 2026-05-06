import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  CloudRain,
  Compass,
  LifeBuoy,
  Map,
  Radio,
  Settings,
  ShieldCheck,
  Waves,
} from "lucide-react";

const nav = [
  { icon: Activity, label: "Live Dashboard", active: true },
  { icon: AlertTriangle, label: "Active Alerts", badge: 3 },
  { icon: Waves, label: "Sensor Network" },
  { icon: CloudRain, label: "Weather" },
  { icon: Map, label: "Tactical Map" },
  { icon: Compass, label: "Evacuation" },
  { icon: ShieldCheck, label: "Safe Zones" },
  { icon: Radio, label: "Notifications" },
  { icon: LifeBuoy, label: "Emergency" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col border-r border-border/50 bg-card/40 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="relative">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-foam to-accent flex items-center justify-center shadow-lg shadow-accent/30">
            <Waves className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-danger animate-pulse" />
        </div>
        <div>
          <div className="font-display text-base font-bold leading-none">TIDEWATCH</div>
          <div className="text-[10px] text-muted-foreground tracking-widest mt-0.5">EARLY WARNING SYSTEM</div>
        </div>
      </div>

      <nav className="px-3 mt-2 space-y-1">
        {nav.map((item) => (
          <button
            key={item.label}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              item.active
                ? "bg-accent/20 text-foreground border border-accent/30"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
            )}
          >
            <item.icon className={cn("h-4 w-4", item.active && "text-foam")} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="rounded-md bg-danger/20 text-danger text-[10px] px-1.5 py-0.5 font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 space-y-3">
        <div className="rounded-xl glass p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-safe animate-pulse" />
            <div className="text-xs font-semibold">System Online</div>
          </div>
          <div className="text-[10px] text-muted-foreground leading-relaxed">
            12 sensors · 4 stations · 99.8% uptime
          </div>
        </div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}