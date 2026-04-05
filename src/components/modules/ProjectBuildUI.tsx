import { useState, useMemo } from "react";
import { materials, categories, orders, usageTrends } from "@/data/projectBuild";
import type { Material } from "@/data/projectBuild";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, AlertTriangle, TrendingUp, DollarSign, Search, Filter, Calendar, Building2, TrendingDown, X } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";

const COLORS = ["hsl(215, 65%, 36%)", "hsl(45, 95%, 55%)", "hsl(152, 60%, 40%)", "hsl(200, 80%, 50%)", "hsl(0, 72%, 51%)", "hsl(280, 60%, 50%)"];

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-success/15 text-success border-success/30" },
  "low-stock": { label: "Low Stock", className: "bg-warning/15 text-warning border-warning/30" },
  "out-of-stock": { label: "Out of Stock", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

const orderStatusStyles: Record<string, string> = {
  Delivered: "bg-success/15 text-success border-success/30",
  "In Transit": "bg-info/15 text-info border-info/30",
  Pending: "bg-warning/15 text-warning border-warning/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

function MaterialCard({ material }: { material: Material }) {
  const config = statusConfig[material.status];
  const stockPercent = Math.round((material.quantity / material.maxQuantity) * 100);
  return (
    <div className={`group glass-card rounded-lg p-5 hover-lift animate-slide-up relative overflow-hidden ${material.status === "low-stock" ? "pulse-warning" : ""}`}>
      {material.status === "out-of-stock" && <div className="absolute inset-0 bg-destructive/5 pointer-events-none" />}
      <div className="flex items-start justify-between mb-3">
        <div><h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{material.name}</h3><p className="text-xs text-muted-foreground mt-0.5">{material.category}</p></div>
        <Badge variant="outline" className={config.className}>{config.label}</Badge>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Stock Level</span><span className="font-mono-data font-medium">{material.quantity} / {material.maxQuantity} {material.unit}</span></div>
        <div className="h-2 bg-muted rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${stockPercent > 50 ? "bg-success" : stockPercent > 20 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${stockPercent}%` }} /></div>
      </div>
      <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Building2 className="h-3.5 w-3.5" />{material.supplier}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" />Last ordered: {new Date(material.lastOrdered).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Package className="h-3.5 w-3.5" />${material.pricePerUnit.toFixed(2)} / {material.unit.slice(0, -1) || material.unit}</div>
      </div>
      {material.status === "low-stock" && <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-warning"><TrendingDown className="h-3.5 w-3.5" />Reorder recommended</div>}
    </div>
  );
}

export default function ProjectBuildUI() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [dismissed, setDismissed] = useState<string[]>([]);

  const filtered = useMemo(() => materials.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || m.category === categoryFilter;
    const matchesStock = stockFilter === "all" || m.status === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  }), [search, categoryFilter, stockFilter]);

  const totalValue = materials.reduce((s, m) => s + m.quantity * m.pricePerUnit, 0);
  const lowStockCount = materials.filter((m) => m.status === "low-stock" || m.status === "out-of-stock").length;
  const alerts = materials.filter((m) => (m.status === "low-stock" || m.status === "out-of-stock") && !dismissed.includes(m.id));

  const categoryData = categories.map((cat) => { const items = materials.filter((m) => m.category === cat); return { name: cat, value: items.reduce((s, m) => s + m.quantity, 0), count: items.length }; }).filter(d => d.value > 0);
  const stockStatusData = [
    { name: "In Stock", value: materials.filter((m) => m.status === "in-stock").length, color: "hsl(152, 60%, 40%)" },
    { name: "Low Stock", value: materials.filter((m) => m.status === "low-stock").length, color: "hsl(38, 92%, 50%)" },
    { name: "Out of Stock", value: materials.filter((m) => m.status === "out-of-stock").length, color: "hsl(0, 72%, 51%)" },
  ];

  const statCards = [
    { title: "Total Materials", value: materials.length, icon: Package },
    { title: "Low Stock Alerts", value: lowStockCount, icon: AlertTriangle },
    { title: "Inventory Value", value: `$${(totalValue / 1000).toFixed(1)}k`, icon: DollarSign },
    { title: "Avg Stock Level", value: `${Math.round(materials.reduce((s, m) => s + (m.quantity / m.maxQuantity) * 100, 0) / materials.length)}%`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {alerts.length > 0 && (
        <div className="glass-card rounded-lg p-4 border-l-4 border-l-warning animate-slide-up">
          <div className="flex items-center gap-2 mb-3"><AlertTriangle className="h-4 w-4 text-warning" /><span className="text-sm font-semibold">{alerts.length} item{alerts.length > 1 ? "s" : ""} need attention</span></div>
          <div className="flex flex-wrap gap-2">
            {alerts.map((m) => (
              <div key={m.id} className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium ${m.status === "out-of-stock" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                <span>{m.name}</span><span className="font-mono-data">{m.quantity}/{m.maxQuantity}</span>
                <button onClick={() => setDismissed((d) => [...d, m.id])}><X className="h-3 w-3" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.title} className="glass-card rounded-lg p-5 hover-lift animate-slide-up">
            <div className="flex items-start justify-between"><div><p className="text-sm font-medium text-muted-foreground">{s.title}</p><p className="font-display text-3xl text-foreground">{s.value}</p></div>
              <div className="gradient-primary rounded-lg p-2.5"><s.icon className="h-5 w-5 text-primary-foreground" /></div></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-lg p-5"><h3 className="font-display text-base mb-4">Stock Status</h3>
          <ResponsiveContainer width="100%" height={220}><PieChart><Pie data={stockStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">{stockStatusData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
          <div className="flex justify-center gap-5 mt-2">{stockStatusData.map((d) => (<div key={d.name} className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-muted-foreground">{d.name}</span><span className="font-semibold">{d.value}</span></div>))}</div>
        </div>
        <div className="glass-card rounded-lg p-5"><h3 className="font-display text-base mb-4">Stock by Category</h3>
          <ResponsiveContainer width="100%" height={250}><BarChart data={categoryData} barSize={32}><CartesianGrid strokeDasharray="3 3" stroke="hsl(215 18% 88%)" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" radius={[6, 6, 0, 0]}>{categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card rounded-lg p-5"><h3 className="font-display text-base mb-4">Usage Trends</h3>
        <ResponsiveContainer width="100%" height={250}><AreaChart data={usageTrends}><CartesianGrid strokeDasharray="3 3" stroke="hsl(215 18% 88%)" /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Area type="monotone" dataKey="cement" stroke={COLORS[0]} fill="transparent" strokeWidth={2} /><Area type="monotone" dataKey="tiles" stroke={COLORS[1]} fill="transparent" strokeWidth={2} /><Area type="monotone" dataKey="rebar" stroke={COLORS[2]} fill="transparent" strokeWidth={2} /><Area type="monotone" dataKey="electrical" stroke={COLORS[3]} fill="transparent" strokeWidth={2} /></AreaChart></ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-3">{["Cement", "Tiles", "Rebar", "Electrical"].map((name, i) => (<div key={name} className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="text-muted-foreground">{name}</span></div>))}</div>
      </div>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="font-display text-xl">Inventory</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search materials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 w-full sm:w-56 bg-card text-sm" /></div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 rounded-md border border-input bg-card px-3 text-sm">
                <option value="all">All Categories</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value as StockFilter)} className="h-9 rounded-md border border-input bg-card px-3 text-sm">
                <option value="all">All Status</option><option value="in-stock">In Stock</option><option value="low-stock">Low Stock</option><option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((material) => <MaterialCard key={material.id} material={material} />)}
          {filtered.length === 0 && <div className="col-span-full text-center py-12 text-muted-foreground"><Package className="h-10 w-10 mx-auto mb-3 opacity-40" /><p className="text-sm">No materials found.</p></div>}
        </div>
      </section>

      <div className="glass-card rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border"><h2 className="font-display text-lg">Order History</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="border-b border-border bg-muted/40">
            <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Material</th>
            <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Supplier</th>
            <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3">Qty</th>
            <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3">Total</th>
            <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Status</th>
          </tr></thead><tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium">{order.materialName}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{order.supplier}</td>
                <td className="px-5 py-3.5 text-sm font-mono-data text-right">{order.quantity}</td>
                <td className="px-5 py-3.5 text-sm font-mono-data text-right">${order.total.toLocaleString()}</td>
                <td className="px-5 py-3.5"><Badge variant="outline" className={orderStatusStyles[order.status]}>{order.status}</Badge></td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </div>
  );
}
