export type ProjectStatus = "on-time" | "delayed" | "at-risk" | "completed";
export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type UserRole = "admin" | "manager" | "engineer";

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  teamSize: number;
  location: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Notification {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const projects: Project[] = [
  { id: "p1", name: "Skyline Tower Complex", client: "Metro Developments", progress: 72, status: "on-time", startDate: "2025-03-01", endDate: "2026-09-15", budget: 45000000, spent: 32400000, teamSize: 48, location: "Downtown District" },
  { id: "p2", name: "Harbor Bridge Expansion", client: "City Infrastructure", progress: 45, status: "delayed", startDate: "2025-06-15", endDate: "2027-01-30", budget: 78000000, spent: 35100000, teamSize: 92, location: "Harbor Bay" },
  { id: "p3", name: "Green Valley Residences", client: "EcoHome Corp", progress: 88, status: "on-time", startDate: "2024-11-01", endDate: "2026-05-20", budget: 22000000, spent: 19360000, teamSize: 35, location: "Valley Heights" },
  { id: "p4", name: "Central Station Retrofit", client: "Transit Authority", progress: 31, status: "at-risk", startDate: "2025-09-01", endDate: "2027-06-30", budget: 56000000, spent: 17360000, teamSize: 67, location: "Central Hub" },
  { id: "p5", name: "Lakeside Mall Renovation", client: "Retail Partners Inc", progress: 95, status: "completed", startDate: "2024-08-01", endDate: "2026-02-28", budget: 18000000, spent: 17100000, teamSize: 28, location: "Lakeside Plaza" },
  { id: "p6", name: "Industrial Park Phase 2", client: "Apex Manufacturing", progress: 58, status: "on-time", startDate: "2025-04-01", endDate: "2027-03-15", budget: 34000000, spent: 19720000, teamSize: 41, location: "East Industrial" },
];

export const tasks: Task[] = [
  { id: "t1", projectId: "p1", title: "Foundation Inspection", description: "Complete structural inspection of north wing foundation. Check for cracks, settlement, and water damage.", status: "done", priority: "high", assignee: "Mike Chen", startDate: "2025-03-01", endDate: "2025-03-15", progress: 100 },
  { id: "t2", projectId: "p1", title: "Steel Frame Assembly - Floor 12", description: "Assemble steel framework for floors 12-15. Coordinate with crane operators.", status: "in-progress", priority: "high", assignee: "Sarah Kim", startDate: "2025-10-01", endDate: "2026-01-30", progress: 65 },
  { id: "t3", projectId: "p1", title: "Electrical Rough-In", description: "Run electrical conduit and wiring for floors 1-8.", status: "in-progress", priority: "medium", assignee: "James Wilson", startDate: "2025-08-15", endDate: "2025-12-20", progress: 40 },
  { id: "t4", projectId: "p1", title: "HVAC System Design Review", description: "Review and approve HVAC system plans for the entire building.", status: "review", priority: "medium", assignee: "Lisa Park", startDate: "2025-11-01", endDate: "2025-12-01", progress: 80 },
  { id: "t5", projectId: "p2", title: "Pile Driving - Section A", description: "Drive foundation piles for bridge support section A.", status: "in-progress", priority: "high", assignee: "Tom Rodriguez", startDate: "2025-08-01", endDate: "2025-11-30", progress: 55 },
  { id: "t6", projectId: "p2", title: "Environmental Impact Assessment", description: "Complete environmental study for marine habitat protection.", status: "done", priority: "high", assignee: "Dr. Emily Brown", startDate: "2025-06-15", endDate: "2025-09-01", progress: 100 },
  { id: "t7", projectId: "p2", title: "Concrete Batch Testing", description: "Test concrete mix ratios for underwater application.", status: "todo", priority: "medium", assignee: "Alex Turner", startDate: "2026-01-01", endDate: "2026-02-15", progress: 0 },
  { id: "t8", projectId: "p3", title: "Interior Finishing - Block A", description: "Complete all interior finishing for residential block A (units 1-24).", status: "in-progress", priority: "medium", assignee: "Maria Santos", startDate: "2025-09-01", endDate: "2026-01-15", progress: 75 },
  { id: "t9", projectId: "p3", title: "Landscaping Design", description: "Design and implement green space landscaping.", status: "review", priority: "low", assignee: "Kevin O'Brien", startDate: "2025-11-15", endDate: "2026-03-01", progress: 60 },
  { id: "t10", projectId: "p4", title: "Structural Assessment", description: "Complete structural assessment of existing station framework.", status: "in-progress", priority: "high", assignee: "Dr. Anna Lee", startDate: "2025-09-01", endDate: "2025-12-15", progress: 45 },
  { id: "t11", projectId: "p4", title: "Historical Preservation Plan", description: "Develop preservation plan for heritage-listed elements.", status: "todo", priority: "high", assignee: "Robert Hayes", startDate: "2026-01-01", endDate: "2026-04-30", progress: 0 },
  { id: "t12", projectId: "p5", title: "Final Safety Walkthrough", description: "Complete final safety inspection before handover.", status: "review", priority: "high", assignee: "Pat Murphy", startDate: "2026-02-01", endDate: "2026-02-20", progress: 90 },
];

export const notifications: Notification[] = [
  { id: "n1", type: "warning", title: "Schedule Delay", message: "Harbor Bridge Expansion is 2 weeks behind schedule on pile driving.", time: "5 min ago", read: false },
  { id: "n2", type: "error", title: "Budget Alert", message: "Central Station Retrofit approaching 85% budget threshold.", time: "1 hour ago", read: false },
  { id: "n3", type: "success", title: "Milestone Reached", message: "Skyline Tower - Floor 12 steel frame assembly 65% complete.", time: "2 hours ago", read: false },
  { id: "n4", type: "info", title: "Inspection Scheduled", message: "Foundation inspection for Green Valley Block B scheduled for tomorrow.", time: "3 hours ago", read: true },
  { id: "n5", type: "warning", title: "Weather Advisory", message: "Heavy rain expected this week. Outdoor work may be affected.", time: "5 hours ago", read: true },
  { id: "n6", type: "success", title: "Task Completed", message: "Environmental Impact Assessment for Harbor Bridge approved.", time: "1 day ago", read: true },
];

export const teamMembers = [
  "Mike Chen", "Sarah Kim", "James Wilson", "Lisa Park",
  "Tom Rodriguez", "Dr. Emily Brown", "Alex Turner", "Maria Santos",
  "Kevin O'Brien", "Dr. Anna Lee", "Robert Hayes", "Pat Murphy",
];
