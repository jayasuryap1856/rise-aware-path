import { AlertTriangle, Bell, Volume2 } from "lucide-react";
import type { AlertItem } from "./data";

export function AlertBanner({ alert }: { alert: AlertItem }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-danger/40 glow-danger">
      <div className="absolute inset-0 bg-gradient-to-r from-danger/30 via-danger/10 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1 bg-danger" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4 p-5 pl-7">
        <div className="flex items-start gap-4 flex-1">
          <div className="relative shrink-0">
            <div className="h-12 w-12 rounded-xl bg-danger/20 flex items-center justify-center text-danger">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <span className="absolute inset-0 rounded-xl pulse-ring text-danger" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-danger text-white px-2 py-0.5 rounded">
                {alert.level === "danger" ? "Critical" : alert.level}
              </span>
              <h3 className="font-display text-lg font-bold">{alert.title}</h3>
              <span className="text-xs text-muted-foreground">· {alert.area}</span>
            </div>
            <p className="mt-1 text-sm text-foreground/90 leading-relaxed">{alert.message}</p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>Issued {alert.issuedAt}</span>
              <span>·</span>
              <span>{alert.validUntil}</span>
            </div>
          </div>
        </div>
        <div className="flex md:flex-col gap-2 md:w-auto">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-danger text-white px-4 py-2.5 text-sm font-semibold hover:bg-danger/90 transition">
            <Volume2 className="h-4 w-4" />
            Broadcast
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-secondary/60 px-4 py-2.5 text-sm font-medium hover:bg-secondary transition">
            <Bell className="h-4 w-4" />
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}