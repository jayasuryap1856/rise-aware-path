import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/flood/Sidebar";
import { Topbar } from "@/components/flood/Topbar";
import { Ticker } from "@/components/flood/Ticker";
import { AlertBanner } from "@/components/flood/AlertBanner";
import { SensorCard } from "@/components/flood/SensorCard";
import { FloodMap } from "@/components/flood/FloodMap";
import { WeatherPanel } from "@/components/flood/WeatherPanel";
import { SafeZoneCard } from "@/components/flood/SafeZoneCard";
import { RouteList } from "@/components/flood/RouteList";
import { NotificationFeed } from "@/components/flood/NotificationFeed";
import { alerts, sensors, safeZones, evacRoutes, weather } from "@/components/flood/data";
import { ArrowUpRight, Layers, Phone, ShieldCheck, Siren, Users, Waves } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TideWatch — Real-time Flood Early Warning System" },
      {
        name: "description",
        content:
          "Live flood alerts, water-level sensor data, evacuation routes, and safe zones — built to help communities respond faster.",
      },
      { property: "og:title", content: "TideWatch — Flood Early Warning" },
      { property: "og:description", content: "Real-time flood monitoring, alerts, evacuation routes and safe zones." },
    ],
  }),
  component: Index,
});

function Index() {
  const critical = alerts[0];
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <Ticker />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Hero stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard icon={Siren} label="Active alerts" value="3" delta="+1 last hr" tone="danger" />
            <KpiCard icon={Waves} label="Sensors online" value="12 / 12" delta="100% uptime" tone="safe" />
            <KpiCard icon={ShieldCheck} label="Safe zones" value="14" delta="2,840 spaces" />
            <KpiCard icon={Users} label="People notified" value="12.4K" delta="+812 / min" tone="warn" />
          </section>

          {/* Critical alert banner */}
          <AlertBanner alert={critical} />

          {/* Map + Weather */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <FloodMap />
            </div>
            <div>
              <WeatherPanel data={weather} />
            </div>
          </section>

          {/* Sensors */}
          <section>
            <SectionHeader
              eyebrow="Telemetry"
              title="Water-level sensor network"
              cta="View all sensors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
              {sensors.map((s) => (
                <SensorCard key={s.id} sensor={s} />
              ))}
            </div>
          </section>

          {/* Safe zones */}
          <section>
            <SectionHeader
              eyebrow="Take shelter"
              title="Nearest safe zones"
              cta="Open directory"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
              {safeZones.map((z) => (
                <SafeZoneCard key={z.id} zone={z} />
              ))}
            </div>
          </section>

          {/* Routes + Notifications + Other alerts */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 space-y-4">
              <div>
                <SectionHeader
                  eyebrow="Evacuation"
                  title="Recommended routes & road status"
                  cta="Live traffic"
                />
                <div className="mt-4">
                  <RouteList routes={evacRoutes} />
                </div>
              </div>

              <div>
                <SectionHeader eyebrow="Active warnings" title="Alert history" />
                <div className="mt-4 space-y-2">
                  {alerts.slice(1).map((a) => (
                    <div
                      key={a.id}
                      className="rounded-xl glass p-4 flex gap-3 items-start"
                    >
                      <div
                        className={
                          "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 " +
                          (a.level === "warn"
                            ? "bg-warn/20 text-warn"
                            : "bg-foam/20 text-foam")
                        }
                      >
                        <Layers className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-semibold">{a.title}</h4>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {a.area}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{a.message}</p>
                        <div className="text-[10px] text-muted-foreground mt-1.5">
                          {a.issuedAt} · {a.validUntil}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <NotificationFeed />
            </div>
          </section>

          {/* Preparedness */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <PrepCard
              step="01"
              title="Build a go-bag"
              body="Water (3L/person/day), non-perishables, flashlight, batteries, medications, ID, cash, charger."
            />
            <PrepCard
              step="02"
              title="Know your route"
              body="Identify two evacuation routes from home, work, and school. Avoid low bridges, underpasses, and creek crossings."
            />
            <PrepCard
              step="03"
              title="Stay informed"
              body="Enable push & SMS alerts. Charge devices. Tune to NOAA Weather Radio 162.475 MHz when power is out."
            />
          </section>

          {/* Emergency strip */}
          <section className="relative overflow-hidden rounded-2xl glass p-5 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-danger/15 via-warn/10 to-transparent" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-danger/20 text-danger flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">In an emergency</div>
                  <h3 className="font-display text-xl font-bold">Call 911 immediately if life is in danger</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    For non-life-threatening flood reports, contact Cedar Valley Emergency Mgmt at (555) 010-0911.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-danger px-5 py-2.5 text-sm font-semibold text-white hover:bg-danger/90">
                  Call 911
                </button>
                <button className="rounded-lg bg-secondary/60 px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                  Report flooding
                </button>
              </div>
            </div>
          </section>

          <footer className="pt-4 pb-2 text-center text-xs text-muted-foreground">
            TideWatch · Built on open weather + hydrology data · This is a demonstration interface
          </footer>
        </main>
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: typeof Siren;
  label: string;
  value: string;
  delta: string;
  tone?: "danger" | "warn" | "safe";
}) {
  const toneRing =
    tone === "danger"
      ? "from-danger/30"
      : tone === "warn"
      ? "from-warn/25"
      : tone === "safe"
      ? "from-safe/25"
      : "from-foam/20";
  const toneText =
    tone === "danger"
      ? "text-danger"
      : tone === "warn"
      ? "text-warn"
      : tone === "safe"
      ? "text-safe"
      : "text-foam";
  return (
    <div className="relative overflow-hidden rounded-2xl glass p-4">
      <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${toneRing} to-transparent blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="font-display text-3xl font-bold mt-1.5 tabular-nums">{value}</div>
          <div className={`text-[11px] mt-1 ${toneText}`}>{delta}</div>
        </div>
        <div className={`h-9 w-9 rounded-xl bg-secondary/50 flex items-center justify-center ${toneText}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, cta }: { eyebrow: string; title: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-foam">{eyebrow}</div>
        <h2 className="font-display text-2xl font-bold mt-1">{title}</h2>
      </div>
      {cta && (
        <button className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foam transition">
          {cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function PrepCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl glass p-5 hover:border-foam/30 transition">
      <div className="font-display text-4xl font-bold text-foam/40 leading-none">{step}</div>
      <h4 className="font-display text-lg font-bold mt-3">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}
