import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, HardHat, Clock, MapPin } from "lucide-react";
import { useState } from "react";

const crewMembers = [
  { name: "Carlos Martinez", role: "Foreman", site: "Riverside Towers", status: "On Site", hours: "7.5h" },
  { name: "Emily Watson", role: "Electrician", site: "Metro Plaza", status: "On Site", hours: "6h" },
  { name: "David Kim", role: "Welder", site: "Harbor View", status: "Break", hours: "5h" },
  { name: "Sarah Johnson", role: "Plumber", site: "Riverside Towers", status: "On Site", hours: "7h" },
  { name: "Marco Rossi", role: "Crane Operator", site: "Sunset Mall", status: "Off Site", hours: "0h" },
  { name: "Aisha Patel", role: "Safety Inspector", site: "All Sites", status: "In Transit", hours: "3h" },
];

const statusStyle = (s: string) =>
  s === "On Site" ? "bg-accent/15 text-accent border-accent/30" :
  s === "Break" ? "bg-chart-4/15 text-chart-4 border-chart-4/30" :
  s === "In Transit" ? "bg-chart-5/15 text-chart-5 border-chart-5/30" :
  "bg-muted text-muted-foreground";

const summaryStats = [
  { label: "Total Crew", value: "148", icon: Users },
  { label: "On Site Today", value: "112", icon: HardHat },
  { label: "Avg Hours", value: "7.2h", icon: Clock },
  { label: "Active Sites", value: "5", icon: MapPin },
];

export default function SiteCrewDashboard() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    Object.fromEntries(crewMembers.map((c) => [c.name, c.status === "On Site" || c.status === "Break"]))
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <Card key={s.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Crew Assignment</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {crewMembers.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-4 rounded-xl border hover:shadow-md transition-all hover:-translate-y-0.5">
                <Avatar className="h-10 w-10 bg-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.role} · {c.site}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className={statusStyle(c.status)}>{c.status}</Badge>
                  <span className="text-xs text-muted-foreground">{c.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Today's Attendance</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {crewMembers.map((c) => (
              <label key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={attendance[c.name]}
                  onChange={() => setAttendance((prev) => ({ ...prev, [c.name]: !prev[c.name] }))}
                  className="w-4 h-4 rounded border-muted-foreground/30 text-primary focus:ring-primary"
                />
                <span className="font-medium">{c.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{c.role}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
