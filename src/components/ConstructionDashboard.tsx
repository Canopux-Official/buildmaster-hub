import { useState } from "react";
import { Building2, Hammer, Users, FileText, LayoutGrid, DollarSign, HardHat } from "lucide-react";
import BuildisteDashboard from "./modules/BuildisteDashboard";
import ProjectBuildUI from "./modules/ProjectBuildUI";
import SiteCrewDashboard from "./modules/SiteCrewDashboard";
import ProjectDocsUI from "./modules/ProjectDocsUI";
import BuildVuePortal from "./modules/BuildVuePortal";
import BudgetBrilliance from "./modules/BudgetBrilliance";

const modules = [
  { id: "buildiste", label: "Buildiste", icon: Building2, component: BuildisteDashboard },
  { id: "project-build", label: "Project Build", icon: Hammer, component: ProjectBuildUI },
  { id: "site-crew", label: "Site Crew", icon: Users, component: SiteCrewDashboard },
  { id: "project-docs", label: "ProjectDocs", icon: FileText, component: ProjectDocsUI },
  { id: "vue-portal", label: "Vue Portal", icon: LayoutGrid, component: BuildVuePortal },
  { id: "budget", label: "Budget", icon: DollarSign, component: BudgetBrilliance },
];

export default function ConstructionDashboard() {
  const [active, setActive] = useState("buildiste");
  const ActiveModule = modules.find((m) => m.id === active)!.component;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-3">
            <div className="flex items-center gap-2 mr-4">
              <HardHat className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg hidden sm:block">ConstructHub</span>
            </div>
            <nav className="flex items-center gap-1 overflow-x-auto flex-1 scrollbar-hide">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    active === m.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{m.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Module content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-6">
        <div key={active} className="module-enter">
          <ActiveModule />
        </div>
      </main>
    </div>
  );
}
