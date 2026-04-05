import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Image, FolderOpen, Search, Download, Eye, Clock } from "lucide-react";
import { useState } from "react";

const documents = [
  { name: "Structural Blueprint - Floor 1", type: "Blueprint", version: "v3.2", date: "Mar 22, 2025", size: "4.8 MB", icon: Image },
  { name: "Electrical Layout - Main Building", type: "Blueprint", version: "v2.1", date: "Mar 18, 2025", size: "3.2 MB", icon: Image },
  { name: "Safety Compliance Report", type: "Report", version: "v1.0", date: "Mar 20, 2025", size: "1.1 MB", icon: FileText },
  { name: "Material Procurement List", type: "Spreadsheet", version: "v4.0", date: "Mar 24, 2025", size: "0.8 MB", icon: FileText },
  { name: "Site Photos - Week 12", type: "Media", version: "—", date: "Mar 25, 2025", size: "28 MB", icon: FolderOpen },
  { name: "Permit Application - Phase 2", type: "Legal", version: "v1.3", date: "Mar 15, 2025", size: "2.4 MB", icon: FileText },
  { name: "HVAC System Specs", type: "Technical", version: "v2.0", date: "Mar 10, 2025", size: "5.6 MB", icon: FileText },
];

const typeColor = (t: string) =>
  t === "Blueprint" ? "bg-chart-5/15 text-chart-5" :
  t === "Report" ? "bg-accent/15 text-accent" :
  t === "Legal" ? "bg-primary/15 text-primary" :
  "bg-muted text-muted-foreground";

export default function ProjectDocsUI() {
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const filtered = documents.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button>Upload Document</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>All Documents</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {filtered.map((d) => (
                <div
                  key={d.name}
                  onClick={() => setSelectedDoc(d.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${selectedDoc === d.name ? "bg-primary/5 border border-primary/20" : ""}`}
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <d.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{d.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {d.date} · {d.size}
                    </div>
                  </div>
                  <Badge className={typeColor(d.type)}>{d.type}</Badge>
                  <span className="text-xs text-muted-foreground hidden sm:block">{d.version}</span>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No documents found</p>}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader><CardTitle className="text-base">Document Preview</CardTitle></CardHeader>
            <CardContent>
              {selectedDoc ? (
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                  <h3 className="font-semibold text-sm">{selectedDoc}</h3>
                  <p className="text-xs text-muted-foreground">
                    {documents.find((d) => d.name === selectedDoc)?.version} · {documents.find((d) => d.name === selectedDoc)?.date}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1"><Eye className="h-4 w-4 mr-1" /> View</Button>
                    <Button size="sm" variant="outline" className="flex-1"><Download className="h-4 w-4 mr-1" /> Download</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Select a document to preview</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
