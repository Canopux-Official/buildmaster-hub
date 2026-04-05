export type ExpenseCategory = "materials" | "labor" | "equipment" | "misc";
export type ExpenseStatus = "paid" | "pending" | "overdue";

export type Expense = {
  id: string;
  name: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
  status: ExpenseStatus;
};

export const TOTAL_BUDGET = 4500000;

export const CATEGORY_BUDGETS: Record<ExpenseCategory, number> = {
  materials: 1800000,
  labor: 1200000,
  equipment: 600000,
  misc: 900000,
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  materials: "hsl(215, 70%, 40%)",
  labor: "hsl(45, 95%, 55%)",
  equipment: "hsl(152, 60%, 40%)",
  misc: "hsl(280, 60%, 50%)",
};

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  materials: "Material",
  labor: "Labor",
  equipment: "Equipment",
  misc: "Misc",
};

let counter = 13;
export const generateId = () => `EXP-${String(counter++).padStart(3, "0")}`;

export const initialExpenses: Expense[] = [
  { id: "EXP-001", name: "Structural Steel Beams", category: "materials", amount: 185000, date: "2026-03-28", description: "Grade A steel beams for floors 5-8", status: "paid" },
  { id: "EXP-002", name: "Concrete Foundation Pour", category: "materials", amount: 92000, date: "2026-03-25", description: "Foundation concrete mix delivery", status: "paid" },
  { id: "EXP-003", name: "Electrical Crew - Week 12", category: "labor", amount: 34500, date: "2026-03-22", description: "Main electrical wiring phase 2", status: "paid" },
  { id: "EXP-004", name: "Crane Rental - Monthly", category: "equipment", amount: 28000, date: "2026-03-20", description: "Tower crane monthly lease", status: "pending" },
  { id: "EXP-005", name: "Plumbing Subcontract", category: "misc", amount: 67000, date: "2026-03-18", description: "Plumbing systems installation", status: "overdue" },
  { id: "EXP-006", name: "Building Permits - Phase 2", category: "misc", amount: 12500, date: "2026-03-15", description: "City building permits renewal", status: "paid" },
  { id: "EXP-007", name: "Reinforcement Bars", category: "materials", amount: 45000, date: "2026-03-12", description: "Rebar for structural reinforcement", status: "paid" },
  { id: "EXP-008", name: "HVAC Installation Crew", category: "labor", amount: 52000, date: "2026-03-10", description: "HVAC system installation team", status: "pending" },
  { id: "EXP-009", name: "Excavator Lease", category: "equipment", amount: 15000, date: "2026-03-08", description: "Monthly excavator rental", status: "paid" },
  { id: "EXP-010", name: "Glass Panels - Facade", category: "materials", amount: 210000, date: "2026-03-05", description: "Exterior glass curtain wall panels", status: "pending" },
  { id: "EXP-011", name: "Masonry Crew - Week 10", category: "labor", amount: 28000, date: "2026-03-01", description: "Brick and block laying crew", status: "paid" },
  { id: "EXP-012", name: "Elevator Installation", category: "misc", amount: 145000, date: "2026-02-25", description: "Passenger elevator systems", status: "paid" },
];
