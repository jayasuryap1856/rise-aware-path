import { cn } from "@/lib/utils";
import { CloudRain, Droplets, Eye, Gauge, Wind } from "lucide-react";
import type { WeatherSnapshot } from "./data";

export function WeatherPanel({ data }: { data: WeatherSnapshot }) {
  const maxRain = Math.max(...data.forecast.map((f) => f.rainMm), 1);
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Live weather</div>
          <h3 className="font-display text-xl font-bold mt-1">{data.location}</h3>
        </div>
        <div className="text-right">
          <div className="font-display text-4xl font-bold tabular-nums">{data.tempC}°</div>
          <div className="text-xs text-muted-foreground">{data.conditions}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Metric icon={CloudRain} label="Rain (1h)" value={`${data.rainfallMm}`} unit="mm" tone="warn" />
        <Metric icon={Droplets} label="Rain 24h" value={`${data.rainfall24hMm}`} unit="mm" tone="danger" />
        <Metric icon={Wind} label="Wind" value={`${data.windKph}`} unit={`kph ${data.windDir}`} />
        <Metric icon={Gauge} label="Pressure" value={`${data.pressureHpa}`} unit="hPa" />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold">8-hour rainfall forecast</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Eye className="h-3 w-3" /> Visibility {data.visibilityKm} km
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {data.forecast.map((f) => {
            const h = (f.rainMm / maxRain) * 100;
            return (
              <div key={f.time} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="text-[10px] tabular-nums text-muted-foreground">{f.rainMm}mm</div>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-all",
                      f.risk === "danger"
                        ? "bg-gradient-to-t from-danger to-warn"
                        : f.risk === "warn"
                        ? "bg-gradient-to-t from-warn to-foam"
                        : f.risk === "watch"
                        ? "bg-gradient-to-t from-foam to-accent"
                        : "bg-gradient-to-t from-safe/60 to-safe",
                    )}
                    style={{ height: `${Math.max(h, 6)}%` }}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground">{f.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  unit,
  tone,
}: {
  icon: typeof CloudRain;
  label: string;
  value: string;
  unit: string;
  tone?: "warn" | "danger";
}) {
  return (
    <div className="rounded-xl bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className={cn("h-3 w-3", tone === "danger" && "text-danger", tone === "warn" && "text-warn")} />
        {label}
      </div>
      <div className="mt-1.5 font-display text-lg font-bold tabular-nums">
        {value}
        <span className="text-[10px] text-muted-foreground ml-1 font-normal">{unit}</span>
      </div>
    </div>
  );
}