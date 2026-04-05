import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wrench, Truck, Thermometer, Wind, Droplets, Gauge, ShieldCheck, Zap } from "lucide-react";

const tools = [
  { name: "Equipment Tracker", desc: "Monitor heavy machinery location & status", icon: Truck, status: "Active" },
  { name: "Safety Checklist", desc: "Daily safety inspection tools", icon: ShieldCheck, status: "Active" },
  { name: "Material Calculator", desc: "Estimate material quantities & costs", icon: Gauge, status: "Active" },
  { name: "Power Monitor", desc: "Track on-site power consumption", icon: Zap, status: "Maintenance" },
];

const siteConditions = [
  { label: "Temperature", value: "24°C", icon: Thermometer, status: "Normal" },
  { label: "Wind Speed", value: "12 km/h", icon: Wind, status: "Normal" },
  { label: "Humidity", value: "68%", icon: Droplets, status: "Moderate" },
];

const equipment = [
  { name: "Crane #1", utilization: 82, location: "Zone A", status: "Operating" },
  { name: "Excavator #3", utilization: 45, location: "Zone C", status: "Idle" },
  { name: "Concrete Mixer #2", utilization: 91, location: "Zone B", status: "Operating" },
  { name: "Forklift #5", utilization: 0, location: "Depot", status: "Maintenance" },
];

const equipStatusColor = (s: string) =>
  s === "Operating" ? "bg-accent/15 text-accent" : s === "Idle" ? "bg-chart-4/15 text-chart-4" : "bg-destructive/15 text-destructive";

export default function BuildVuePortal() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {siteConditions.map((c) => (
          <Card key={c.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-chart-5/10">
                <c.icon className="h-6 w-6 text-chart-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label} · {c.status}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Project Tools</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {tools.map((t) => (
              <div key={t.name} className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Badge variant={t.status === "Active" ? "default" : "secondary"}>{t.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Equipment Status</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {equipment.map((e) => (
              <div key={e.name} className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.location}</p>
                  </div>
                  <Badge className={equipStatusColor(e.status)}>{e.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={e.utilization} className="h-2 flex-1" />
                  <span className="text-xs font-medium w-8">{e.utilization}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
