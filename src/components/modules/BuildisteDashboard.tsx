import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { label: "Active Projects", value: "12", icon: Building2, change: "+2 this month" },
  { label: "Completion Rate", value: "87%", icon: TrendingUp, change: "+5% vs last quarter" },
  { label: "Open Issues", value: "23", icon: AlertTriangle, change: "3 critical" },
  { label: "Milestones Hit", value: "34", icon: CheckCircle, change: "8 this week" },
];

const projects = [
  { name: "Riverside Towers", status: "On Track", progress: 72, budget: "$2.4M", manager: "Sarah Chen" },
  { name: "Metro Plaza Office", status: "At Risk", progress: 45, budget: "$5.1M", manager: "James Park" },
  { name: "Harbor View Condos", status: "On Track", progress: 91, budget: "$3.8M", manager: "Maria Lopez" },
  { name: "Greenfield School", status: "Delayed", progress: 33, budget: "$1.2M", manager: "Tom Bradley" },
  { name: "Sunset Mall Expansion", status: "On Track", progress: 58, budget: "$7.6M", manager: "Nina Patel" },
];

const statusColor = (s: string) =>
  s === "On Track" ? "bg-accent text-accent-foreground" : s === "At Risk" ? "bg-chart-4 text-secondary" : "bg-destructive text-destructive-foreground";

export default function BuildisteDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Manager</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Progress</th>
                  <th className="pb-3 font-medium text-right">Budget</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.name} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 font-medium">{p.name}</td>
                    <td className="py-3 text-muted-foreground">{p.manager}</td>
                    <td className="py-3">
                      <Badge className={statusColor(p.status)}>{p.status}</Badge>
                    </td>
                    <td className="py-3 w-40">
                      <div className="flex items-center gap-2">
                        <Progress value={p.progress} className="h-2" />
                        <span className="text-xs text-muted-foreground w-8">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium">{p.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
