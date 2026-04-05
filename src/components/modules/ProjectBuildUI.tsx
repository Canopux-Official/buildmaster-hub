import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Flag, User } from "lucide-react";
import { useState } from "react";

const phases = [
  { name: "Foundation", start: "Jan 5", end: "Feb 20", progress: 100, status: "Complete" },
  { name: "Structural Framing", start: "Feb 21", end: "Apr 15", progress: 85, status: "In Progress" },
  { name: "Electrical & Plumbing", start: "Apr 1", end: "May 30", progress: 40, status: "In Progress" },
  { name: "Interior Finishing", start: "Jun 1", end: "Aug 15", progress: 0, status: "Upcoming" },
  { name: "Final Inspection", start: "Aug 16", end: "Sep 1", progress: 0, status: "Upcoming" },
];

const tasks = [
  { title: "Pour concrete slab B3", assignee: "Mike R.", due: "Mar 28", priority: "High", done: false },
  { title: "Install HVAC ductwork — Floor 2", assignee: "Team Delta", due: "Apr 2", priority: "Medium", done: false },
  { title: "Weld steel columns — Section A", assignee: "Carlos M.", due: "Mar 25", priority: "High", done: true },
  { title: "Inspect fire exits", assignee: "Safety Team", due: "Apr 5", priority: "Low", done: false },
  { title: "Order drywall shipment", assignee: "Procurement", due: "Mar 30", priority: "Medium", done: true },
];

const priorityColor = (p: string) =>
  p === "High" ? "bg-destructive/10 text-destructive border-destructive/20" : p === "Medium" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground";

export default function ProjectBuildUI() {
  const [taskList, setTaskList] = useState(tasks);
  const toggle = (i: number) => setTaskList((prev) => prev.map((t, idx) => (idx === i ? { ...t, done: !t.done } : t)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Project Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((p) => (
              <div key={p.name} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="sm:w-48 font-medium">{p.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground sm:w-36">
                  <Clock className="h-3 w-3" /> {p.start} — {p.end}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Progress value={p.progress} className="h-2.5 flex-1" />
                  <span className="text-xs font-medium w-8">{p.progress}%</span>
                </div>
                <Badge variant={p.status === "Complete" ? "default" : "secondary"} className="w-fit">{p.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Active Tasks</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {taskList.map((t, i) => (
              <div key={i}
                onClick={() => toggle(i)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${t.done ? "opacity-60" : ""}`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${t.done ? "bg-accent border-accent" : "border-muted-foreground/30"}`}>
                  {t.done && <span className="text-accent-foreground text-xs">✓</span>}
                </div>
                <span className={`flex-1 font-medium ${t.done ? "line-through" : ""}`}>{t.title}</span>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" /> {t.assignee}
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {t.due}
                </div>
                <Badge variant="outline" className={priorityColor(t.priority)}>
                  <Flag className="h-3 w-3 mr-1" />{t.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
