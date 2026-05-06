import { Bell, Locate, Search, Sun } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border/50 bg-background/70 backdrop-blur-xl px-4 md:px-6 py-3">
      <div className="flex items-center gap-2 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger opacity-75" />
          <span className="relative h-2 w-2 rounded-full bg-danger" />
        </span>
        <span className="font-semibold uppercase tracking-widest text-danger">Live</span>
        <span className="text-muted-foreground hidden sm:inline">· 3 active alerts in your region</span>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2 rounded-lg bg-secondary/40 border border-border/40 px-3 py-1.5 w-72">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          placeholder="Search address, sensor, route..."
          className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
        />
        <kbd className="text-[10px] text-muted-foreground bg-background/40 px-1.5 py-0.5 rounded">⌘K</kbd>
      </div>

      <button className="hidden sm:flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 text-xs hover:border-foam/40 transition">
        <Locate className="h-3.5 w-3.5 text-foam" />
        Cedar Valley
      </button>

      <button className="rounded-lg glass p-2 hover:border-foam/40 transition">
        <Sun className="h-4 w-4" />
      </button>
      <button className="relative rounded-lg glass p-2 hover:border-foam/40 transition">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger" />
      </button>

      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-tide to-foam flex items-center justify-center text-xs font-bold text-primary-foreground">
        EM
      </div>
    </header>
  );
}