import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingDown, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from "recharts";

const budgetCards = [
  { label: "Total Budget", value: "$20.1M", icon: DollarSign, trend: null },
  { label: "Spent to Date", value: "$12.8M", icon: TrendingDown, trend: "-2.3% under plan", positive: true },
  { label: "Remaining", value: "$7.3M", icon: TrendingUp, trend: "63.7% utilized", positive: true },
  { label: "Forecasted Overrun", value: "$0.4M", icon: PieChart, trend: "1.9% over", positive: false },
];

const monthlyData = [
  { month: "Oct", planned: 1.2, actual: 1.1 },
  { month: "Nov", planned: 1.5, actual: 1.6 },
  { month: "Dec", planned: 1.8, actual: 1.7 },
  { month: "Jan", planned: 2.1, actual: 2.0 },
  { month: "Feb", planned: 2.4, actual: 2.5 },
  { month: "Mar", planned: 2.2, actual: 2.1 },
];

const categoryData = [
  { name: "Labor", value: 42, color: "hsl(24, 95%, 53%)" },
  { name: "Materials", value: 28, color: "hsl(166, 72%, 40%)" },
  { name: "Equipment", value: 15, color: "hsl(215, 28%, 17%)" },
  { name: "Permits", value: 8, color: "hsl(43, 96%, 56%)" },
  { name: "Other", value: 7, color: "hsl(200, 60%, 50%)" },
];

const expenses = [
  { desc: "Steel beam delivery — Phase 2", amount: "$48,500", category: "Materials", date: "Mar 24", direction: "out" },
  { desc: "Crew overtime — Week 12", amount: "$12,200", category: "Labor", date: "Mar 23", direction: "out" },
  { desc: "Insurance reimbursement", amount: "$5,800", category: "Other", date: "Mar 22", direction: "in" },
  { desc: "Crane rental — March", amount: "$22,000", category: "Equipment", date: "Mar 21", direction: "out" },
  { desc: "Concrete bulk order", amount: "$31,400", category: "Materials", date: "Mar 20", direction: "out" },
];

export default function BudgetBrilliance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {budgetCards.map((b) => (
          <Card key={b.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{b.label}</span>
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{b.value}</p>
              {b.trend && (
                <p className={`text-xs mt-1 flex items-center gap-1 ${b.positive ? "text-accent" : "text-destructive"}`}>
                  {b.positive ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                  {b.trend}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Monthly Spend vs Plan ($M)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(220 13% 89%)", fontSize: "0.8rem" }} />
                  <Bar dataKey="planned" fill="hsl(220, 14%, 85%)" radius={[4, 4, 0, 0]} name="Planned" />
                  <Bar dataKey="actual" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>By Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                  <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {categoryData.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "0.5rem", fontSize: "0.8rem" }} />
                </RPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="flex-1">{c.name}</span>
                  <span className="font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {expenses.map((e, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-full ${e.direction === "in" ? "bg-accent/15" : "bg-destructive/10"}`}>
                {e.direction === "in" ? <ArrowDownRight className="h-4 w-4 text-accent" /> : <ArrowUpRight className="h-4 w-4 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{e.desc}</p>
                <p className="text-xs text-muted-foreground">{e.date}</p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">{e.category}</Badge>
              <span className={`font-semibold text-sm ${e.direction === "in" ? "text-accent" : ""}`}>
                {e.direction === "in" ? "+" : "-"}{e.amount}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
