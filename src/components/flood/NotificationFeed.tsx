import { cn } from "@/lib/utils";
import { Bell, MessageSquare, Phone, Smartphone } from "lucide-react";

const notifications = [
  {
    icon: Smartphone,
    channel: "Push",
    target: "NDMA Sachet · 12,482 devices",
    message: "IMD Red Alert issued for Mumbai metropolitan region.",
    time: "2 min ago",
    status: "delivered" as const,
  },
  {
    icon: MessageSquare,
    channel: "SMS",
    target: "Kurla & Sion zone · 3,210 numbers",
    message: "Move to higher ground. Avoid LBS Marg underpass and railway tracks.",
    time: "4 min ago",
    status: "delivered" as const,
  },
  {
    icon: Phone,
    channel: "Voice call",
    target: "Senior citizens list · 184",
    message: "Automated wellness check dispatched.",
    time: "6 min ago",
    status: "in-progress" as const,
  },
  {
    icon: Bell,
    channel: "Email",
    target: "BMC subscribers · 8,940",
    message: "Updated evacuation routes & shelter list available.",
    time: "12 min ago",
    status: "delivered" as const,
  },
];

export function NotificationFeed() {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Real-time</div>
          <h3 className="font-display text-base font-bold mt-0.5">Notifications dispatched</h3>
        </div>
        <span className="text-xs text-foam">24,816 alerts today</span>
      </div>
      <ul className="space-y-2.5">
        {notifications.map((n, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl bg-secondary/30 p-3 hover:bg-secondary/50 transition"
          >
            <div className="h-9 w-9 rounded-lg bg-accent/20 text-foam flex items-center justify-center shrink-0">
              <n.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold">{n.channel}</span>
                <span className="text-muted-foreground truncate">{n.target}</span>
              </div>
              <div className="text-sm mt-0.5 leading-snug">{n.message}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider",
                    n.status === "delivered" ? "bg-safe/15 text-safe" : "bg-warn/15 text-warn",
                  )}
                >
                  {n.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}