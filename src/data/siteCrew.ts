export type WorkerRole = "Foreman" | "Electrician" | "Plumber" | "Carpenter" | "Mason" | "Welder" | "Painter" | "Operator";
export type AttendanceStatus = "present" | "absent" | "late" | "leave";
export type TaskStatus = "in-progress" | "completed" | "overdue" | "pending";
export type Team = "Alpha" | "Beta" | "Gamma" | "Delta";

export interface Worker {
  id: string;
  name: string;
  role: WorkerRole;
  team: Team;
  avatar: string;
  attendance: AttendanceStatus;
  phone: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
  hourlyRate: number;
  hoursWorked: number;
  overtime: number;
  bonus: number;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: "high" | "medium" | "low";
  dueDate: string;
  location: string;
}

export interface AttendanceRecord {
  date: string;
  present: number;
  absent: number;
  late: number;
  leave: number;
}

const firstNames = ["James", "Carlos", "Mike", "Ahmad", "Dmitri", "Raj", "Tommy", "Victor", "Luis", "Hassan", "Chen", "Patrick"];
const lastNames = ["Rivera", "Johnson", "Chen", "Patel", "Kowalski", "Martinez", "O'Brien", "Nguyen", "Silva", "Ali", "Kim", "Dubois"];
const roles: WorkerRole[] = ["Foreman", "Electrician", "Plumber", "Carpenter", "Mason", "Welder", "Painter", "Operator"];
const teams: Team[] = ["Alpha", "Beta", "Gamma", "Delta"];
const statuses: AttendanceStatus[] = ["present", "present", "present", "present", "present", "absent", "late", "leave"];

export const workers: Worker[] = Array.from({ length: 12 }, (_, i) => ({
  id: `W${String(i + 1).padStart(3, "0")}`,
  name: `${firstNames[i]} ${lastNames[i]}`,
  role: roles[i % roles.length],
  team: teams[i % teams.length],
  avatar: `${firstNames[i][0]}${lastNames[i][0]}`,
  attendance: statuses[i % statuses.length],
  phone: `(555) ${String(100 + i).padStart(3, "0")}-${String(1000 + i * 111).slice(0, 4)}`,
  performance: 60 + Math.floor(Math.random() * 40),
  tasksCompleted: 5 + Math.floor(Math.random() * 20),
  tasksAssigned: 2 + Math.floor(Math.random() * 5),
  hourlyRate: 25 + Math.floor(Math.random() * 30),
  hoursWorked: 140 + Math.floor(Math.random() * 40),
  overtime: Math.floor(Math.random() * 20),
  bonus: Math.floor(Math.random() * 500),
}));

export const tasks: Task[] = [
  { id: "T001", title: "Install electrical wiring - Building A", assignee: "W002", status: "in-progress", priority: "high", dueDate: "2026-04-02", location: "Building A, Floor 3" },
  { id: "T002", title: "Concrete foundation pour", assignee: "W005", status: "overdue", priority: "high", dueDate: "2026-03-28", location: "Site B, Section 2" },
  { id: "T003", title: "Plumbing rough-in inspection", assignee: "W003", status: "completed", priority: "medium", dueDate: "2026-03-30", location: "Building A, Floor 1" },
  { id: "T004", title: "Framing walls - West wing", assignee: "W004", status: "in-progress", priority: "medium", dueDate: "2026-04-05", location: "Building C" },
  { id: "T005", title: "Weld steel beams - Roof", assignee: "W006", status: "pending", priority: "high", dueDate: "2026-04-01", location: "Building A, Roof" },
  { id: "T006", title: "Interior painting - Lobby", assignee: "W007", status: "pending", priority: "low", dueDate: "2026-04-10", location: "Building A, Lobby" },
  { id: "T007", title: "Excavation - Parking lot", assignee: "W008", status: "in-progress", priority: "medium", dueDate: "2026-04-03", location: "Site D" },
  { id: "T008", title: "Safety inspection walkthrough", assignee: "W001", status: "completed", priority: "high", dueDate: "2026-03-29", location: "All Sites" },
];

export const attendanceRecords: AttendanceRecord[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 2, 17 + i);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  return {
    date: d.toISOString().split("T")[0],
    present: isWeekend ? 0 : 8 + Math.floor(Math.random() * 4),
    absent: isWeekend ? 0 : Math.floor(Math.random() * 2),
    late: isWeekend ? 0 : Math.floor(Math.random() * 2),
    leave: isWeekend ? 0 : Math.floor(Math.random() * 2),
  };
});

export const payrollData = workers.map((w) => ({
  id: w.id,
  name: w.name,
  role: w.role,
  basePay: w.hourlyRate * w.hoursWorked,
  overtimePay: w.overtime * w.hourlyRate * 1.5,
  bonus: w.bonus,
  total: w.hourlyRate * w.hoursWorked + w.overtime * w.hourlyRate * 1.5 + w.bonus,
}));

export const chartData = {
  attendancePie: [
    { name: "Present", value: 78, fill: "hsl(152 60% 42%)" },
    { name: "Absent", value: 10, fill: "hsl(0 72% 51%)" },
    { name: "Late", value: 7, fill: "hsl(38 92% 50%)" },
    { name: "Leave", value: 5, fill: "hsl(205 80% 50%)" },
  ],
  taskCompletion: [
    { name: "Completed", value: 45, fill: "hsl(152 60% 42%)" },
    { name: "In Progress", value: 28, fill: "hsl(205 80% 50%)" },
    { name: "Overdue", value: 8, fill: "hsl(0 72% 51%)" },
    { name: "Pending", value: 19, fill: "hsl(38 92% 50%)" },
  ],
  weeklyPerformance: [
    { week: "Week 1", efficiency: 82, safety: 95, quality: 88 },
    { week: "Week 2", efficiency: 85, safety: 92, quality: 90 },
    { week: "Week 3", efficiency: 78, safety: 98, quality: 85 },
    { week: "Week 4", efficiency: 91, safety: 96, quality: 92 },
  ],
};
