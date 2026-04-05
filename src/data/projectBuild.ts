export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
export type Category = "Structural" | "Finishing" | "Electrical" | "Plumbing" | "Safety" | "Tools";

export interface Material {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  maxQuantity: number;
  unit: string;
  supplier: string;
  lastOrdered: string;
  pricePerUnit: number;
  status: StockStatus;
}

export interface Order {
  id: string;
  materialName: string;
  quantity: number;
  supplier: string;
  date: string;
  total: number;
  status: "Delivered" | "In Transit" | "Pending" | "Cancelled";
}

export const categories: Category[] = ["Structural", "Finishing", "Electrical", "Plumbing", "Safety", "Tools"];

export const materials: Material[] = [
  { id: "m1", name: "Portland Cement", category: "Structural", quantity: 450, maxQuantity: 1000, unit: "bags", supplier: "BuildMax Co.", lastOrdered: "2026-03-15", pricePerUnit: 12.5, status: "in-stock" },
  { id: "m2", name: "Rebar (12mm)", category: "Structural", quantity: 35, maxQuantity: 500, unit: "pcs", supplier: "SteelWorks Ltd.", lastOrdered: "2026-03-10", pricePerUnit: 8.75, status: "low-stock" },
  { id: "m3", name: "Plywood Sheets", category: "Structural", quantity: 0, maxQuantity: 200, unit: "sheets", supplier: "TimberYard Inc.", lastOrdered: "2026-02-28", pricePerUnit: 45.0, status: "out-of-stock" },
  { id: "m4", name: "Ceramic Tiles", category: "Finishing", quantity: 1200, maxQuantity: 2000, unit: "pcs", supplier: "TileCraft", lastOrdered: "2026-03-20", pricePerUnit: 3.25, status: "in-stock" },
  { id: "m5", name: "Wall Paint (White)", category: "Finishing", quantity: 18, maxQuantity: 100, unit: "gallons", supplier: "ColorPro", lastOrdered: "2026-03-05", pricePerUnit: 35.0, status: "low-stock" },
  { id: "m6", name: "Copper Wire (2.5mm)", category: "Electrical", quantity: 800, maxQuantity: 1500, unit: "meters", supplier: "ElecSupply", lastOrdered: "2026-03-18", pricePerUnit: 2.1, status: "in-stock" },
  { id: "m7", name: "PVC Pipes (4\")", category: "Plumbing", quantity: 45, maxQuantity: 300, unit: "pcs", supplier: "PipeMaster", lastOrdered: "2026-03-12", pricePerUnit: 15.0, status: "low-stock" },
  { id: "m8", name: "Safety Helmets", category: "Safety", quantity: 120, maxQuantity: 200, unit: "pcs", supplier: "SafetyFirst", lastOrdered: "2026-03-22", pricePerUnit: 22.0, status: "in-stock" },
  { id: "m9", name: "Concrete Blocks", category: "Structural", quantity: 2500, maxQuantity: 5000, unit: "pcs", supplier: "BuildMax Co.", lastOrdered: "2026-03-25", pricePerUnit: 1.8, status: "in-stock" },
  { id: "m10", name: "Electrical Conduit", category: "Electrical", quantity: 12, maxQuantity: 200, unit: "pcs", supplier: "ElecSupply", lastOrdered: "2026-02-15", pricePerUnit: 6.5, status: "low-stock" },
  { id: "m11", name: "Gravel (Fine)", category: "Structural", quantity: 0, maxQuantity: 800, unit: "tons", supplier: "QuarryWorks", lastOrdered: "2026-01-20", pricePerUnit: 28.0, status: "out-of-stock" },
  { id: "m12", name: "Power Drill Set", category: "Tools", quantity: 15, maxQuantity: 30, unit: "sets", supplier: "ToolDepot", lastOrdered: "2026-03-01", pricePerUnit: 189.0, status: "in-stock" },
];

export const orders: Order[] = [
  { id: "o1", materialName: "Portland Cement", quantity: 200, supplier: "BuildMax Co.", date: "2026-03-15", total: 2500, status: "Delivered" },
  { id: "o2", materialName: "Rebar (12mm)", quantity: 100, supplier: "SteelWorks Ltd.", date: "2026-03-10", total: 875, status: "Delivered" },
  { id: "o3", materialName: "Ceramic Tiles", quantity: 500, supplier: "TileCraft", date: "2026-03-20", total: 1625, status: "In Transit" },
  { id: "o4", materialName: "Copper Wire (2.5mm)", quantity: 300, supplier: "ElecSupply", date: "2026-03-18", total: 630, status: "Delivered" },
  { id: "o5", materialName: "PVC Pipes (4\")", quantity: 80, supplier: "PipeMaster", date: "2026-03-12", total: 1200, status: "Pending" },
  { id: "o6", materialName: "Plywood Sheets", quantity: 50, supplier: "TimberYard Inc.", date: "2026-02-28", total: 2250, status: "Cancelled" },
  { id: "o7", materialName: "Safety Helmets", quantity: 50, supplier: "SafetyFirst", date: "2026-03-22", total: 1100, status: "In Transit" },
  { id: "o8", materialName: "Concrete Blocks", quantity: 1000, supplier: "BuildMax Co.", date: "2026-03-25", total: 1800, status: "Pending" },
];

export const usageTrends = [
  { month: "Oct", cement: 180, rebar: 90, tiles: 300, electrical: 200 },
  { month: "Nov", cement: 220, rebar: 110, tiles: 250, electrical: 180 },
  { month: "Dec", cement: 150, rebar: 70, tiles: 180, electrical: 150 },
  { month: "Jan", cement: 280, rebar: 130, tiles: 400, electrical: 220 },
  { month: "Feb", cement: 320, rebar: 150, tiles: 350, electrical: 260 },
  { month: "Mar", cement: 250, rebar: 100, tiles: 420, electrical: 190 },
];
