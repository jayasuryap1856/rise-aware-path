import { cn } from "@/lib/utils";
import { AlertCircle, ArrowRight, Clock, Route as RouteIcon } from "lucide-react";
import type { EvacRoute } from "./data";

const statusStyles: Record<EvacRoute["status"], string> = {
  Open: "bg-safe/15 text-safe border-safe/30",
  Congested: "bg-warn/15 text-warn border-warn/30",
  Flooded: "bg-danger/15 text-danger border-danger/30",
};

export function RouteList({ routes }: { routes: EvacRoute[] }) {
  return (
    <div className="space-y-2">
      {routes.map((r) => (
        <div
          key={r.id}
          className="rounded-xl glass p-4 hover:border-foam/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{r.from}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-foam">{r.to}</span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <RouteIcon className="h-3 w-3" />
                  {r.distanceKm} km
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {r.etaMin} min
                </span>
                <span>via {r.via.join(" → ")}</span>
              </div>
            </div>
            <span
              className={cn(
                "rounded-full border text-[10px] uppercase tracking-wider font-bold px-2 py-0.5",
                statusStyles[r.status],
              )}
            >
              {r.status}
            </span>
          </div>
          {r.hazards.length > 0 && (
            <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-danger/10 px-3 py-2 text-[11px] text-danger">
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <div>{r.hazards.join(" · ")}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}