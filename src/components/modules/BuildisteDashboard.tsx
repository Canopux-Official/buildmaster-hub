import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, tasks, notifications, teamMembers } from "@/data/buildsite";
import type { Task, TaskStatus } from "@/data/buildsite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, DollarSign, Users, CheckCircle2, MapPin, Calendar, TrendingUp, AlertTriangle, Clock, User, GripVertical, X, Bell, Info, XCircle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

// ProgressRing
function ProgressRing({ progress, size = 52, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const getColor = () => progress >= 80 ? "hsl(var(--success))" : progress >= 50 ? "hsl(var(--accent))" : progress >= 25 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} stroke="hsl(var(--border))" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={getColor()} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="progress-ring" />
      </svg>
      <span className="absolute text-xs font-mono font-bold text-foreground">{progress}%</span>
    </div>
  );
}

const statusConfig = {
  "on-time": { label: "On Time", icon: TrendingUp, className: "bg-success/10 text-success" },
  "delayed": { label: "Delayed", icon: AlertTriangle, className: "bg-destructive/10 text-destructive" },
  "at-risk": { label: "At Risk", icon: Clock, className: "bg-warning/10 text-warning" },
  "completed": { label: "Completed", icon: CheckCircle2, className: "bg-info/10 text-info" },
};

const columnColors: Record<TaskStatus, string> = { "todo": "border-t-muted-foreground", "in-progress": "border-t-accent", "review": "border-t-info", "done": "border-t-success" };
const priorityBadge: Record<string, "destructive" | "default" | "secondary"> = { high: "destructive", medium: "default", low: "secondary" };
const iconMap = { warning: AlertTriangle, info: Info, success: CheckCircle2, error: XCircle };
const colorMap = { warning: "text-warning bg-warning/10 border-warning/20", info: "text-info bg-info/10 border-info/20", success: "text-success bg-success/10 border-success/20", error: "text-destructive bg-destructive/10 border-destructive/20" };

type View = "dashboard" | "timeline" | "tasks" | "notifications";

