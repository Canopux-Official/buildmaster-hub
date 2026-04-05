import { useState } from "react";
import { projects, updates, messages, documents, notifications as initialNotifs, chartData } from "@/data/buildVue";
import type { Message, BVNotification } from "@/data/buildVue";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, User, TrendingUp, CheckCircle2, Clock, PauseCircle, Camera, Flag, RefreshCw, AlertTriangle, Send, Paperclip, Phone, Video, MoreVertical, FileText, Image, Shield, ClipboardList, Download, Eye, Search, Check, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const statusConfig = {
  "in-progress": { label: "In Progress", icon: TrendingUp, className: "bg-info/10 text-info" },
  completed: { label: "Completed", icon: CheckCircle2, className: "bg-success/10 text-success" },
  planning: { label: "Planning", icon: Clock, className: "bg-warning/10 text-warning" },
  "on-hold": { label: "On Hold", icon: PauseCircle, className: "bg-muted text-muted-foreground" },
};
const updateTypeConfig = {
  photo: { icon: Camera, color: "bg-info/10 text-info", accent: "border-l-info" },
  milestone: { icon: Flag, color: "bg-success/10 text-success", accent: "border-l-success" },
  update: { icon: RefreshCw, color: "bg-primary/10 text-primary", accent: "border-l-primary" },
  alert: { icon: AlertTriangle, color: "bg-warning/10 text-warning", accent: "border-l-warning" },
};
const docTypeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  blueprint: { icon: ClipboardList, color: "text-primary", bg: "bg-primary/10" },
  permit: { icon: Shield, color: "text-success", bg: "bg-success/10" },
  report: { icon: FileText, color: "text-info", bg: "bg-info/10" },
  contract: { icon: FileText, color: "text-warning", bg: "bg-warning/10" },
  photo: { icon: Image, color: "text-accent", bg: "bg-accent/10" },
};
const notifIcons: Record<string, any> = { milestone: Flag, message: Phone, update: RefreshCw, alert: AlertTriangle };
const notifColors: Record<string, string> = { milestone: "bg-success/10 text-success", message: "bg-primary/10 text-primary", update: "bg-info/10 text-info", alert: "bg-warning/10 text-warning" };

type Tab = "dashboard" | "updates" | "messages" | "documents" | "analytics" | "notifications";

