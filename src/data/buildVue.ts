export interface Project {
  id: string;
  name: string;
  location: string;
  status: "planning" | "in-progress" | "on-hold" | "completed";
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  budget: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface Update {
  id: string;
  projectId: string;
  projectName: string;
  type: "photo" | "milestone" | "update" | "alert";
  title: string;
  description: string;
  date: string;
  image?: string;
  author: string;
}

export interface Message {
  id: string;
  sender: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar: string;
}

export interface Document {
  id: string;
  name: string;
  type: "blueprint" | "permit" | "report" | "contract" | "photo";
  project: string;
  date: string;
  size: string;
}

export interface BVNotification {
  id: string;
  title: string;
  description: string;
  type: "milestone" | "message" | "update" | "alert";
  time: string;
  read: boolean;
}

export const projects: Project[] = [
  {
    id: "1", name: "Riverside Tower Complex", location: "Downtown Portland, OR", status: "in-progress", progress: 68,
    startDate: "2025-03-15", endDate: "2026-11-30", manager: "Michael Chen", budget: "$12.4M",
    milestones: [
      { id: "m1", title: "Foundation Complete", date: "2025-06-01", completed: true },
      { id: "m2", title: "Steel Structure", date: "2025-09-15", completed: true },
      { id: "m3", title: "Exterior Walls", date: "2026-01-20", completed: true },
      { id: "m4", title: "Interior Framing", date: "2026-04-10", completed: false },
      { id: "m5", title: "Final Inspection", date: "2026-11-15", completed: false },
    ],
  },
  {
    id: "2", name: "Greenfield Office Park", location: "Beaverton, OR", status: "in-progress", progress: 42,
    startDate: "2025-06-01", endDate: "2027-02-28", manager: "Sarah Williams", budget: "$8.7M",
    milestones: [
      { id: "m6", title: "Site Preparation", date: "2025-07-15", completed: true },
      { id: "m7", title: "Foundation Work", date: "2025-11-01", completed: true },
      { id: "m8", title: "Structural Phase", date: "2026-06-01", completed: false },
      { id: "m9", title: "Completion", date: "2027-02-15", completed: false },
    ],
  },
  {
    id: "3", name: "Harbor Bridge Renovation", location: "Vancouver, WA", status: "planning", progress: 12,
    startDate: "2026-01-10", endDate: "2027-08-30", manager: "David Park", budget: "$5.2M",
    milestones: [
      { id: "m10", title: "Permits Approved", date: "2026-02-01", completed: true },
      { id: "m11", title: "Phase 1 Start", date: "2026-04-15", completed: false },
      { id: "m12", title: "Phase 2 Start", date: "2026-11-01", completed: false },
    ],
  },
  {
    id: "4", name: "Sunset Residential Homes", location: "Lake Oswego, OR", status: "completed", progress: 100,
    startDate: "2024-08-01", endDate: "2025-12-15", manager: "Emily Rodriguez", budget: "$3.1M",
    milestones: [
      { id: "m13", title: "Foundation", date: "2024-10-01", completed: true },
      { id: "m14", title: "Framing", date: "2025-02-15", completed: true },
      { id: "m15", title: "Finishing", date: "2025-10-01", completed: true },
      { id: "m16", title: "Handover", date: "2025-12-15", completed: true },
    ],
  },
];

export const updates: Update[] = [
  { id: "u1", projectId: "1", projectName: "Riverside Tower Complex", type: "photo", title: "Steel framework completed on floors 8-12", description: "The structural steel for the upper floors has been successfully installed. Welding inspections passed with no issues.", date: "2026-03-28", author: "Michael Chen" },
  { id: "u2", projectId: "1", projectName: "Riverside Tower Complex", type: "milestone", title: "Exterior Walls — Milestone Achieved", description: "All exterior wall panels have been installed and sealed. Building is now weather-tight.", date: "2026-03-20", author: "Michael Chen" },
  { id: "u3", projectId: "2", projectName: "Greenfield Office Park", type: "update", title: "Foundation pouring ahead of schedule", description: "Concrete foundation work is progressing 2 weeks ahead of schedule. Quality tests all passing.", date: "2026-03-18", author: "Sarah Williams" },
  { id: "u4", projectId: "3", projectName: "Harbor Bridge Renovation", type: "alert", title: "Weather delay expected next week", description: "Heavy rain forecast may impact outdoor work. Indoor tasks have been rescheduled to fill the gap.", date: "2026-03-15", author: "David Park" },
  { id: "u5", projectId: "2", projectName: "Greenfield Office Park", type: "photo", title: "Site preparation aerial view", description: "Drone footage captured showing the full extent of site grading and utility installation.", date: "2026-03-12", author: "Sarah Williams" },
];

export const messages: Message[] = [
  { id: "msg1", sender: "Michael Chen", senderRole: "Project Manager", content: "Good morning! The steel inspection passed yesterday. We're on track for the exterior walls.", timestamp: "9:15 AM", isOwn: false, avatar: "MC" },
  { id: "msg2", sender: "You", senderRole: "Client", content: "That's great news! When can I schedule a site visit?", timestamp: "9:22 AM", isOwn: true, avatar: "YO" },
  { id: "msg3", sender: "Michael Chen", senderRole: "Project Manager", content: "Anytime this week works. I'd recommend Thursday afternoon — the crane work will be done and it'll be safer for a walkthrough.", timestamp: "9:25 AM", isOwn: false, avatar: "MC" },
  { id: "msg4", sender: "You", senderRole: "Client", content: "Thursday at 2 PM works. Will hard hats be provided?", timestamp: "9:30 AM", isOwn: true, avatar: "YO" },
  { id: "msg5", sender: "Michael Chen", senderRole: "Project Manager", content: "Absolutely! Full PPE will be provided at the site office. Looking forward to showing you the progress! 🏗️", timestamp: "9:32 AM", isOwn: false, avatar: "MC" },
];

export const documents: Document[] = [
  { id: "d1", name: "Floor Plan — Level 1-5", type: "blueprint", project: "Riverside Tower", date: "2026-01-15", size: "4.2 MB" },
  { id: "d2", name: "Building Permit #2026-0342", type: "permit", project: "Riverside Tower", date: "2025-12-20", size: "1.1 MB" },
  { id: "d3", name: "Q1 2026 Progress Report", type: "report", project: "Riverside Tower", date: "2026-03-30", size: "2.8 MB" },
  { id: "d4", name: "Site Survey Results", type: "report", project: "Greenfield Office", date: "2025-11-10", size: "5.6 MB" },
  { id: "d5", name: "Environmental Impact Assessment", type: "permit", project: "Harbor Bridge", date: "2025-09-22", size: "3.4 MB" },
  { id: "d6", name: "Construction Agreement", type: "contract", project: "Riverside Tower", date: "2025-02-28", size: "890 KB" },
  { id: "d7", name: "Structural Engineering Report", type: "report", project: "Greenfield Office", date: "2026-02-14", size: "7.1 MB" },
  { id: "d8", name: "Electrical Plan — Full Building", type: "blueprint", project: "Riverside Tower", date: "2026-02-01", size: "3.9 MB" },
];

export const notifications: BVNotification[] = [
  { id: "n1", title: "Milestone Completed", description: "Exterior Walls milestone achieved on Riverside Tower", type: "milestone", time: "2 hours ago", read: false },
  { id: "n2", title: "New Message", description: "Michael Chen sent you a message about the site visit", type: "message", time: "3 hours ago", read: false },
  { id: "n3", title: "Weather Alert", description: "Possible delays on Harbor Bridge due to weather", type: "alert", time: "5 hours ago", read: false },
  { id: "n4", title: "Report Available", description: "Q1 2026 Progress Report is ready for download", type: "update", time: "1 day ago", read: true },
  { id: "n5", title: "Foundation Complete", description: "Greenfield Office Park foundation work finished", type: "milestone", time: "3 days ago", read: true },
];

export const chartData = {
  monthly: [
    { month: "Oct", planned: 20, actual: 18 },
    { month: "Nov", planned: 30, actual: 28 },
    { month: "Dec", planned: 38, actual: 40 },
    { month: "Jan", planned: 48, actual: 50 },
    { month: "Feb", planned: 58, actual: 60 },
    { month: "Mar", planned: 65, actual: 68 },
  ],
  budgetAllocation: [
    { name: "Labor", value: 40, fill: "hsl(215, 70%, 40%)" },
    { name: "Materials", value: 30, fill: "hsl(43, 96%, 56%)" },
    { name: "Equipment", value: 15, fill: "hsl(152, 60%, 40%)" },
    { name: "Permits", value: 8, fill: "hsl(200, 80%, 50%)" },
    { name: "Other", value: 7, fill: "hsl(215, 10%, 50%)" },
  ],
};
