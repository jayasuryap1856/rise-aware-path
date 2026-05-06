import { Building2, Heart, Home, MapPin, Navigation2, School, Users } from "lucide-react";
import type { SafeZone } from "./data";

const iconByType: Record<SafeZone["type"], typeof Building2> = {
  Hospital: Heart,
  School: School,
  Shelter: Home,
  "Community Center": Building2,
};

export function SafeZoneCard({ zone }: { zone: SafeZone }) {
  const Icon = iconByType[zone.type];
  const fillPct = (zone.occupancy / zone.capacity) * 100;
  return (
    <div className="group relative rounded-2xl glass p-4 hover:border-foam/40 transition-all">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-accent/20 text-foam flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display font-semibold text-sm truncate">{zone.name}</h4>
            <span className="text-[10px] text-foam shrink-0">{zone.type}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
            <MapPin className="h-3 w-3" />
            {zone.address}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat value={`${zone.distanceKm}`} unit="km" label="Distance" />
        <Stat value={`${zone.etaMin}`} unit="min" label="ETA" />
        <Stat value={`${zone.elevation}`} unit="m" label="Elevation" />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            Occupancy
          </span>
          <span className="tabular-nums">
            {zone.occupancy} / {zone.capacity}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-safe to-foam"
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-foam text-primary-foreground py-2 text-xs font-semibold hover:bg-foam/90 transition">
        <Navigation2 className="h-3.5 w-3.5" />
        Navigate
      </button>
    </div>
  );
}

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 py-2">
      <div className="font-display font-bold text-base tabular-nums leading-none">
        {value}
        <span className="text-[10px] text-muted-foreground ml-0.5">{unit}</span>
      </div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
    </div>
  );
}