export default function BuildVuePortal() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [msgs, setMsgs] = useState<Message[]>(messages);
  const [input, setInput] = useState("");
  const [docFilter, setDocFilter] = useState("all");
  const [docSearch, setDocSearch] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [notifs, setNotifs] = useState<BVNotification[]>(initialNotifs);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: `msg-${Date.now()}`, sender: "You", senderRole: "Client", content: input.trim(), timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), isOwn: true, avatar: "YO" };
    setMsgs((prev) => [...prev, newMsg]); setInput("");
    setTimeout(() => { setMsgs((prev) => [...prev, { id: `msg-${Date.now()}`, sender: "Michael Chen", senderRole: "Project Manager", content: "Thanks for your message! I'll get back to you shortly.", timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), isOwn: false, avatar: "MC" }]); }, 1500);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" }, { id: "updates", label: "Updates" }, { id: "messages", label: "Messages" },
    { id: "documents", label: "Documents" }, { id: "analytics", label: "Analytics" }, { id: "notifications", label: "Notifications" },
  ];

  const filteredDocs = documents.filter((d) => (docFilter === "all" || d.type === docFilter) && d.name.toLowerCase().includes(docSearch.toLowerCase()));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{t.label}{t.id === "notifications" && unreadCount > 0 && <span className="ml-1.5 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>}</button>))}
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl h-48 gradient-hero">
            <div className="relative flex items-end justify-between h-full p-6">
              <div><h1 className="text-2xl font-bold text-primary-foreground">Welcome back, Alex</h1><p className="text-sm text-primary-foreground/70 mt-1">3 active projects · 2 unread messages</p></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, i) => {
              const status = statusConfig[project.status]; const StatusIcon = status.icon;
              const completedMilestones = project.milestones.filter((m) => m.completed).length;
              return (
                <div key={project.id} className="group rounded-xl border border-border bg-card p-5 card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-4"><div><h3 className="text-base font-semibold group-hover:text-primary transition-colors">{project.name}</h3><p className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="h-3 w-3" />{project.location}</p></div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}><StatusIcon className="h-3 w-3" />{status.label}</span></div>
                  <div className="mb-4"><div className="flex items-center justify-between mb-1.5"><span className="text-xs font-medium text-muted-foreground">Progress</span><span className="text-sm font-bold">{project.progress}%</span></div><Progress value={project.progress} className="h-2" /></div>
                  <div className="flex items-center gap-1 mb-4 flex-wrap">{project.milestones.map((m) => (<div key={m.id} title={m.title} className={`h-2 flex-1 rounded-full ${m.completed ? "bg-success" : "bg-border"}`} />))}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3"><span className="flex items-center gap-1"><User className="h-3 w-3" />{project.manager}</span><span>{project.budget}</span></div>
                  <div className="mt-3 text-xs text-muted-foreground">{completedMilestones}/{project.milestones.length} milestones complete</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "updates" && (
        <div className="space-y-4"><h2 className="text-lg font-semibold">Project Updates</h2>
          <div className="relative space-y-4"><div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            {updates.map((update) => { const config = updateTypeConfig[update.type]; const Icon = config.icon; return (
              <div key={update.id} className={`relative ml-10 rounded-xl border border-border ${config.accent} border-l-4 bg-card p-4 card-shadow`}>
                <div className={`absolute -left-[2.85rem] top-4 flex h-8 w-8 items-center justify-center rounded-full ${config.color} ring-4 ring-background`}><Icon className="h-4 w-4" /></div>
                <div className="flex items-start justify-between mb-2"><div><span className="text-xs font-medium text-muted-foreground">{update.projectName}</span><h3 className="text-sm font-semibold mt-0.5">{update.title}</h3></div><span className="text-xs text-muted-foreground ml-2">{update.date}</span></div>
                <p className="text-sm text-muted-foreground">{update.description}</p><div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground"><User className="h-3 w-3" />{update.author}</div>
              </div>
            ); })}
          </div>
        </div>
      )}

      {activeTab === "messages" && (
        <div className="flex flex-col h-[600px] rounded-xl border border-border bg-card card-shadow overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border gradient-hero">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">MC</div><div><h3 className="text-sm font-semibold text-primary-foreground">Michael Chen</h3><p className="text-xs text-primary-foreground/60">Project Manager · Riverside Tower</p></div></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2 max-w-[75%] ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                  {!msg.isOwn && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{msg.avatar}</div>}
                  <div className={`rounded-2xl px-4 py-2.5 text-sm ${msg.isOwn ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>{msg.content}<div className={`text-[10px] mt-1 ${msg.isOwn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.timestamp}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted"><Paperclip className="h-4 w-4" /></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message..." className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button onClick={send} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3"><h2 className="text-lg font-semibold">Documents & Media</h2>
            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input value={docSearch} onChange={(e) => setDocSearch(e.target.value)} placeholder="Search documents..." className="rounded-lg border border-input bg-background pl-8 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring w-60" /></div>
          </div>
          <div className="flex gap-2 flex-wrap">{["all", "blueprint", "permit", "report", "contract"].map((t) => (<button key={t} onClick={() => setDocFilter(t)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${docFilter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>))}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredDocs.map((doc) => { const config = docTypeConfig[doc.type]; const Icon = config.icon; return (
              <div key={doc.id} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-shadow hover:elevated-shadow transition-all">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg}`}><Icon className={`h-5 w-5 ${config.color}`} /></div>
                <div className="flex-1 min-w-0"><h4 className="text-sm font-medium truncate">{doc.name}</h4><p className="text-xs text-muted-foreground">{doc.project} · {doc.date} · {doc.size}</p></div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => setPreview(doc.name)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Eye className="h-4 w-4" /></button><button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Download className="h-4 w-4" /></button></div>
              </div>
            ); })}
          </div>
          <Dialog open={!!preview} onOpenChange={() => setPreview(null)}><DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{preview}</DialogTitle></DialogHeader><div className="flex items-center justify-center h-64 rounded-lg bg-muted"><p className="text-sm text-muted-foreground">Document preview would appear here</p></div></DialogContent></Dialog>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6"><h2 className="text-lg font-semibold">Analytics & Insights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: "Active Projects", value: "3" }, { label: "Avg. Progress", value: "55%" }, { label: "Total Budget", value: "$29.4M" }, { label: "Milestones Hit", value: "9/16" }].map((stat, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 card-shadow"><p className="text-xs font-medium text-muted-foreground">{stat.label}</p><p className="text-2xl font-bold mt-1">{stat.value}</p></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border bg-card p-5 card-shadow"><h3 className="text-sm font-semibold mb-4">Progress Over Time</h3>
              <ResponsiveContainer width="100%" height={250}><AreaChart data={chartData.monthly}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Area type="monotone" dataKey="planned" stroke="hsl(215, 10%, 70%)" fill="hsl(215, 10%, 90%)" strokeDasharray="5 5" /><Area type="monotone" dataKey="actual" stroke="hsl(215, 70%, 40%)" fill="hsl(215, 70%, 40%, 0.15)" strokeWidth={2} /></AreaChart></ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 card-shadow"><h3 className="text-sm font-semibold mb-4">Budget Allocation</h3>
              <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={chartData.budgetAllocation} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">{chartData.budgetAllocation.map((e, i) => <Cell key={i} fill={e.fill} />)}</Pie><Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} /><Tooltip /></PieChart></ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 card-shadow"><h3 className="text-sm font-semibold mb-4">All Projects Completion</h3>
            <div className="space-y-4">{projects.map((p) => (<div key={p.id}><div className="flex items-center justify-between mb-1.5"><span className="text-sm font-medium">{p.name}</span><span className="text-sm font-bold">{p.progress}%</span></div><Progress value={p.progress} className="h-2.5" /></div>))}</div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Notifications {unreadCount > 0 && <span className="ml-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>}</h2>
            {unreadCount > 0 && <button onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))} className="text-xs font-medium text-primary hover:underline">Mark all as read</button>}
          </div>
          <div className="space-y-2">
            {notifs.map((notif) => { const Icon = notifIcons[notif.type]; return (
              <div key={notif.id} className={`flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer ${notif.read ? "border-border bg-card card-shadow" : "border-primary/20 bg-primary/[0.03] elevated-shadow"}`} onClick={() => setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n))}>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notifColors[notif.type]}`}><Icon className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><h4 className="text-sm font-medium">{notif.title}</h4>{!notif.read && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}</div><p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p><p className="text-xs text-muted-foreground/60 mt-1">{notif.time}</p></div>
                {!notif.read && <button onClick={(e) => { e.stopPropagation(); setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n)); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Check className="h-4 w-4" /></button>}
              </div>
            ); })}
          </div>
        </div>
      )}
    </div>
  );
}
