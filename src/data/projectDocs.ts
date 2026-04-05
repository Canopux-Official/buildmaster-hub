export type DocumentStatus = "approved" | "pending" | "expired";
export type DocumentType = "contract" | "blueprint" | "permit" | "inspection" | "safety";

export interface ProjectDocument {
  id: string;
  title: string;
  type: DocumentType;
  project: string;
  status: DocumentStatus;
  uploadedBy: string;
  uploadDate: string;
  expiryDate: string | null;
  version: number;
  fileSize: string;
  description: string;
}

export interface DocumentVersion {
  version: number;
  date: string;
  author: string;
  changes: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "warning" | "urgent" | "info";
  time: string;
  read: boolean;
}

export const documents: ProjectDocument[] = [
  { id: "1", title: "Main Building Contract", type: "contract", project: "Harbor Tower", status: "approved", uploadedBy: "Sarah Chen", uploadDate: "2024-01-15", expiryDate: "2025-06-15", version: 3, fileSize: "2.4 MB", description: "Primary construction agreement for Harbor Tower Phase 1" },
  { id: "2", title: "Foundation Blueprint Rev.C", type: "blueprint", project: "Harbor Tower", status: "approved", uploadedBy: "Mike Torres", uploadDate: "2024-02-20", expiryDate: null, version: 4, fileSize: "15.8 MB", description: "Structural foundation plans including pile layout" },
  { id: "3", title: "Building Permit #4521", type: "permit", project: "Riverside Mall", status: "pending", uploadedBy: "James Liu", uploadDate: "2024-03-01", expiryDate: "2024-12-31", version: 1, fileSize: "890 KB", description: "Commercial building permit application" },
  { id: "4", title: "Safety Inspection Report", type: "inspection", project: "Metro Station B", status: "expired", uploadedBy: "Ana Rodriguez", uploadDate: "2023-11-10", expiryDate: "2024-05-10", version: 2, fileSize: "4.2 MB", description: "Bi-annual safety inspection for underground works" },
  { id: "5", title: "Electrical Blueprint", type: "blueprint", project: "Riverside Mall", status: "approved", uploadedBy: "Tom Wilson", uploadDate: "2024-01-28", expiryDate: null, version: 5, fileSize: "22.1 MB", description: "Complete electrical wiring and panel schematics" },
  { id: "6", title: "Demolition Permit #3899", type: "permit", project: "Metro Station B", status: "approved", uploadedBy: "James Liu", uploadDate: "2024-02-14", expiryDate: "2025-02-14", version: 1, fileSize: "1.1 MB", description: "Demolition clearance for existing structures" },
  { id: "7", title: "Subcontractor Agreement", type: "contract", project: "Harbor Tower", status: "pending", uploadedBy: "Sarah Chen", uploadDate: "2024-03-05", expiryDate: "2025-03-05", version: 1, fileSize: "3.7 MB", description: "Electrical subcontractor services agreement" },
  { id: "8", title: "Fire Safety Certificate", type: "safety", project: "Riverside Mall", status: "expired", uploadedBy: "Ana Rodriguez", uploadDate: "2023-09-20", expiryDate: "2024-03-20", version: 1, fileSize: "560 KB", description: "Fire safety compliance certificate" },
  { id: "9", title: "HVAC System Blueprint", type: "blueprint", project: "Metro Station B", status: "pending", uploadedBy: "Mike Torres", uploadDate: "2024-03-10", expiryDate: null, version: 2, fileSize: "18.5 MB", description: "Heating, ventilation, and air conditioning layout" },
  { id: "10", title: "Environmental Permit", type: "permit", project: "Harbor Tower", status: "approved", uploadedBy: "James Liu", uploadDate: "2024-01-05", expiryDate: "2025-07-05", version: 2, fileSize: "1.8 MB", description: "Environmental impact assessment approval" },
  { id: "11", title: "Crane Inspection Report", type: "inspection", project: "Harbor Tower", status: "approved", uploadedBy: "Tom Wilson", uploadDate: "2024-02-28", expiryDate: "2024-08-28", version: 1, fileSize: "3.1 MB", description: "Tower crane annual safety inspection" },
  { id: "12", title: "Worker Safety Manual", type: "safety", project: "Metro Station B", status: "approved", uploadedBy: "Ana Rodriguez", uploadDate: "2024-01-20", expiryDate: null, version: 6, fileSize: "8.9 MB", description: "Comprehensive site safety guidelines" },
];

export const versionHistory: Record<string, DocumentVersion[]> = {
  "1": [
    { version: 3, date: "2024-01-15", author: "Sarah Chen", changes: "Updated payment schedule and milestones" },
    { version: 2, date: "2023-12-01", author: "Sarah Chen", changes: "Added penalty clauses" },
    { version: 1, date: "2023-10-15", author: "Legal Team", changes: "Initial draft" },
  ],
  "2": [
    { version: 4, date: "2024-02-20", author: "Mike Torres", changes: "Revised pile spacing per geotechnical report" },
    { version: 3, date: "2024-01-30", author: "Mike Torres", changes: "Added retaining wall details" },
    { version: 2, date: "2024-01-10", author: "Structural Team", changes: "Updated load calculations" },
    { version: 1, date: "2023-11-20", author: "Structural Team", changes: "Initial foundation layout" },
  ],
};

export const notifications: Notification[] = [
  { id: "1", title: "Permit Expiring Soon", message: "Building Permit #4521 expires in 30 days", type: "warning", time: "2 hours ago", read: false },
  { id: "2", title: "Document Expired", message: "Safety Inspection Report has expired and needs renewal", type: "urgent", time: "1 day ago", read: false },
  { id: "3", title: "Approval Required", message: "Subcontractor Agreement awaiting your approval", type: "info", time: "3 hours ago", read: false },
  { id: "4", title: "Fire Safety Certificate Expired", message: "Riverside Mall fire safety cert needs immediate renewal", type: "urgent", time: "5 days ago", read: true },
  { id: "5", title: "New Blueprint Uploaded", message: "HVAC System Blueprint v2 is ready for review", type: "info", time: "6 hours ago", read: true },
];

export const chartData = {
  statusSummary: [
    { name: "Approved", value: 7, fill: "hsl(152, 60%, 42%)" },
    { name: "Pending", value: 3, fill: "hsl(38, 92%, 50%)" },
    { name: "Expired", value: 2, fill: "hsl(0, 72%, 51%)" },
  ],
  monthlyUploads: [
    { month: "Sep", uploads: 2 },
    { month: "Oct", uploads: 1 },
    { month: "Nov", uploads: 3 },
    { month: "Dec", uploads: 2 },
    { month: "Jan", uploads: 5 },
    { month: "Feb", uploads: 4 },
    { month: "Mar", uploads: 5 },
  ],
  projectBreakdown: [
    { project: "Harbor Tower", count: 5 },
    { project: "Riverside Mall", count: 3 },
    { project: "Metro Station B", count: 4 },
  ],
};

export const typeIcons: Record<DocumentType, string> = {
  contract: "📄",
  blueprint: "📐",
  permit: "🏛️",
  inspection: "🔍",
  safety: "🦺",
};

export const projects = ["Harbor Tower", "Riverside Mall", "Metro Station B"];
export const documentTypes: DocumentType[] = ["contract", "blueprint", "permit", "inspection", "safety"];
