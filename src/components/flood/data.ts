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
    name: "Howrah Bridge Gauge",
    river: "Hooghly (Ganga)",
    level: 4.82,
    threshold: 5.0,
    trend: 8,
    history: baseHistory(3.2, 0.07),
    status: "danger",
    updatedAt: "2 min ago",
  },
  {
    id: "s-02",
    name: "Yamuna Old Railway Bridge",
    river: "Yamuna",
    level: 3.41,
    threshold: 4.5,
    trend: 4,
    history: baseHistory(2.4, 0.05),
    status: "warn",
  updatedAt: "1 min ago",
  },
  {
    id: "s-03",
    name: "Mithi River — Kurla",
    river: "Mithi",
    level: 2.18,
    threshold: 4.0,
    trend: 1,
    history: baseHistory(1.9, 0.02),
    status: "watch",
    updatedAt: "3 min ago",
  },
  {
    id: "s-04",
    name: "Adyar Estuary Station",
    river: "Adyar",
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
    name: "Vivekananda Municipal School",
    type: "Community Center",
    capacity: 450,
    occupancy: 128,
    distanceKm: 1.4,
    etaMin: 7,
    elevation: 142,
    address: "Sector 12, Salt Lake, Kolkata",
  },
  {
    id: "z-02",
    name: "AIIMS Trauma Centre",
    type: "Hospital",
    capacity: 220,
    occupancy: 96,
    distanceKm: 2.9,
    etaMin: 11,
    elevation: 118,
    address: "Sri Aurobindo Marg, New Delhi",
  },
  {
    id: "z-03",
    name: "Kendriya Vidyalaya No. 2",
    type: "School",
    capacity: 800,
    occupancy: 312,
    distanceKm: 3.6,
    etaMin: 14,
    elevation: 108,
    address: "Andheri West, Mumbai",
  },
  {
    id: "z-04",
    name: "NDRF Relief Camp — Hilltop",
    type: "Shelter",
    capacity: 320,
    occupancy: 41,
    distanceKm: 5.1,
    etaMin: 18,
    elevation: 165,
    address: "Pawai Hills, Mumbai",
  },
];

export const evacRoutes: EvacRoute[] = [
  {
    id: "r-01",
    from: "Park Street",
    to: "Vivekananda Municipal School",
    distanceKm: 1.4,
    etaMin: 7,
    status: "Open",
    hazards: [],
    via: ["AJC Bose Rd", "EM Bypass"],
  },
  {
    id: "r-02",
    from: "ITO",
    to: "AIIMS Trauma Centre",
    distanceKm: 3.2,
    etaMin: 14,
    status: "Congested",
    hazards: ["Heavy traffic at Ring Road junction"],
    via: ["Ring Road", "Aurobindo Marg"],
  },
  {
    id: "r-03",
    from: "Kurla West",
    to: "Kendriya Vidyalaya No. 2",
    distanceKm: 4.0,
    etaMin: 22,
    status: "Flooded",
    hazards: ["LBS Marg underpass submerged", "Use Western Express Hwy"],
    via: ["LBS Marg (CLOSED)", "WEH bypass"],
  },
  {
    id: "r-04",
    from: "Powai Lake",
    to: "NDRF Relief Camp — Hilltop",
    distanceKm: 5.6,
    etaMin: 19,
    status: "Open",
    hazards: [],
    via: ["JVLR", "Pawai Hill Rd"],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "a-01",
    level: "danger",
    title: "IMD Red Alert · Flash Flood Warning",
    message:
      "Hooghly at Howrah Bridge approaching danger level (5.0 m). Move to higher ground immediately. Avoid Strand Road, low-lying ghats and underpasses. NDRF teams deployed.",
    area: "Howrah · Kolkata North · Bidhannagar",
    issuedAt: "12 min ago",
    validUntil: "Valid until 23:30 IST",
  },
  {
    id: "a-02",
    level: "warn",
    title: "IMD Orange Alert · Heavy Rainfall",
    message:
      "Very heavy rainfall (115–204 mm) likely over next 12 hrs. Mithi & Yamuna rising steadily. Keep emergency kit ready. Avoid non-essential travel after 20:00 IST.",
    area: "Mumbai · Thane · NCR Delhi",
    issuedAt: "38 min ago",
    validUntil: "Valid until 06:00 IST",
  },
  {
    id: "a-03",
    level: "watch",
    title: "IMD Yellow Advisory · Thunderstorms",
    message:
      "Thunderstorms with intense rain spells expected. Urban water-logging likely in low-lying areas — Sion, Dadar, Lajpat Nagar.",
    area: "Metropolitan region",
    issuedAt: "1 hr ago",
    validUntil: "Valid until 03:00 IST",
  },
];

export const weather: WeatherSnapshot = {
  location: "Mumbai · Maharashtra (IMD Santacruz)",
  tempC: 26,
  conditions: "Heavy Rain · Active Monsoon",
  rainfallMm: 42,
  rainfall24hMm: 168,
  windKph: 38,
  windDir: "SW Monsoon",
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