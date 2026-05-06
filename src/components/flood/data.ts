export type RiskLevel = "safe" | "watch" | "warn" | "danger";

export interface Sensor {
  id: string;
  name: string;
  river: string;
  level: number; // meters
  threshold: number; // danger threshold meters
  trend: number; // cm / 15min
  history: number[];
  status: RiskLevel;
  updatedAt: string;
}

export interface SafeZone {
  id: string;
  name: string;
  type: "Shelter" | "Hospital" | "School" | "Community Center";
  capacity: number;
  occupancy: number;
  distanceKm: number;
  etaMin: number;
  elevation: number;
  address: string;
}

export interface EvacRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  etaMin: number;
  status: "Open" | "Congested" | "Flooded";
  hazards: string[];
  via: string[];
}

export interface AlertItem {
  id: string;
  level: RiskLevel;
  title: string;
  message: string;
  area: string;
  issuedAt: string;
  validUntil: string;
}

export interface WeatherSnapshot {
  location: string;
  tempC: number;
  conditions: string;
  rainfallMm: number;
  rainfall24hMm: number;
  windKph: number;
  windDir: string;
  humidity: number;
  pressureHpa: number;
  visibilityKm: number;
  forecast: { time: string; rainMm: number; tempC: number; risk: RiskLevel }[];
}

const baseHistory = (start: number, drift: number) =>
  Array.from({ length: 24 }, (_, i) => +(start + drift * i + Math.sin(i / 2) * 0.15).toFixed(2));

export const sensors: Sensor[] = [
  {
    id: "s-01",
    name: "Riverside Bridge",
    river: "Cedar River",
    level: 4.82,
    threshold: 5.0,
    trend: 8,
    history: baseHistory(3.2, 0.07),
    status: "danger",
    updatedAt: "2 min ago",
  },
  {
    id: "s-02",
    name: "Mill Creek Gauge",
    river: "Mill Creek",
    level: 3.41,
    threshold: 4.5,
    trend: 4,
    history: baseHistory(2.4, 0.05),
    status: "warn",
  updatedAt: "1 min ago",
  },
  {
    id: "s-03",
    name: "Northbank Station",
    river: "Cedar River",
    level: 2.18,
    threshold: 4.0,
    trend: 1,
    history: baseHistory(1.9, 0.02),
    status: "watch",
    updatedAt: "3 min ago",
  },
  {
    id: "s-04",
    name: "Lakeview Outlet",
    river: "Lake Verda",
    level: 1.42,
    threshold: 3.6,
    trend: -1,
    history: baseHistory(1.6, -0.01),
    status: "safe",
    updatedAt: "just now",
  },
];

export const safeZones: SafeZone[] = [
  {
    id: "z-01",
    name: "Highland Community Center",
    type: "Community Center",
    capacity: 450,
    occupancy: 128,
    distanceKm: 1.4,
    etaMin: 7,
    elevation: 142,
    address: "204 Ridgeview Ave",
  },
  {
    id: "z-02",
    name: "St. Mary's Regional Hospital",
    type: "Hospital",
    capacity: 220,
    occupancy: 96,
    distanceKm: 2.9,
    etaMin: 11,
    elevation: 118,
    address: "1500 Summit Blvd",
  },
  {
    id: "z-03",
    name: "Westbrook High School",
    type: "School",
    capacity: 800,
    occupancy: 312,
    distanceKm: 3.6,
    etaMin: 14,
    elevation: 108,
    address: "88 Westbrook Pkwy",
  },
  {
    id: "z-04",
    name: "North Hills Shelter",
    type: "Shelter",
    capacity: 320,
    occupancy: 41,
    distanceKm: 5.1,
    etaMin: 18,
    elevation: 165,
    address: "12 Pine Ridge Rd",
  },
];

export const evacRoutes: EvacRoute[] = [
  {
    id: "r-01",
    from: "Downtown",
    to: "Highland Community Center",
    distanceKm: 1.4,
    etaMin: 7,
    status: "Open",
    hazards: [],
    via: ["Main St", "Ridgeview Ave"],
  },
  {
    id: "r-02",
    from: "Riverside",
    to: "St. Mary's Hospital",
    distanceKm: 3.2,
    etaMin: 14,
    status: "Congested",
    hazards: ["Heavy traffic at 5th & Oak"],
    via: ["River Rd", "Summit Blvd"],
  },
  {
    id: "r-03",
    from: "Mill District",
    to: "Westbrook High School",
    distanceKm: 4.0,
    etaMin: 22,
    status: "Flooded",
    hazards: ["Low bridge under water", "Use alternate route"],
    via: ["Mill St (CLOSED)", "Bypass via Hwy 9"],
  },
  {
    id: "r-04",
    from: "Lakeview",
    to: "North Hills Shelter",
    distanceKm: 5.6,
    etaMin: 19,
    status: "Open",
    hazards: [],
    via: ["Lake Dr", "Pine Ridge Rd"],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "a-01",
    level: "danger",
    title: "Flash Flood Warning",
    message:
      "Cedar River at Riverside Bridge approaching critical level. Move to higher ground immediately. Avoid crossing bridges and underpasses.",
    area: "Downtown · Riverside · Mill District",
    issuedAt: "12 min ago",
    validUntil: "Until 11:30 PM",
  },
  {
    id: "a-02",
    level: "warn",
    title: "Flood Watch",
    message:
      "Continued heavy rainfall expected through midnight. Mill Creek levels rising steadily. Prepare go-bag and monitor alerts.",
    area: "Mill District · West End",
    issuedAt: "38 min ago",
    validUntil: "Until 06:00 AM",
  },
  {
    id: "a-03",
    level: "watch",
    title: "Severe Weather Advisory",
    message:
      "Thunderstorms producing intense rain bursts. Localized urban flooding possible in low-lying areas.",
    area: "City-wide",
    issuedAt: "1 hr ago",
    validUntil: "Until 03:00 AM",
  },
];

export const weather: WeatherSnapshot = {
  location: "Cedar Valley · Cedar County",
  tempC: 17,
  conditions: "Heavy Rain · Thunderstorms",
  rainfallMm: 42,
  rainfall24hMm: 168,
  windKph: 38,
  windDir: "SW",
  humidity: 96,
  pressureHpa: 996,
  visibilityKm: 2.4,
  forecast: [
    { time: "Now", rainMm: 12, tempC: 17, risk: "danger" },
    { time: "+1h", rainMm: 14, tempC: 17, risk: "danger" },
    { time: "+2h", rainMm: 9, tempC: 16, risk: "warn" },
    { time: "+3h", rainMm: 6, tempC: 16, risk: "warn" },
    { time: "+4h", rainMm: 4, tempC: 15, risk: "watch" },
    { time: "+5h", rainMm: 3, tempC: 15, risk: "watch" },
    { time: "+6h", rainMm: 1, tempC: 14, risk: "safe" },
    { time: "+7h", rainMm: 0, tempC: 14, risk: "safe" },
  ],
};

export const riskLabel: Record<RiskLevel, string> = {
  safe: "Safe",
  watch: "Watch",
  warn: "Warning",
  danger: "Danger",
};

export const riskColor: Record<RiskLevel, string> = {
  safe: "text-safe",
  watch: "text-foam",
  warn: "text-warn",
  danger: "text-danger",
};