export default function BuildisteDashboard() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskList, setTaskList] = useState(tasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [notifList, setNotifList] = useState(notifications);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const totalTeam = projects.reduce((s, p) => s + p.teamSize, 0);
  const completedTasks = tasks.filter((t) => t.status === "done").length;

  const stats = [
    { label: "Active Projects", value: projects.filter((p) => p.status !== "completed").length.toString(), icon: Building2, accent: "bg-info/10 text-info" },
    { label: "Total Budget", value: `$${(totalBudget / 1e6).toFixed(0)}M`, sub: `$${(totalSpent / 1e6).toFixed(0)}M spent`, icon: DollarSign, accent: "bg-success/10 text-success" },
    { label: "Team Members", value: totalTeam.toString(), sub: "Across all projects", icon: Users, accent: "bg-accent/20 text-accent-foreground" },
    { label: "Tasks Completed", value: `${completedTasks}/${tasks.length}`, icon: CheckCircle2, accent: "bg-success/10 text-success" },
  ];

  const views: { id: View; label: string }[] = [
    { id: "dashboard", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "tasks", label: "Tasks" },
    { id: "notifications", label: "Alerts" },
  ];

  // Gantt helpers
  const filteredGanttTasks = selectedProject === "all" ? tasks : tasks.filter((t) => t.projectId === selectedProject);
  const allDates = filteredGanttTasks.flatMap((t) => [new Date(t.startDate), new Date(t.endDate)]);
  const minDate = allDates.length ? new Date(Math.min(...allDates.map((d) => d.getTime()))) : new Date();
  const maxDate = allDates.length ? new Date(Math.max(...allDates.map((d) => d.getTime()))) : new Date();
  const totalDays = Math.max(1, (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  const getBarPosition = (start: string, end: string) => {
    const s = (new Date(start).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    const e = (new Date(end).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    return { left: `${(s / totalDays) * 100}%`, width: `${((e - s) / totalDays) * 100}%` };
  };
  const months: { label: string; left: string }[] = [];
  if (allDates.length) {
    const cursor = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (cursor <= maxDate) {
      const dayOffset = (cursor.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
      months.push({ label: cursor.toLocaleDateString("en-US", { month: "short", year: "2-digit" }), left: `${(dayOffset / totalDays) * 100}%` });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }
  const priorityColors: Record<string, string> = { high: "bg-destructive", medium: "bg-accent", low: "bg-info" };

  const columns: { id: TaskStatus; label: string }[] = [
    { id: "todo", label: "To Do" }, { id: "in-progress", label: "In Progress" }, { id: "review", label: "Review" }, { id: "done", label: "Done" },
  ];

  const handleDrop = (columnId: TaskStatus) => {
    if (!draggedTask) return;
    setTaskList((prev) => prev.map((t) => (t.id === draggedTask ? { ...t, status: columnId } : t)));
    setDraggedTask(null);
  };

  const filteredKanban = taskList.filter((t) => priorityFilter === "all" || t.priority === priorityFilter);

  return (
    <div className="space-y-4">
      {/* Sub-nav */}
      <div className="flex gap-2 flex-wrap">
        {views.map((v) => (
          <button key={v.id} onClick={() => setView(v.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === v.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
          >{v.label}</button>
        ))}
      </div>

      {/* Dashboard View */}
      {view === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.accent}`}><stat.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
                    {stat.sub && <p className="text-xs text-muted-foreground">{stat.sub}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project, i) => {
              const status = statusConfig[project.status];
              const StatusIcon = status.icon;
              const budgetPercent = Math.round((project.spent / project.budget) * 100);
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }} className="glass-card rounded-xl p-5 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <ProgressRing progress={project.progress} />
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                    <StatusIcon className="h-3 w-3" />{status.label}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{project.location}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" />{project.teamSize} members</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{new Date(project.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs mb-1.5"><span className="text-muted-foreground">Budget Used</span><span className="font-mono font-medium">{budgetPercent}%</span></div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${budgetPercent}%` }} transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                        className={`h-full rounded-full ${budgetPercent > 90 ? "bg-destructive" : budgetPercent > 75 ? "bg-warning" : "bg-accent"}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline / Gantt */}
      {view === "timeline" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Project Timeline</h2>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[220px]"><SelectValue placeholder="Filter by project" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((p) => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="relative h-8 bg-muted border-b border-border">
              {months.map((m, i) => (<div key={i} className="absolute top-0 h-full border-l border-border/50 px-2 flex items-center" style={{ left: m.left }}><span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{m.label}</span></div>))}
            </div>
            <div className="divide-y divide-border">
              {filteredGanttTasks.map((task, i) => {
                const project = projects.find((p) => p.id === task.projectId);
                const pos = getBarPosition(task.startDate, task.endDate);
                return (
                  <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center hover:bg-muted/30 transition-colors" onMouseEnter={() => setHoveredTask(task.id)} onMouseLeave={() => setHoveredTask(null)}>
                    <div className="w-[200px] shrink-0 px-4 py-3 border-r border-border">
                      <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{project?.name}</p>
                    </div>
                    <div className="flex-1 relative h-12 px-2">
                      <div className="absolute inset-y-2" style={pos}>
                        <motion.div className={`h-full rounded-md ${priorityColors[task.priority]} relative overflow-hidden cursor-pointer`} whileHover={{ scale: 1.02 }}>
                          <motion.div className="absolute inset-0 bg-foreground/10 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: task.progress / 100 }} transition={{ duration: 0.6, delay: i * 0.05 }} />
                          {hoveredTask === task.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-mono">
                              {task.assignee} · {task.progress}% · {task.priority}
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 px-4 py-2 bg-muted/50 border-t border-border">
              {Object.entries(priorityColors).map(([key, color]) => (<div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className={`h-2.5 w-2.5 rounded-sm ${color}`} /><span className="capitalize">{key}</span></div>))}
            </div>
          </div>
        </div>
      )}

      {/* Task Board */}
      {view === "tasks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Task Board</h2>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {columns.map((col) => {
              const colTasks = filteredKanban.filter((t) => t.status === col.id);
              return (
                <div key={col.id} className={`kanban-column border-t-2 ${columnColors[col.id]}`} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(col.id)}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                    <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-0.5 rounded-full">{colTasks.length}</span>
                  </div>
                  <div className="space-y-2">
                    {colTasks.map((task) => (
                      <motion.div key={task.id} layout draggable onDragStart={() => setDraggedTask(task.id)} onClick={() => setSelectedTask(task)}
                        className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow group">
                        <div className="flex items-start gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                            <Badge variant={priorityBadge[task.priority]} className="mt-2 text-[10px] capitalize">{task.priority}</Badge>
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"><User className="h-3 w-3" />{task.assignee}</div>
                            {task.progress > 0 && task.progress < 100 && (
                              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full bg-accent" style={{ width: `${task.progress}%` }} /></div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notifications */}
      {view === "notifications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            <Button variant="outline" size="sm" onClick={() => setNotifList((prev) => prev.map((n) => ({ ...n, read: true })))}>Mark all read</Button>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {notifList.map((notif, i) => {
                const Icon = iconMap[notif.type];
                return (
                  <motion.div key={notif.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ delay: i * 0.05 }}
                    className={`glass-card rounded-lg p-4 border-l-4 ${colorMap[notif.type]} ${!notif.read ? "ring-1 ring-ring/10" : "opacity-70"}`}
                    onClick={() => setNotifList((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n))}>
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{notif.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setNotifList((prev) => prev.filter((n) => n.id !== notif.id)); }}><X className="h-4 w-4 text-muted-foreground" /></button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Task Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="sm:max-w-[480px]">
          {selectedTask && (
            <>
              <DialogHeader><DialogTitle>{selectedTask.title}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={priorityBadge[selectedTask.priority]} className="capitalize">{selectedTask.priority} priority</Badge>
                  <ProgressRing progress={selectedTask.progress} size={48} strokeWidth={4} />
                </div>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" />{selectedTask.assignee}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Flag className="h-4 w-4" />{projects.find((p) => p.id === selectedTask.projectId)?.name}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{selectedTask.startDate} – {selectedTask.endDate}</div>
                </div>
                <Progress value={selectedTask.progress} className="h-2" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
