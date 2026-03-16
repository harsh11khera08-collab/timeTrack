import { useState, useEffect, createContext, useContext } from "react";
import Login from "./Login";

import { fetchTasks } from "./services/api";
import { createTasks } from "./services/api";
import { AuthenticatedTemplate, useMsal ,UnauthenticatedTemplate} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { createProject } from "./services/api";
import { fetchProjects } from "./services/api";
import { fetchTimesheets } from "./services/api";
import { createTimesheet } from "./services/api";
import { updateTimesheet } from "./services/api";
import { deleteProject } from "./services/api";
import { deleteTimesheet } from "./services/api";
import { fetchEmployees } from "./services/api";
import { fetchProjectMembers } from "./services/api";
import { addProjectMember } from "./services/api";
import { deleteProjectMember } from "./services/api";
import TestAPI from "./services/testApi.jsx";
import { OnBoardingMonkRadar } from "./OnBoardingMonkRadar.jsx";
import { ManagedServicesTransition } from "./ManagedServicesTransition.jsx";
import { ProjectClosure } from "./ProjectClosure.jsx";
// ─── Context ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_USER = {
  id: "u1",
  name: "Alex Morgan",
  role: "pm",
  avatar: "AM",
  email: "alex.morgan@company.com",
};

const MOCK_EMPLOYEES = [
  {
    id: "e1",
    name: "Riya Sharma",
    email: "riya@company.com",
    role: "developer",
    type: "fulltime",
    department: "Engineering",
    kekaId: "K001",
    avatar: "RS",
  },
  {
    id: "e2",
    name: "Tom Chen",
    email: "tomche@company.com",
    role: "developer",
    type: "parttime",
    department: "Engineering",
    kekaId: "K002",
    avatar: "TC",
  },
  {
    id: "e3",
    name: "Priya Nair",
    email: "priya@company.com",
    role: "designer",
    type: "fulltime",
    department: "Design",
    kekaId: "K003",
    avatar: "PN",
  },
  {
    id: "e4",
    name: "Sam Okafor",
    email: "sam@company.com",
    role: "qa",
    type: "fulltime",
    department: "QA",
    kekaId: "K004",
    avatar: "SO",
  },
  {
    id: "e5",
    name: "Meera Patel",
    email: "meera@company.com",
    role: "developer",
    type: "parttime",
    department: "Engineering",
    kekaId: "K005",
    avatar: "MP",
  },
];

const MOCK_PROJECTS = [
  {
    id: "p1",
    name: "Phoenix Portal",
    code: "PHX",
    client: "Acme Corp",
    status: "active",
    billable: true,
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    budget: 1200,
    assignedMembers: ["e1", "e2", "e3"],
    progress: 65,
  },
  {
    id: "p2",
    name: "DataLake Migration",
    code: "DLM",
    client: "Internal",
    status: "active",
    billable: false,
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    budget: 800,
    assignedMembers: ["e1", "e4"],
    progress: 30,
  },
  {
    id: "p3",
    name: "Mobile Commerce App",
    code: "MCA",
    client: "RetailX",
    status: "active",
    billable: true,
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    budget: 2400,
    assignedMembers: ["e2", "e3", "e5"],
    progress: 15,
  },
  {
    id: "p4",
    name: "Security Audit",
    code: "SEC",
    client: "Internal",
    status: "completed",
    billable: false,
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    budget: 400,
    assignedMembers: ["e4"],
    progress: 100,
  },
];

const MOCK_TASKS = [
  {
    id: "t1",
    projectId: "p1",
    title: "UI Component Library",
    type: "task",
    milestone: "M1 - Foundation",
    assignee: "e3",
    startDate: "2025-01-01",
    endDate: "2025-02-15",
    status: "completed",
    estimatedHours: 80,
  },
  {
    id: "t2",
    projectId: "p1",
    title: "API Integration Layer",
    type: "task",
    milestone: "M1 - Foundation",
    assignee: "e1",
    startDate: "2025-01-15",
    endDate: "2025-03-01",
    status: "inprogress",
    estimatedHours: 120,
  },
  {
    id: "t3",
    projectId: "p1",
    title: "M1 - Foundation Complete",
    type: "milestone",
    milestone: null,
    assignee: null,
    startDate: "2025-03-01",
    endDate: "2025-03-01",
    status: "upcoming",
    estimatedHours: 0,
  },
  {
    id: "t4",
    projectId: "p1",
    title: "User Authentication",
    type: "task",
    milestone: "M2 - Core Features",
    assignee: "e1",
    startDate: "2025-03-01",
    endDate: "2025-04-15",
    status: "upcoming",
    estimatedHours: 60,
  },
  {
    id: "t5",
    projectId: "p1",
    title: "Dashboard Module",
    type: "task",
    milestone: "M2 - Core Features",
    assignee: "e2",
    startDate: "2025-03-15",
    endDate: "2025-05-01",
    status: "upcoming",
    estimatedHours: 90,
  },
  {
    id: "t6",
    projectId: "p2",
    title: "Data Source Mapping",
    type: "task",
    milestone: "M1 - Analysis",
    assignee: "e1",
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    status: "inprogress",
    estimatedHours: 100,
  },
  {
    id: "t7",
    projectId: "p2",
    title: "ETL Pipeline Build",
    type: "task",
    milestone: "M2 - Build",
    assignee: "e4",
    startDate: "2025-03-15",
    endDate: "2025-06-01",
    status: "upcoming",
    estimatedHours: 200,
  },
];

const TODAY = new Date();
const getWeekDates = (offset = 0) => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - d.getDay() + 1 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    return day;
  });
};

const MOCK_TIMESHEETS = [
  {
    id: "ts1",
    employeeId: "e1",
    projectId: "p1",
    taskId: "t2",
    date: "2025-05-12",
    hours: 8,
    description: "API integration work",
    billable: true,
    status: "approved",
    weekOf: "2025-05-12",
  },
  {
    id: "ts2",
    employeeId: "e1",
    projectId: "p2",
    taskId: "t6",
    date: "2025-05-13",
    hours: 8,
    description: "Data mapping analysis",
    billable: false,
    status: "approved",
    weekOf: "2025-05-12",
  },
  {
    id: "ts3",
    employeeId: "e2",
    projectId: "p1",
    taskId: "t5",
    date: "2025-05-12",
    hours: 4,
    description: "Dashboard wireframes",
    billable: true,
    status: "pending",
    weekOf: "2025-05-12",
  },
  {
    id: "ts4",
    employeeId: "e3",
    projectId: "p1",
    taskId: "t1",
    date: "2025-05-12",
    hours: 6,
    description: "Button components",
    billable: true,
    status: "pending",
    weekOf: "2025-05-12",
  },
  {
    id: "ts5",
    employeeId: "e1",
    projectId: "p1",
    taskId: "t2",
    date: "2025-05-14",
    hours: 8,
    description: "OAuth2 integration",
    billable: true,
    status: "draft",
    weekOf: "2025-05-12",
  },
];

const MOCK_INCIDENTS = [
  {
    id: "i1",
    employeeId: "e2",
    type: "missing_timesheet",
    weekOf: "2025-04-28",
    chaseSent: 3,
    resolved: false,
  },
  {
    id: "i2",
    employeeId: "e5",
    type: "missing_timesheet",
    weekOf: "2025-04-28",
    chaseSent: 2,
    resolved: false,
  },
  {
    id: "i3",
    employeeId: "e5",
    type: "missing_timesheet",
    weekOf: "2025-05-05",
    chaseSent: 1,
    resolved: false,
  },
  {
    id: "i4",
    employeeId: "e2",
    type: "missing_timesheet",
    weekOf: "2025-05-05",
    chaseSent: 1,
    resolved: false,
  },
];

// ─── Utility Helpers ─────────────────────────────────────────────────────────
const fmt = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtFull = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
const dayName = (d) => d.toLocaleDateString("en-US", { weekday: "short" });
const dayNum = (d) => d.getDate();
const totalHours = (sheets) => sheets.reduce((a, b) => a + b.hours, 0);

const COLORS = {
  blue: "#3B82F6",
  green: "#10B981",
  amber: "#F59E0B",
  red: "#EF4444",
  purple: "#8B5CF6",
  slate: "#64748B",
};

// ─── Sub-Components ───────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 32, color = "#3B82F6" }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color + "22",
      border: `1.5px solid ${color}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.35,
      fontWeight: 600,
      color,
      flexShrink: 0,
      fontFamily: "Sora, sans-serif",
    }}
  >
    {initials}
  </div>
);

const Badge = ({ label, color = "#3B82F6", small }) => (
  <span
    style={{
      background: color + "18",
      color,
      border: `1px solid ${color}33`,
      borderRadius: 4,
      padding: small ? "2px 6px" : "3px 9px",
      fontSize: small ? 10 : 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

const StatusBadge = ({ status }) => {
  const map = {
    active: { label: "Active", color: COLORS.green },
    completed: { label: "Completed", color: COLORS.slate },
    approved: { label: "Approved", color: COLORS.green },
    pending: { label: "Pending", color: COLORS.amber },
    draft: { label: "Draft", color: COLORS.slate },
    rejected: { label: "Rejected", color: COLORS.red },
    inprogress: { label: "In Progress", color: COLORS.blue },
    upcoming: { label: "Upcoming", color: COLORS.purple },
    fulltime: { label: "Full Time", color: COLORS.blue },
    parttime: { label: "Part Time", color: COLORS.amber },
    billable: { label: "Billable", color: COLORS.green },
    nonbillable: { label: "Non-Billable", color: COLORS.slate },
    milestone: { label: "Milestone", color: COLORS.purple },
    task: { label: "Task", color: COLORS.blue },
    notstarted:  { label: "Not Started", color: "#64748B" },
  };
  const s = map[status] || { label: status, color: COLORS.slate };
  return <Badge label={s.label} color={s.color} small />;
};

const KPICard = ({ label, value, sub, color = COLORS.blue, icon }) => (
  <div
    style={{
      background: "white",
      borderRadius: 12,
      padding: "20px 24px",
      border: "1px solid #E2E8F0",
      flex: 1,
      minWidth: 160,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12,
            color: "#94A3B8",
            fontWeight: 500,
            marginBottom: 6,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1,
            fontFamily: "Sora, sans-serif",
          }}
        >
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: "#64748B", marginTop: 6 }}>
            {sub}
          </div>
        )}
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: color + "15",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>
    </div>
  </div>
);

const ProgressBar = ({ value, color = COLORS.blue }) => (
  <div
    style={{
      height: 6,
      background: "#F1F5F9",
      borderRadius: 99,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${value}%`,
        background: color,
        borderRadius: 99,
        transition: "width 0.6s ease",
      }}
    />
  </div>
);

const Btn = ({
  children,
  onClick,
  variant = "primary",
  small,
  disabled,
  style = {},
}) => {
  const styles = {
    primary: {
      background: "#3B82F6",
      color: "white",
      border: "1px solid #3B82F6",
    },
    secondary: {
      background: "white",
      color: "#374151",
      border: "1px solid #E2E8F0",
    },
    ghost: {
      background: "transparent",
      color: "#64748B",
      border: "1px solid transparent",
    },
    danger: {
      background: "#FEF2F2",
      color: "#EF4444",
      border: "1px solid #FECACA",
    },
    success: {
      background: "#F0FDF4",
      color: "#10B981",
      border: "1px solid #A7F3D0",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: small ? "5px 12px" : "8px 16px",
        borderRadius: 7,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        transition: "all 0.15s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Modal = ({ title, children, onClose, width = 560 }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,0.5)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backdropFilter: "blur(4px)",
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: "white",
        borderRadius: 14,
        width: "100%",
        maxWidth: width,
        maxHeight: "90vh",
        overflow: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "Sora, sans-serif",
          }}
        >
          {title}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#94A3B8",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const FormField = ({ label, children, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        color: "#374151",
        marginBottom: 6,
        letterSpacing: "0.02em",
      }}
    >
      {label} {required && <span style={{ color: COLORS.red }}>*</span>}
    </label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text", style = {} }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #E2E8F0",
      borderRadius: 7,
      fontSize: 13,
      color: "#0F172A",
      outline: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
      background: "white",
      ...style,
    }}
  />
);

const Select = ({ value, onChange, children, style = {} }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #E2E8F0",
      borderRadius: 7,
      fontSize: 13,
      color: "#0F172A",
      outline: "none",
      fontFamily: "inherit",
      background: "white",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </select>
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    style={{
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #E2E8F0",
      borderRadius: 7,
      fontSize: 13,
      color: "#0F172A",
      outline: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
      resize: "vertical",
    }}
  />
);

const Table = ({ headers, children }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                fontWeight: 600,
                color: "#64748B",
                fontSize: 11,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const TR = ({ children, onClick, hover }) => {
  const [hov, setHov] = useState(false);
  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: "1px solid #F8FAFC",
        background: hov && hover ? "#F8FAFC" : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.1s",
      }}
    >
      {children}
    </tr>
  );
};

const TD = ({ children, muted, bold }) => (
  <td
    style={{
      padding: "11px 14px",
      color: muted ? "#94A3B8" : bold ? "#0F172A" : "#374151",
      fontWeight: bold ? 600 : 400,
      verticalAlign: "middle",
    }}
  >
    {children}
  </td>
);

const Notification = ({ notifs, onClear }) => (
  <div style={{ position: "relative" }}>
    <div
      style={{
        position: "absolute",
        top: -4,
        right: -4,
        background: COLORS.red,
        borderRadius: 99,
        width: 16,
        height: 16,
        display: notifs > 0 ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        color: "white",
        fontWeight: 700,
      }}
    >
      {notifs}
    </div>
    <button
      onClick={onClear}
      style={{
        background: "#F1F5F9",
        border: "none",
        borderRadius: 8,
        width: 36,
        height: 36,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
      }}
    >
      🔔
    </button>
  </div>
);

// ─── Views ────────────────────────────────────────────────────────────────────

function Dashboard({ timesheets, incidents, projects, employees ,currentUser}) {
  const thisWeek = getWeekDates();
  const billableHrs = timesheets
    .filter((t) => t.billable && t.status !== "draft")
    .reduce((a, b) => a + b.hours, 0);
  const nonBillableHrs = timesheets
    .filter((t) => !t.billable && t.status !== "draft")
    .reduce((a, b) => a + b.hours, 0);
  const pendingApprovals = timesheets.filter(
    (t) => t.status === "pending",
  ).length;
  const openIncidents = incidents.filter((i) => !i.resolved).length;

  const projectSummary = projects
    .filter((p) => p.status === "active")
    .map((p) => {
      const hrs = timesheets
        .filter((t) => t.projectId === p.id)
        .reduce((a, b) => a + b.hours, 0);
      return { ...p, loggedHours: hrs };
    });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "Sora, sans-serif",
          }}
        >
          Hello , {currentUser?.name?.split(" ")[0] || "there"} 👋
        </h2>
        <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
          Here's what's happening across your projects today.
        </p>
      </div>

      <div
        style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}
      >
        <KPICard
          label="Billable Hours"
          value={`${billableHrs}h`}
          sub="This period"
          color={COLORS.green}
          icon="💰"
        />
        <KPICard
          label="Non-Billable"
          value={`${nonBillableHrs}h`}
          sub="This period"
          color={COLORS.slate}
          icon="📋"
        />
        <KPICard
          label="Pending Approvals"
          value={pendingApprovals}
          sub="Need your review"
          color={COLORS.amber}
          icon="⏳"
        />
        <KPICard
          label="Active Projects"
          value={projects.filter((p) => p.status === "active").length}
          sub="Across all teams"
          color={COLORS.blue}
          icon="🗂️"
        />
        <KPICard
          label="Compliance Flags"
          value={openIncidents}
          sub="Open incidents"
          color={openIncidents > 0 ? COLORS.red : COLORS.green}
          icon="⚠️"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Project Hours */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #E2E8F0",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px",
              fontSize: 14,
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            Active Projects
          </h3>
          {projectSummary.map((p) => (
            <div key={p.id} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{ fontSize: 11, color: "#94A3B8", marginLeft: 8 }}
                  >
                    {p.client}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#64748B" }}>
                    {p.loggedHours}h / {p.budget}h
                  </span>
                  <StatusBadge
                    status={p.billable ? "billable" : "nonbillable"}
                  />
                </div>
              </div>
              <ProgressBar
                value={(p.loggedHours / p.budget) * 100}
                color={p.billable ? COLORS.green : COLORS.slate}
              />
            </div>
          ))}
        </div>

        {/* Pending Approvals */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #E2E8F0",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px",
              fontSize: 14,
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            Pending Approvals
          </h3>
          {timesheets.filter((t) => t.status === "pending").length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              ✅ All caught up!
            </div>
          ) : (
            timesheets
              .filter((t) => t.status === "pending")
              .map((ts) => {
                const emp = employees.find((e) => e.id === ts.employeeId);
                const proj = projects.find((p) => p.id === ts.projectId);
                return (
                  <div
                    key={ts.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    <Avatar
                      initials={emp?.avatar}
                      size={30}
                      color={COLORS.blue}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0F172A",
                        }}
                      >
                        {emp?.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>
                        {proj?.name} · {ts.hours}h · {fmt(ts.date)}
                      </div>
                    </div>
                    <StatusBadge status="pending" />
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Compliance Incidents */}
      {openIncidents > 0 && (
        <div
          style={{
            background: "#FFF7ED",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #FED7AA",
          }}
        >
          <h3
            style={{
              margin: "0 0 14px",
              fontSize: 14,
              fontWeight: 700,
              color: "#92400E",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ⚠️ Timesheet Compliance Issues
          </h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {incidents
              .filter((i) => !i.resolved)
              .map((inc) => {
                const emp = employees.find((e) => e.id === inc.employeeId);
                return (
                  <div
                    key={inc.id}
                    style={{
                      background: "white",
                      borderRadius: 8,
                      padding: "10px 14px",
                      border: "1px solid #FED7AA",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Avatar
                      initials={emp?.avatar}
                      size={28}
                      color={COLORS.amber}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#0F172A",
                        }}
                      >
                        {emp?.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>
                        Week of {fmt(inc.weekOf)} · {inc.chaseSent} chase
                        {inc.chaseSent !== 1 ? "s" : ""} sent
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Projects View ─────────────────────────────────────────────────────────
function ProjectsView({ projects, setProjects, employees, onSelectProject }) {
  const [showCreate, setShowCreate] = useState(false);
  const [newProj, setNewProj] = useState({
    name: "",
    code: "",
    client: "",
    billable: true,
    startDate: "",
    endDate: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const isEditMode = !!editingProject;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            }}
          >
            Projects
          </h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
            {projects.length} projects total
          </p>
        </div>
        <Btn
          onClick={() => {
            setEditingProject(null); // reset edit mode
            setNewProj({
              name: "",
              code: "",
              client: "",
              billable: true,
              startDate: "",
              endDate: "",
            });
            setShowCreate(true);
          }}
        >
          ➕ New Project
        </Btn>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {projects.map((p) => {
          const members = employees.filter((e) =>
            p.assignedMembers.includes(e.id),
          );
          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              style={{
                background: "white",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(59,130,246,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#94A3B8",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.code}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0F172A",
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 12,
                      color: "#94A3B8",
                    }}
                  >
                    {p.client}
                  </p>
                </div>

                {/* RIGHT SIDE: Billable + Edit Button */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StatusBadge
                    status={p.billable ? "billable" : "nonbillable"}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // IMPORTANT: prevents opening detail page
                      setEditingProject(p);
                      setNewProj({
                        name: p.name,
                        code: p.code,
                        client: p.client,
                        billable: p.billable,
                        startDate: p.startDate.split("T")[0],
                        endDate: p.endDate.split("T")[0],
                      });
                      setShowCreate(true);
                    }}
                    style={{
                      background: "#EFF6FF",
                      border: "1px solid #BFDBFE",
                      borderRadius: 6,
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#1D4ED8",
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();

                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this project?",
                      );

                      if (!confirmDelete) return;

                      try {
                        await deleteProject(p.id);

                        // Remove from UI
                        setProjects((prev) =>
                          prev.filter((proj) => proj.id !== p.id),
                        );
                      } catch (err) {
                        alert("Failed to delete project");
                        console.error(err);
                      }
                    }}
                    style={{
                      background: "#FEF2F2",
                      border: "1px solid #FECACA",
                      borderRadius: 6,
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#DC2626",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, color: "#64748B" }}>
                    Progress
                  </span>
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}
                  >
                    {p.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={p.progress}
                  color={p.status === "completed" ? COLORS.green : COLORS.blue}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: -6 }}>
                  {members.slice(0, 4).map((m, i) => (
                    <div
                      key={m.id}
                      style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }}
                    >
                      <Avatar
                        initials={m.avatar}
                        size={26}
                        color={COLORS.blue}
                      />
                    </div>
                  ))}
                  {members.length > 4 && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        marginLeft: 4,
                        alignSelf: "center",
                      }}
                    >
                      +{members.length - 4}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>
                  {fmt(p.startDate)} → {fmt(p.endDate)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showCreate && (
        <Modal
          title={isEditMode ? "Update Project" : "New Project"}
          onClose={() => {
            setShowCreate(false);
            setEditingProject(null);
            setNewProj({
              name: "",
              code: "",
              client: "",
              billable: true,
              startDate: "",
              endDate: "",
            });
          }}
        >
          <FormField label="Project Name" required>
            <Input
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
              placeholder="e.g. Phoenix Portal"
            />
          </FormField>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <FormField label="Project Code" required>
              <Input
                value={newProj.code}
                onChange={(e) =>
                  setNewProj({ ...newProj, code: e.target.value })
                }
                placeholder="PHX"
              />
            </FormField>
            <FormField label="Client">
              <Input
                value={newProj.client}
                onChange={(e) =>
                  setNewProj({ ...newProj, client: e.target.value })
                }
                placeholder="Client name"
              />
            </FormField>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <FormField label="Start Date">
              <Input
                type="date"
                value={newProj.startDate}
                onChange={(e) =>
                  setNewProj({ ...newProj, startDate: e.target.value })
                }
              />
            </FormField>
            <FormField label="End Date">
              <Input
                type="date"
                value={newProj.endDate}
                onChange={(e) =>
                  setNewProj({ ...newProj, endDate: e.target.value })
                }
              />
            </FormField>
          </div>
          <FormField label="Billable Type">
            <Select
              value={newProj.billable}
              onChange={(e) =>
                setNewProj({ ...newProj, billable: e.target.value === "true" })
              }
            >
              <option value="true">Billable</option>
              <option value="false">Non-Billable</option>
            </Select>
          </FormField>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Btn variant="secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </Btn>

            <Btn
              onClick={async () => {
                try {
                  const payload = {
                    ...newProj,
                    startDate: new Date(newProj.startDate).toISOString(),
                    endDate: new Date(newProj.endDate).toISOString(),
                  };

                  if (editingProject) {
                    // 🔵 UPDATE
                    const res = await fetch(
                      `https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api/projects/${editingProject.id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(payload),
                      },
                    );

                    if (!res.ok) {
                      throw new Error("Update failed");
                    }

                    // Immediately update UI using form data
                    setProjects((prev) =>
                      prev.map((proj) =>
                        proj.id === editingProject.id
                          ? {
                              ...proj,
                              ...payload,
                            }
                          : proj,
                      ),
                    );
                    //  console.log("PATCH response:", updated);
                  } else {
                    // 🟢 CREATE
                    const created = await createProject(payload);

                    const formatted = {
                      ...created,
                      status: created.status.toLowerCase(),
                      budget: created.budgetHours,
                      progress: 0,
                      assignedMembers: created.members || [],
                    };

                    setProjects((prev) => [...prev, formatted]);
                  }

                  setShowCreate(false);
                  setEditingProject(null);

                  setNewProj({
                    name: "",
                    code: "",
                    client: "",
                    billable: true,
                    startDate: "",
                    endDate: "",
                  });
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong");
                }
              }}
            >
              {editingProject ? "Update Project" : "Create Project"}
            </Btn>

            {/* <Btn
              onClick={async () => {
                try {
                  console.log("Creating project with data:", newProj);
                  // const created = await createProject(newProj);
                  const created = await createProject({
                    ...newProj,
                    startDate: new Date(newProj.startDate).toISOString(),
                    endDate: new Date(newProj.endDate).toISOString(),
                  });
                  console.log("Created project:", created);
                  const formatted = {
                    ...created,
                    status: created.status.toLowerCase(),
                    budget: created.budgetHours,
                    progress: 0,
                    assignedMembers: created.members || [],
                  };
                  // Add new project to state
                  setProjects((prev) => [...prev, formatted]);

                  setShowCreate(false);

                  setNewProj({
                    name: "",
                    code: "",
                    client: "",
                    billable: true,
                    startDate: "",
                    endDate: "",
                  });
                } catch (err) {
                  alert("Failed to create project");
                  console.error(err);
                }
              }}
            >
              Create Project
            </Btn> */}
            {/* <Btn
              onClick={async () => {
                try {
                  const res = await fetch(
                    "https://timetrack-pro-dje7dcctf5huh4fh.centralindia-01.azurewebsites.net/api/projects",
                    {
                      method: "POST", // 👈 changed to POST
                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1X3BtXzEiLCJpYXQiOjE3NzIwMjIyNTcsImV4cCI6MTc3MjEwODY1N30.oBV_ZzL7mC8kxYaJW0gNgbvfVdfOQwocdnHIlnvCKbI",
                      },
                      body: JSON.stringify({
                        name: "test1",
                        code: "345",
                        client: "test1",
                        billable: false,
                        // startDate: "2026-02-26",
                        // endDate: "2026-04-25",
                        startDate: "2026-02-26T00:00:00.000Z",
                        endDate: "2026-04-25T00:00:00.000Z",
                      }),
                    },
                  );

                  const data = await res.json();
                  console.log(data);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Test
            </Btn> */}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Project Detail View ─────────────────────────────────────────────────────
function ProjectDetail({ project, employees, tasks, onBack }) {
  const [activeTab, setActiveTab] = useState("wbs");
  const [showWBSModal, setShowWBSModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [task,setTask] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [members, setMembers] = useState([]);


  



  const [taskForm, setTaskForm] = useState({
  title: "",
  description: "",
  type: "TASK",
  milestone: "",
  assigneeId: "",
  startDate: "",
  endDate: "",
  estimatedHours: "",
  status: "NOT_STARTED",
  sortOrder: 0,
});
const loadTasks = async () => {
  const data = await fetchTasks(project.id);
  const taskArray = Array.isArray(data) ? data : data.data || [];

  const formatted = taskArray.map(task => ({
    id: task.id,
    title: task.title,
    type: task.type?.toLowerCase(),
    milestone: task.milestone,
    assignee: task.assigneeId,
    startDate: task.startDate,
    endDate: task.endDate,
    estimatedHours: task.estimatedHours,
    status: task.status?.toLowerCase().replace("_", ""),
    description: task.description,
    projectId: task.projectId,
  }));

  setTask(formatted);
};
 const handleCreate = async () => {
  const payload = {
    ...taskForm,
    projectId: project.id,
    startDate: new Date(taskForm.startDate).toISOString(),
    endDate: new Date(taskForm.endDate).toISOString(),
    estimatedHours: taskForm.estimatedHours ? Number(taskForm.estimatedHours) : null,
    sortOrder: Number(taskForm.sortOrder),
    assigneeId: taskForm.assigneeId || null,
  };
  const result = await createTasks(payload);
  await loadTasks();
  console.log(result);
 }

    useEffect(()=> {
      loadTasks();
    },[project.id]);

  

  useEffect(() => {
  loadMembers();
}, [project.id]);

const loadMembers = async () => {
  const res = await fetchProjectMembers(project.id);
  console.log("Raw members response:", res);

  const membersArray = Array.isArray(res)
    ? res
    : res?.data || res?.members || [];

  setMembers(membersArray);
};
  // const projTasks = tasks.filter((t) => t.projectId === project.id);
  const milestones = [
    ...new Set(task.filter((t) => t.milestone).map((t) => t.milestone)),
  ];
  // const members = employees.filter((e) =>
  //   project.assignedMembers.includes(e.id),
  // );

  const tabs = ["wbs", "team", "overview"];


  const handleAddMember = async (employeeId) => {
  const res = await addProjectMember(project.id, {
    employeeId,
    allocation: 100,
  });

  if (res.success) {
    loadMembers();
    setShowAddMember(false);
  } else {
    alert(res.error);
  }
};


const handleRemoveMember = async (memberId) => {
  if (!window.confirm("Remove this member?")) return;

  const res = await deleteProjectMember(memberId);

  if (res.success) {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  } else {
    alert(res.error);
  }
};

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <Btn variant="ghost" onClick={onBack} small>
          ← Back
        </Btn>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: "#0F172A",
                fontFamily: "Sora, sans-serif",
              }}
            >
              {project.name}
            </h2>
            <StatusBadge status={project.status} />
            <StatusBadge
              status={project.billable ? "billable" : "nonbillable"}
            />
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94A3B8" }}>
            {project.client} · {fmt(project.startDate)} – {fmt(project.endDate)}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: 0,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "8px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: activeTab === t ? "#3B82F6" : "#64748B",
              borderBottom:
                activeTab === t ? "2px solid #3B82F6" : "2px solid transparent",
              marginBottom: -1,
              fontFamily: "inherit",
              textTransform: "capitalize",
            }}
          >
            {t === "wbs" ? "WBS & Tasks" : t}
          </button>
        ))}
        {activeTab === "wbs" && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              paddingBottom: 8,
            }}
          >
            <Btn
              variant="secondary"
              small
              onClick={() => setShowWBSModal(true)}
            >
              📤 Upload WBS
            </Btn>
            <Btn small onClick={() => setShowAddTask(true)}>➕ Add Task</Btn>
          </div>
        )}
        {activeTab === "team" && (
          <div style={{ marginLeft: "auto", paddingBottom: 8 }}>
            <Btn small onClick={() => setShowAddMember(true)}>
              ➕ Add Member
            </Btn>
          </div>
        )}
      </div>

      {activeTab === "wbs" && (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          {milestones.map((ms) => (
            <div key={ms}>
              <div
                style={{
                  background: "#F8FAFC",
                  padding: "10px 16px",
                  borderBottom: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 14 }}>🏁</span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}
                >
                  {ms}
                </span>
              </div>
              {task
                .filter((t) => t.milestone === ms)
                .map((task) => {
                  const assigneeMember = members.find(
  (m) => m.employee?.id === task.assignee
);
const assignee = assigneeMember?.employee 
  ? {
      avatar: assigneeMember.employee.firstName[0],
      name: `${assigneeMember.employee.firstName} ${assigneeMember.employee.lastName}`,
    }
  : null;
                  return (
                    <div
                      key={task.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 16px",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      <div style={{ fontSize: 16 }}>
                        {task.type === "milestone" ? "🏁" : "📌"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#0F172A",
                          }}
                        >
                          {task.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#94A3B8",
                            marginTop: 2,
                          }}
                        >
                          {fmt(task.startDate)} → {fmt(task.endDate)}
                          {task.estimatedHours
                            ? ` · ${task.estimatedHours}h est.`
                            : ""}
                        </div>
                      </div>
                      {assignee && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Avatar
                            initials={assignee.avatar}
                            size={24}
                            color={COLORS.blue}
                          />
                          <span style={{ fontSize: 12, color: "#64748B" }}>
                            {assignee.name.split(" ")[0]}
                          </span>
                        </div>
                      )}
                      <StatusBadge status={task.status} />
                    </div>
                  );
                })}
            </div>
          ))}
          {task
            .filter((t) => !t.milestone)
            .map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  borderBottom: "1px solid #F8FAFC",
                }}
              >
                <div style={{ fontSize: 16 }}>🏁</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}
                  >
                    {task.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                    {fmt(task.startDate)}
                  </div>
                </div>
                <StatusBadge status="milestone" />
                <StatusBadge status={task.status} />
              </div>
            ))}
        </div>
      )}

      {activeTab === "team" && (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          {/* <Table headers={["Member", "Role", "Type", "Allocation", "Actions"]}>
           
            {members.map((m) => (
              <TR key={m.id} hover>
                <TD>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar initials={m.avatar} size={32} color={COLORS.blue} />
                    <div>
                      <div style={{ fontWeight: 600, color: "#0F172A" }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>
                        {m.email}
                      </div>
                    </div>
                  </div>
                </TD>
                <TD muted>{m.role}</TD>
                <TD>
                  <StatusBadge status={m.type} />
                </TD>
                <TD>
                  {m.type === "fulltime" ? (
                    <span style={{ fontSize: 12, color: COLORS.green }}>
                      Auto-logged (8h/day)
                    </span>
                  ) : (
                    <span style={{ fontSize: 12, color: COLORS.amber }}>
                      AI Chaser Active
                    </span>
                  )}
                </TD>
                <TD>
                  <Btn variant="ghost" small>
                    Remove
                  </Btn>
                </TD>
              </TR>
            ))}
          </Table> */}

          <Table headers={["Member", "Role", "Type", "Allocation", "Actions"]}>
           
           {members.map((m) => (
            <TR key={m.id} hover>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={m.employee.firstName[0]} size={32} color={COLORS.blue} />
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {m.employee.firstName} {m.employee.lastName}
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>
                      {m.employee.email}
                    </div>
                  </div>
                </div>
              </TD>

              <TD muted>{m.role || "Member"}</TD>

              <TD>
                {m.allocation}%
              </TD>

              <TD>
                <Btn
                  variant="ghost"
                  small
                  onClick={() => handleRemoveMember(m.id)}
                >
                 Remove
                  </Btn>
                </TD>
              </TR>
            ))}
          </Table>
          {showAddMember && (
          <Modal title="Add Member" onClose={() => setShowAddMember(false)}>
            {employees.map((emp) => (
              <div
                key={emp.id}
                style={{
                  padding: 10,
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
                onClick={() => handleAddMember(emp.id)}
              >
                {emp.name} ({emp.email})
              </div>
            ))}
          </Modal>
        )}
        </div>
      )}

      {activeTab === "overview" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #E2E8F0",
            }}
          >
            <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>
              Project Details
            </h4>
            {[
              ["Code", project.code],
              ["Client", project.client],
              ["Start Date", fmt(project.startDate)],
              ["End Date", fmt(project.endDate)],
              ["Budget", `${project.budget}h`],
              ["Billable", project.billable ? "Yes" : "No"],
              ["Status", project.status],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #F8FAFC",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "#64748B", fontWeight: 500 }}>{k}</span>
                <span style={{ color: "#0F172A", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #E2E8F0",
            }}
          >
            <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>
              Progress
            </h4>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#3B82F6",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                {project.progress}%
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 16 }}>
                Overall Completion
              </div>
              <ProgressBar value={project.progress} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  fontSize: 12,
                  color: "#94A3B8",
                }}
              >
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWBSModal && (
        <Modal title="Upload WBS" onClose={() => setShowWBSModal(false)}>
          <div
            style={{
              border: "2px dashed #E2E8F0",
              borderRadius: 10,
              padding: "32px 20px",
              textAlign: "center",
              marginBottom: 16,
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#3B82F6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#E2E8F0")
            }
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
            <div style={{ fontWeight: 600, color: "#374151", marginBottom: 4 }}>
              Drop your WBS file here
            </div>
            <div style={{ fontSize: 12, color: "#94A3B8" }}>
              Supports .xlsx, .csv formats
            </div>
          </div>
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Expected columns:
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {[
                "Task Name",
                "Type (task/milestone)",
                "Milestone",
                "Assignee Email",
                "Start Date",
                "End Date",
                "Est. Hours",
              ].map((c) => (
                <span
                  key={c}
                  style={{
                    background: "white",
                    border: "1px solid #E2E8F0",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowWBSModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={() => setShowWBSModal(false)}>Upload & Import</Btn>
          </div>
        </Modal>
      )}
      {showAddTask && (
  <Modal title="Add Task" onClose={() => setShowAddTask(false)}>
    <FormField label="Title" required>
      <Input
        value={taskForm.title}
        onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
        placeholder="e.g. Build Login Page"
      />
    </FormField>

    <FormField label="Description">
      <Textarea
        value={taskForm.description}
        onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
        placeholder="Task description"
      />
    </FormField>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <FormField label="Type">
        <Select
          value={taskForm.type}
          onChange={e => setTaskForm({ ...taskForm, type: e.target.value })}
        >
          <option value="TASK">Task</option>
          <option value="MILESTONE">Milestone</option>
        </Select>
      </FormField>

      <FormField label="Status">
        <Select
          value={taskForm.status}
          onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
        >
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
      </FormField>
    </div>

    <FormField label="Milestone">
      <Input
        value={taskForm.milestone}
        onChange={e => setTaskForm({ ...taskForm, milestone: e.target.value })}
        placeholder="e.g. M1 - Foundation"
      />
    </FormField>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <FormField label="Start Date" required>
        <Input
          type="date"
          value={taskForm.startDate}
          onChange={e => setTaskForm({ ...taskForm, startDate: e.target.value })}
        />
      </FormField>

      <FormField label="End Date" required>
        <Input
          type="date"
          value={taskForm.endDate}
          onChange={e => setTaskForm({ ...taskForm, endDate: e.target.value })}
        />
      </FormField>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <FormField label="Estimated Hours">
        <Input
          type="number"
          value={taskForm.estimatedHours}
          onChange={e => setTaskForm({ ...taskForm, estimatedHours: e.target.value })}
          placeholder="16"
        />
      </FormField>

      <FormField label="Sort Order">
        <Input
          type="number"
          value={taskForm.sortOrder}
          onChange={e => setTaskForm({ ...taskForm, sortOrder: e.target.value })}
          placeholder="0"
        />
      </FormField>
    </div>
    <div>
      <FormField label="Assignee">
  <Select
    value={taskForm.assigneeId}
    onChange={e => setTaskForm({ ...taskForm, assigneeId: e.target.value })
  }
  >
    <option value="">Select assignee</option>
    {members.map((m) => (
      <option key={m.employee.id} value={m.employee.id}>
        {m.employee.firstName} {m.employee.lastName}
      </option>
    ))}
  </Select>
</FormField>
    </div>
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
      <Btn variant="secondary" onClick={() => setShowAddTask(false)}>Cancel</Btn>
      <Btn
        onClick={ async () => {
          console.log("task form data:", { projectId: project.id, ...taskForm });
          await handleCreate();
          setShowAddTask(false);
        }}
        disabled={!taskForm.title || !taskForm.startDate || !taskForm.endDate}
      >
        Create Task
      </Btn>
    </div>
  </Modal>
)}
    </div>
    
  );
}

// ─── Timesheets View ──────────────────────────────────────────────────────────
function TimesheetView({
  timesheets,
  setTimesheets,
  projects,
  tasks,
  employees,
  currentUser,
}) {
  console.log("USER ID:", currentUser?.id);
  console.log(
    "TS employeeIds:",
    timesheets.map((t) => t.employeeId),
  );

  console.log("Timesheet Projects:", projects);
  console.log("CurrentUser:", currentUser);
  console.log("All Timesheets:", timesheets);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    projectName: "",
    taskId: "",
    hours: "",
    description: "",
    date: "",
    billable: true,
  });
  const [viewMode, setViewMode] = useState("mine"); // mine | team
  const [editingEntry, setEditingEntry] = useState(null);

  const weekDates = getWeekDates(weekOffset);
  const weekStart = weekDates[0].toISOString().split("T")[0];

  const mySheets = timesheets.filter((t) => t.employeeId === currentUser.id);

  const totalLogged = mySheets.reduce((a, b) => a + b.hours, 0);
  const isCurrentWeek = weekOffset === 0;
  const hasSubmitted = mySheets.some(
    (t) => t.status === "pending" || t.status === "approved",
  );

  const handleAdd = async () => {
    try {
      const payload = {
        projectId: newEntry.projectId,
        taskId: newEntry.taskId || undefined,
        date: new Date(newEntry.date).toISOString(),
        hours: Number(newEntry.hours),
        description: newEntry.description,
        billable: newEntry.billable,
      };

      if (editingEntry) {
        // 🔵 UPDATE
        const updated = await updateTimesheet(editingEntry.id, payload);

        const formatted = {
          id: updated.id,
          employeeId: updated.userId,
          projectId: updated.projectId,
          taskId: updated.taskId,
          date: updated.date.split("T")[0],
          hours: updated.hours,
          description: updated.description,
          billable: updated.billable,
          status: updated.status.toLowerCase(),
          weekOf: updated.weekStart.split("T")[0], // 🔥 ADD THIS
        };

        setTimesheets((prev) =>
          prev.map((t) => (t.id === editingEntry.id ? formatted : t)),
        );

        setEditingEntry(null);
      } else {
        // 🟢 CREATE
        const created = await createTimesheet(payload);

        const formatted = {
          id: created.id,
          employeeId: created.userId,
          projectId: created.projectId,
          taskId: created.taskId,
          date: created.date.split("T")[0],
          hours: created.hours,
          description: created.description,
          billable: created.billable,
          status: created.status.toLowerCase(),
          weekOf: created.weekStart.split("T")[0], // 🔥 ADD
        };
        setTimesheets((prev) => [...prev, formatted]);
      }

      // Reset form
      setNewEntry({
        projectId: "",
        taskId: "",
        hours: "",
        description: "",
        date: "",
        billable: true,
      });

      setShowAddEntry(false);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const draftEntry = timesheets.find(
        (t) => t.employeeId === currentUser.id && t.status === "draft",
      );

      if (!draftEntry) {
        alert("No draft entries to submit");
        return;
      }

      const weekStart = draftEntry.weekOf;

      await submitTimesheet(weekStart);

      setTimesheets((prev) =>
        prev.map((t) =>
          t.employeeId === currentUser.id && t.weekOf === weekStart
            ? { ...t, status: "submitted" }
            : t,
        ),
      );
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            }}
          >
            Timesheets
          </h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
            {fmtFull(weekDates[0])} – {fmtFull(weekDates[6])}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              background: "#F1F5F9",
              borderRadius: 8,
              padding: 2,
            }}
          >
            {["mine", "team"].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{
                  padding: "6px 14px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: viewMode === m ? "white" : "transparent",
                  color: viewMode === m ? "#0F172A" : "#64748B",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  boxShadow:
                    viewMode === m ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {m === "mine" ? "My Timesheet" : "Team View"}
              </button>
            ))}
          </div>
          <Btn
            variant="secondary"
            small
            onClick={() => setWeekOffset((w) => w - 1)}
          >
            ← Prev
          </Btn>
          <Btn
            variant="secondary"
            small
            onClick={() => setWeekOffset(0)}
            disabled={isCurrentWeek}
          >
            Today
          </Btn>
          <Btn
            variant="secondary"
            small
            onClick={() => setWeekOffset((w) => w + 1)}
          >
            Next →
          </Btn>
        </div>
      </div>

      {viewMode === "mine" ? (
        <>
          {/* Week Summary */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 20,
              background: "white",
              borderRadius: 12,
              padding: 16,
              border: "1px solid #E2E8F0",
            }}
          >
            {weekDates.map((d) => {
              const dayStr = d.toISOString().split("T")[0];
              const daySheets = mySheets.filter((t) => t.date === dayStr);
              const hrs = daySheets.reduce((a, b) => a + b.hours, 0);
              const isToday = dayStr === TODAY.toISOString().split("T")[0];
              const isWeekend = d.getDay() === 0 || d.getDay() === 6;
              return (
                <div
                  key={dayStr}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 4px",
                    borderRadius: 8,
                    background: isToday ? "#EFF6FF" : "transparent",
                    border: isToday
                      ? "1px solid #BFDBFE"
                      : "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {dayName(d)}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color:
                        hrs === 0
                          ? isWeekend
                            ? "#E2E8F0"
                            : "#FCA5A5"
                          : hrs >= 8
                            ? COLORS.green
                            : COLORS.amber,
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {hrs > 0 ? hrs : isWeekend ? "–" : "0"}
                  </div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>hrs</div>
                </div>
              );
            })}
            <div style={{ width: 1, background: "#E2E8F0", margin: "0 8px" }} />
            <div style={{ textAlign: "center", padding: "10px 16px" }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#94A3B8",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                TOTAL
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                {totalLogged}
              </div>
              <div style={{ fontSize: 10, color: "#94A3B8" }}>/ 40h</div>
            </div>
          </div>

          {/* Entries Table */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <Table
              headers={[
                "Date",
                "Project",
                "Task",
                "Description",
                "Hours",
                "Billable",
                "Status",
                "",
              ]}
            >
              {mySheets.length === 0 ? (
                <TR>
                  <td
                    colSpan={8}
                    style={{
                      padding: 32,
                      textAlign: "center",
                      color: "#94A3B8",
                      fontSize: 13,
                    }}
                  >
                    No entries for this week. Add your first entry.
                  </td>
                </TR>
              ) : (
                mySheets.map((ts) => {
                  const proj = projects.find((p) => p.id === ts.projectId);
                  const task = tasks.find((t) => t.id === ts.taskId);
                  return (
                    <TR key={ts.id} hover>
                      <TD muted>{fmt(ts.date)}</TD>
                      <TD bold>{proj?.name || "–"}</TD>
                      <TD muted>{task?.title || "–"}</TD>
                      <TD muted>{ts.description}</TD>
                      <TD bold>{ts.hours}h</TD>
                      <TD>
                        <StatusBadge
                          status={ts.billable ? "billable" : "nonbillable"}
                        />
                      </TD>
                      <TD>
                        <StatusBadge status={ts.status} />
                      </TD>
                      <TD>
                        {ts.status === "draft" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <Btn
                              variant="ghost"
                              small
                              onClick={() => {
                                setEditingEntry(ts);
                                setNewEntry({
                                  projectId: ts.projectId,
                                  taskId: ts.taskId || "",
                                  hours: ts.hours,
                                  description: ts.description || "",
                                  date: ts.date,
                                  billable: ts.billable,
                                });
                                setShowAddEntry(true);
                              }}
                            >
                              Edit
                            </Btn>

                            <Btn
                              variant="danger"
                              small
                              onClick={async () => {
                                const confirmDelete = window.confirm(
                                  "Delete this timesheet entry?",
                                );
                                if (!confirmDelete) return;

                                try {
                                  await deleteTimesheet(ts.id);

                                  setTimesheets((prev) =>
                                    prev.filter((t) => t.id !== ts.id),
                                  );
                                } catch (err) {
                                  alert("Delete failed");
                                  console.error(err);
                                }
                              }}
                            >
                              Delete
                            </Btn>
                          </div>
                        )}
                      </TD>
                    </TR>
                  );
                })
              )}
            </Table>
          </div>

          <div
            style={{ display: "flex", gap: 8, justifyContent: "space-between" }}
          >
            <Btn
              variant="secondary"
              onClick={() => {
                setEditingEntry(null); // 🔥 reset edit mode
                setNewEntry({
                  projectId: "",
                  taskId: "",
                  hours: "",
                  description: "",
                  date: "",
                  billable: true,
                });
                setShowAddEntry(true);
              }}
            >
              ➕ Add Entry
            </Btn>
            <div style={{ display: "flex", gap: 8 }}>
              {mySheets.some((t) => t.status === "draft") && (
                <Btn variant="success" onClick={handleSubmit}>
                  ✅ Submit for Approval
                </Btn>
              )}
              {hasSubmitted && (
                <Badge
                  label={`${mySheets.filter((t) => t.status === "approved").length} approved`}
                  color={COLORS.green}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        /* Team View */
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <Table
            headers={[
              "Employee",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Total",
              "Status",
            ]}
          >
            {employees.map((emp) => {
              const empSheets = timesheets.filter(
                (t) =>
                  t.employeeId === emp.id &&
                  weekDates.some(
                    (d) => d.toISOString().split("T")[0] === t.date,
                  ),
              );
              const dailyHrs = weekDates.slice(0, 5).map((d) => {
                const dayStr = d.toISOString().split("T")[0];
                return empSheets
                  .filter((t) => t.date === dayStr)
                  .reduce((a, b) => a + b.hours, 0);
              });
              const total = dailyHrs.reduce((a, b) => a + b, 0);
              const hasApproval = empSheets.some((t) => t.status === "pending");
              return (
                <TR key={emp.id} hover>
                  <TD>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Avatar
                        initials={emp.avatar}
                        size={28}
                        color={COLORS.blue}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>
                          {emp.name}
                        </div>
                        <StatusBadge status={emp.type} />
                      </div>
                    </div>
                  </TD>
                  {dailyHrs.map((h, i) => (
                    <TD key={i} muted={h === 0}>
                      <span
                        style={{
                          color:
                            h === 0
                              ? "#FCA5A5"
                              : h >= 8
                                ? COLORS.green
                                : COLORS.amber,
                          fontWeight: h > 0 ? 600 : 400,
                        }}
                      >
                        {h > 0 ? `${h}h` : "–"}
                      </span>
                    </TD>
                  ))}
                  <TD bold>{total}h</TD>
                  <TD>
                    {hasApproval ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <Btn
                          variant="success"
                          small
                          onClick={() =>
                            setTimesheets((prev) =>
                              prev.map((t) =>
                                t.employeeId === emp.id &&
                                t.status === "pending"
                                  ? { ...t, status: "approved" }
                                  : t,
                              ),
                            )
                          }
                        >
                          ✓
                        </Btn>
                        <Btn
                          variant="danger"
                          small
                          onClick={() =>
                            setTimesheets((prev) =>
                              prev.map((t) =>
                                t.employeeId === emp.id &&
                                t.status === "pending"
                                  ? { ...t, status: "rejected" }
                                  : t,
                              ),
                            )
                          }
                        >
                          ✗
                        </Btn>
                      </div>
                    ) : total === 0 ? (
                      <StatusBadge status="draft" />
                    ) : (
                      <StatusBadge
                        status={empSheets[0]?.status || "approved"}
                      />
                    )}
                  </TD>
                </TR>
              );
            })}
          </Table>
        </div>
      )}

      {showAddEntry && (
        <Modal
          title={editingEntry ? "Edit Time Entry" : "Add Time Entry"}
          onClose={() => {
            setShowAddEntry(false);
            setEditingEntry(null);
          }}
        >
          <FormField label="Date" required>
            <Input
              type="date"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
            />
          </FormField>
          <FormField label="Project" required>
            <Select
              value={newEntry.projectId}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  projectId: e.target.value,
                  taskId: "",
                })
              }
            >
              <option value="">Select project</option>
              {projects
                // .filter(
                //   (p) =>
                //     p.status === "active" &&
                //     p.assignedMembers.includes(currentUser.id),
                // )
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </Select>
          </FormField>
          {newEntry.projectId && (
            <FormField label="Task">
              <Select
                value={newEntry.taskId}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, taskId: e.target.value })
                }
              >
                <option value="">Select task</option>
                {tasks
                  .filter((t) => t.projectId === newEntry.projectId)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
              </Select>
            </FormField>
          )}
          <FormField label="Hours" required>
            <Input
              type="number"
              value={newEntry.hours}
              onChange={(e) =>
                setNewEntry({ ...newEntry, hours: e.target.value })
              }
              placeholder="8"
            />
          </FormField>
          <FormField label="Description">
            <Textarea
              value={newEntry.description}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
              placeholder="What did you work on?"
            />
          </FormField>
          <FormField label="Billable">
            <Select
              value={newEntry.billable}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  billable: e.target.value === "true",
                })
              }
            >
              <option value="true">Billable</option>
              <option value="false">Non-Billable</option>
            </Select>
          </FormField>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setShowAddEntry(false)}>
              Cancel
            </Btn>
            <Btn
              onClick={handleAdd}
              disabled={
                !newEntry.date || !newEntry.projectId || !newEntry.hours
              }
            >
              Save Entry
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Team View ────────────────────────────────────────────────────────────────
function TeamView({ employees, incidents }) {
  const [showSync, setShowSync] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSync = () => {  
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => setShowSync(false), 1500);
    }, 2000);
  };

  const getEmployeeIncidents = (empId) =>
    incidents.filter((i) => i.employeeId === empId && !i.resolved).length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            }}
          >
            Team Members
          </h2>
          <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
            Synced from Keka HR · {employees.length} members
          </p>
        </div>
        <Btn variant="secondary" onClick={() => setShowSync(true)}>
          🔄 Sync from Keka
        </Btn>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <Table
          headers={[
            "Employee",
            "Department",
            "Role",
            "Type",
            "Keka ID",
            "Compliance",
            "Actions",
          ]}
        >
          {employees.map((emp) => {
            const openIncidents = getEmployeeIncidents(emp.id);
            return (
              <TR key={emp.id} hover>
                <TD>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar
                      initials={emp.avatar}
                      size={36}
                      color={COLORS.blue}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "#0F172A" }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>
                        {emp.email}
                      </div>
                    </div>
                  </div>
                </TD>
                <TD muted>{emp.department}</TD>
                <TD muted style={{ textTransform: "capitalize" }}>
                  {emp.role}
                </TD>
                <TD>
                  <StatusBadge status={emp.type} />
                </TD>
                <TD muted>{emp.kekaId}</TD>
                <TD>
                  {openIncidents > 0 ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: COLORS.red,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      ⚠️ {openIncidents} open
                    </span>
                  ) : (
                    <span
                      style={{
                        color: COLORS.green,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      ✅ Clear
                    </span>
                  )}
                </TD>
                <TD>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn variant="ghost" small>
                      View
                    </Btn>
                    {emp.type === "parttime" && (
                      <Btn variant="secondary" small>
                        📩 Chase
                      </Btn>
                    )}
                  </div>
                </TD>
              </TR>
            );
          })}
        </Table>
      </div>

      {showSync && (
        <Modal title="Sync from Keka" onClose={() => setShowSync(false)}>
          {!syncing && !synced ? (
            <>
              <div
                style={{
                  background: "#EFF6FF",
                  borderRadius: 8,
                  padding: 14,
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#1D4ED8",
                }}
              >
                🔗 Connected to Keka API · Last synced: 2 hours ago
              </div>
              <p style={{ fontSize: 13, color: "#374151", margin: "0 0 16px" }}>
                This will sync employee data from Keka including names,
                departments, roles, and employment type. Existing records will
                be updated.
              </p>
              <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <Btn variant="secondary" onClick={() => setShowSync(false)}>
                  Cancel
                </Btn>
                <Btn onClick={handleSync}>Start Sync</Btn>
              </div>
            </>
          ) : syncing ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 12,
                  animation: "spin 1s linear infinite",
                }}
              >
                🔄
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
                Syncing from Keka...
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                Fetching employee records
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
              <div
                style={{ fontSize: 14, fontWeight: 600, color: COLORS.green }}
              >
                Sync Complete!
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                {employees.length} records updated
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── Reports View ─────────────────────────────────────────────────────────────
function ReportsView({ timesheets, employees, projects, incidents }) {
  const [activeReport, setActiveReport] = useState("utilization");

  const approvedSheets = timesheets.filter(
    (t) => t.status === "approved" || t.status === "pending",
  );
  const totalHrs = approvedSheets.reduce((a, b) => a + b.hours, 0);
  const billableHrs = approvedSheets
    .filter((t) => t.billable)
    .reduce((a, b) => a + b.hours, 0);
  const nonBillableHrs = approvedSheets
    .filter((t) => !t.billable)
    .reduce((a, b) => a + b.hours, 0);

  const byEmployee = employees.map((emp) => {
    const sheets = approvedSheets.filter((t) => t.employeeId === emp.id);
    const billable = sheets
      .filter((t) => t.billable)
      .reduce((a, b) => a + b.hours, 0);
    const nonBillable = sheets
      .filter((t) => !t.billable)
      .reduce((a, b) => a + b.hours, 0);
    const empIncidents = incidents.filter((i) => i.employeeId === emp.id);
    return {
      ...emp,
      billable,
      nonBillable,
      total: billable + nonBillable,
      incidentCount: empIncidents.length,
    };
  });

  const byProject = projects.map((p) => {
    const sheets = approvedSheets.filter((t) => t.projectId === p.id);
    const total = sheets.reduce((a, b) => a + b.hours, 0);
    const utilizationPct = ((total / p.budget) * 100).toFixed(1);
    return { ...p, logged: total, utilizationPct };
  });

  const reportTabs = [
    { id: "utilization", label: "Resource Utilization" },
    { id: "billability", label: "Billable / Non-Billable" },
    { id: "project", label: "Project Summary" },
    { id: "compliance", label: "Compliance" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "Sora, sans-serif",
          }}
        >
          Reports
        </h2>
        <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
          Analytics across all projects and team members
        </p>
      </div>

      {/* Summary KPIs */}
      <div
        style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}
      >
        <KPICard
          label="Total Hours"
          value={`${totalHrs}h`}
          color={COLORS.blue}
          icon="⏱️"
        />
        <KPICard
          label="Billable"
          value={`${billableHrs}h`}
          sub={`${((billableHrs / totalHrs) * 100).toFixed(0)}% of total`}
          color={COLORS.green}
          icon="💰"
        />
        <KPICard
          label="Non-Billable"
          value={`${nonBillableHrs}h`}
          sub={`${((nonBillableHrs / totalHrs) * 100).toFixed(0)}% of total`}
          color={COLORS.slate}
          icon="📋"
        />
        <KPICard
          label="Compliance Issues"
          value={incidents.filter((i) => !i.resolved).length}
          color={COLORS.amber}
          icon="⚠️"
        />
      </div>

      {/* Report Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: 0,
        }}
      >
        {reportTabs.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveReport(r.id)}
            style={{
              padding: "8px 14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: activeReport === r.id ? "#3B82F6" : "#64748B",
              borderBottom:
                activeReport === r.id
                  ? "2px solid #3B82F6"
                  : "2px solid transparent",
              marginBottom: -1,
              fontFamily: "inherit",
            }}
          >
            {r.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", paddingBottom: 8 }}>
          <Btn variant="secondary" small>
            📥 Export CSV
          </Btn>
        </div>
      </div>

      {activeReport === "utilization" && (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <Table
            headers={[
              "Employee",
              "Type",
              "Total Hours",
              "Billable",
              "Non-Billable",
              "Billability %",
              "Incidents",
            ]}
          >
            {byEmployee
              .sort((a, b) => b.total - a.total)
              .map((emp) => (
                <TR key={emp.id} hover>
                  <TD>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Avatar
                        initials={emp.avatar}
                        size={30}
                        color={COLORS.blue}
                      />
                      <span style={{ fontWeight: 600 }}>{emp.name}</span>
                    </div>
                  </TD>
                  <TD>
                    <StatusBadge status={emp.type} />
                  </TD>
                  <TD bold>{emp.total}h</TD>
                  <TD>
                    <span style={{ color: COLORS.green, fontWeight: 600 }}>
                      {emp.billable}h
                    </span>
                  </TD>
                  <TD muted>{emp.nonBillable}h</TD>
                  <TD>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div style={{ flex: 1, maxWidth: 80 }}>
                        <ProgressBar
                          value={
                            emp.total ? (emp.billable / emp.total) * 100 : 0
                          }
                          color={COLORS.green}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        {emp.total
                          ? ((emp.billable / emp.total) * 100).toFixed(0)
                          : 0}
                        %
                      </span>
                    </div>
                  </TD>
                  <TD>
                    {emp.incidentCount > 0 ? (
                      <Badge
                        label={`${emp.incidentCount}`}
                        color={COLORS.red}
                        small
                      />
                    ) : (
                      <span style={{ color: COLORS.green, fontSize: 12 }}>
                        ✅
                      </span>
                    )}
                  </TD>
                </TR>
              ))}
          </Table>
        </div>
      )}

      {activeReport === "billability" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Visual breakdown */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            }}
          >
            <h4 style={{ margin: "0 0 20px", fontSize: 14, fontWeight: 700 }}>
              Hours Breakdown
            </h4>
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Billable", value: billableHrs, color: COLORS.green },
                {
                  label: "Non-Billable",
                  value: nonBillableHrs,
                  color: COLORS.slate,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    flex: 1,
                    background: item.color + "08",
                    border: `1px solid ${item.color}22`,
                    borderRadius: 10,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: item.color,
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {item.value}h
                  </div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: item.color,
                      marginTop: 8,
                    }}
                  >
                    {((item.value / totalHrs) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                height: 20,
                borderRadius: 99,
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(billableHrs / totalHrs) * 100}%`,
                  background: COLORS.green,
                }}
              />
              <div style={{ flex: 1, background: COLORS.slate + "44" }} />
            </div>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            }}
          >
            <h4 style={{ margin: "0 0 20px", fontSize: 14, fontWeight: 700 }}>
              By Project
            </h4>
            {byProject
              .filter((p) => p.logged > 0)
              .map((p) => (
                <div key={p.id} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {p.name}
                    </span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "#64748B" }}>
                        {p.logged}h
                      </span>
                      <StatusBadge
                        status={p.billable ? "billable" : "nonbillable"}
                      />
                    </div>
                  </div>
                  <ProgressBar
                    value={parseFloat(p.utilizationPct)}
                    color={p.billable ? COLORS.green : COLORS.slate}
                  />
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                    {p.utilizationPct}% of {p.budget}h budget used
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeReport === "project" && (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <Table
            headers={[
              "Project",
              "Client",
              "Status",
              "Budget",
              "Logged",
              "Remaining",
              "Utilization",
              "Billable",
            ]}
          >
            {byProject.map((p) => (
              <TR key={p.id} hover>
                <TD bold>{p.name}</TD>
                <TD muted>{p.client}</TD>
                <TD>
                  <StatusBadge status={p.status} />
                </TD>
                <TD muted>{p.budget}h</TD>
                <TD bold>{p.logged}h</TD>
                <TD muted>{Math.max(0, p.budget - p.logged)}h</TD>
                <TD>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div style={{ width: 60 }}>
                      <ProgressBar
                        value={parseFloat(p.utilizationPct)}
                        color={
                          parseFloat(p.utilizationPct) > 90
                            ? COLORS.red
                            : COLORS.blue
                        }
                      />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {p.utilizationPct}%
                    </span>
                  </div>
                </TD>
                <TD>
                  <StatusBadge
                    status={p.billable ? "billable" : "nonbillable"}
                  />
                </TD>
              </TR>
            ))}
          </Table>
        </div>
      )}

      {activeReport === "compliance" && (
        <div>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
            }}
          >
            <Table
              headers={[
                "Employee",
                "Type",
                "Week Of",
                "Chases Sent",
                "Status",
                "Incident #",
              ]}
            >
              {incidents.map((inc, idx) => {
                const emp = employees.find((e) => e.id === inc.employeeId);
                return (
                  <TR key={inc.id} hover>
                    <TD>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Avatar
                          initials={emp?.avatar}
                          size={28}
                          color={COLORS.amber}
                        />
                        <span style={{ fontWeight: 600 }}>{emp?.name}</span>
                      </div>
                    </TD>
                    <TD muted>Missing Timesheet</TD>
                    <TD muted>{fmt(inc.weekOf)}</TD>
                    <TD>
                      <span
                        style={{
                          color: inc.chaseSent >= 3 ? COLORS.red : COLORS.amber,
                          fontWeight: 600,
                        }}
                      >
                        {inc.chaseSent} / 3
                      </span>
                    </TD>
                    <TD>
                      <StatusBadge
                        status={inc.resolved ? "approved" : "pending"}
                      />
                    </TD>
                    <TD muted>INC-{String(idx + 1).padStart(4, "0")}</TD>
                  </TR>
                );
              })}
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Settings View ────────────────────────────────────────────────────────────
function SettingsView() {
  const [kekaToken, setKekaToken] = useState("••••••••••••••••");
  const [teamsWebhook, setTeamsWebhook] = useState(
    "https://outlook.webhook.office.com/...",
  );
  const [chaseAfter, setChaseAfter] = useState("5");
  const [maxChases, setMaxChases] = useState("3");
  const [saved, setSaved] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProjects();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "Sora, sans-serif",
          }}
        >
          Settings
        </h2>
        <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 14 }}>
          Configure integrations, notifications, and role policies
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Keka Integration */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 24,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#DBEAFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🔗
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                Keka HR Integration
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: COLORS.green,
                  }}
                />
                <span style={{ fontSize: 11, color: COLORS.green }}>
                  Connected
                </span>
              </div>
            </div>
          </div>
          <FormField label="API Token">
            <Input
              value={kekaToken}
              onChange={(e) => setKekaToken(e.target.value)}
              type="password"
            />
          </FormField>
          <FormField label="Base URL">
            <Input
              value="https://api.keka.com/v1"
              readOnly
              style={{ background: "#F8FAFC" }}
            />
          </FormField>
          <FormField label="Auto-sync Schedule">
            <Select value="daily">
              <option>Daily at 6 AM</option>
              <option>Every 12 hours</option>
              <option>Manual only</option>
            </Select>
          </FormField>
          <Btn variant="secondary">Test Connection</Btn>
        </div>

        {/* Notifications */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 24,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#F3E8FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🔔
            </div>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
              Notification Settings
            </h3>
          </div>
          <FormField label="MS Teams Webhook URL">
            <Input
              value={teamsWebhook}
              onChange={(e) => setTeamsWebhook(e.target.value)}
            />
          </FormField>
          <FormField label="Chase after (working days without entry)">
            <Input
              type="number"
              value={chaseAfter}
              onChange={(e) => setChaseAfter(e.target.value)}
            />
          </FormField>
          <FormField label="Max chase notifications per week">
            <Input
              type="number"
              value={maxChases}
              onChange={(e) => setMaxChases(e.target.value)}
            />
          </FormField>
          <FormField label="AI Chase Channel">
            <Select>
              <option>MS Teams + Email</option>
              <option>MS Teams only</option>
              <option>Email only</option>
            </Select>
          </FormField>
        </div>

        {/* Roles */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 24,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🔐
            </div>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
              Role Permissions
            </h3>
          </div>
          {[
            {
              role: "Admin",
              permissions: ["All access", "Manage roles", "Override anything"],
            },
            {
              role: "Project Manager",
              permissions: [
                "Manage projects",
                "Approve timesheets",
                "View all reports",
                "Override entries",
              ],
            },
            {
              role: "Employee",
              permissions: [
                "Fill timesheet",
                "View own data",
                "View assigned projects",
              ],
            },
          ].map((r) => (
            <div
              key={r.role}
              style={{
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#0F172A",
                  marginBottom: 6,
                }}
              >
                {r.role}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.permissions.map((p) => (
                  <Badge key={p} label={p} color={COLORS.slate} small />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Agent */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 24,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🤖
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                AI Timesheet Agent
              </h3>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>
                Powered by Claude AI
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#F0FDF4",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              fontSize: 13,
              color: "#166534",
            }}
          >
            ✅ Agent is active · Chasing 2 part-time employees this week
          </div>
          <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 14px" }}>
            The AI agent automatically sends personalized chase messages to
            part-time employees when timesheets are overdue. Users can reply
            directly from Teams or Outlook to fill their timesheet via
            conversation.
          </p>
          <FormField label="Claude API Key">
            <Input value="sk-ant-•••••••••••••••" type="password" />
          </FormField>
          <FormField label="Chase Message Tone">
            <Select>
              <option>Friendly</option>
              <option>Formal</option>
              <option>Urgent</option>
            </Select>
          </FormField>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Btn variant="secondary">Preview Message</Btn>
            <Btn>Save Config</Btn>
          </div>
        </div>
      </div>

      {saved && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: COLORS.green,
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
          }}
        >
          ✅ Settings saved
        </div>
      )}
    </div>
  );
}

// ─── AI Chase Notification Demo ────────────────────────────────────────────
function AIChasePanel({ onClose, employees, incidents }) {
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState("");

  const openInc = incidents.filter((i) => !i.resolved);
  const emp = employees.find((e) => e.id === openInc[0]?.employeeId);

  const steps = [
    {
      label: "AI Compose",
      content: `Hi ${emp?.name?.split(" ")[0] || "there"}! 👋\n\nI noticed your timesheet for the week of Apr 28 hasn't been submitted yet. Could you quickly log your hours?\n\nSimply reply with:\n• Project name\n• Hours worked\n• Brief description\n\nYou can fill it right here in Teams! I'll take care of the rest. 😊\n\n— TimeTrack AI`,
    },
    { label: "Employee Reply", content: reply },
    {
      label: "AI Parsed",
      content: `✅ Got it! I've logged the following entries for you:\n\n📌 Phoenix Portal - API work: 4h (billable)\n📌 DataLake Migration - Planning: 2h (non-billable)\n\nTotal: 6h for week of Apr 28\n\nSubmitting for your manager's approval now!`,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        width: 380,
        background: "white",
        borderRadius: 14,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        border: "1px solid #E2E8F0",
        overflow: "hidden",
        zIndex: 500,
      }}
    >
      <div
        style={{
          background: "#0F172A",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#3B82F6",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>
              TimeTrack AI Agent
            </div>
            <div style={{ color: "#64748B", fontSize: 11 }}>
              Chasing: {emp?.name}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            color: "#64748B",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#94A3B8",
              marginBottom: 8,
              letterSpacing: "0.06em",
            }}
          >
            TEAMS MESSAGE PREVIEW
          </div>
          {step >= 0 && (
            <div
              style={{
                background: "#EFF6FF",
                borderRadius: 10,
                borderTopLeftRadius: 2,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>
                TimeTrack AI · just now
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#1E3A5F",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {steps[0].content}
              </div>
            </div>
          )}
          {step >= 1 && (
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 10,
                borderTopRightRadius: 2,
                padding: 12,
                marginBottom: 8,
                marginLeft: 24,
              }}
            >
              <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>
                {emp?.name} · 2m ago
              </div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                Phoenix Portal 4h API work, DataLake 2h planning
              </div>
            </div>
          )}
          {step >= 2 && (
            <div
              style={{
                background: "#F0FDF4",
                borderRadius: 10,
                borderTopLeftRadius: 2,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>
                TimeTrack AI · just now
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#166534",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {steps[2].content}
              </div>
            </div>
          )}
        </div>

        {step === 0 && (
          <Btn
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => setStep(1)}
          >
            📤 Send Chase Message
          </Btn>
        )}
        {step === 1 && (
          <div>
            <Input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Simulate employee reply..."
            />
            <Btn
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={() => setStep(2)}
            >
              ✅ Parse & Log Hours
            </Btn>
          </div>
        )}
        {step === 2 && (
          <Btn
            variant="success"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={onClose}
          >
            🎉 Done · Close
          </Btn>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  {
    id: "projects",
    label: "Projects",
    icon: "🗂️",
    sub: [
      { id: "projects-onboarding",  label: "MonkRadar Onboarding",         icon: "🚀" },
      { id: "projects-transition",  label: "Management Service Transition", icon: "🔁" },
      { id: "projects-closure",     label: "Project Closure",               icon: "🏁" },
    ],
  },
  { id: "timesheets", label: "Timesheets", icon: "⏱️" },
  { id: "team",       label: "Team",       icon: "👥" },
  { id: "reports",    label: "Reports",    icon: "📈" },
  { id: "settings",   label: "Settings",   icon: "⚙️" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });

  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });
  const {instance , accounts, inprogress} = useMsal();
 
  useEffect(() => {
    if (inprogress === InteractionStatus.None) {
      instance.handleRedirectPromise().catch(console.error);
    }
  }, [inprogress, instance]);
   const msalAccount = accounts[0];
  const user = msalAccount ? {
    id: msalAccount.localAccountId,
    name: msalAccount.name || msalAccount.username,
    email: msalAccount.username,
    role: "pm",
    avatar: (msalAccount.name || msalAccount.username)
      .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
  } : null;

  const [activeView, setActiveView] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const [timesheets, setTimesheets] = useState([]);
  const [incidents] = useState(MOCK_INCIDENTS);
  const [notifCount, setNotifCount] = useState(3);
  const [showAIChase, setShowAIChase] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);



  useEffect(() => {
  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();

      // const data = await res.json();
      console.log("Employees API response:", data);

      const formatted = (data || []).map((e) => {
        const name =
          e.name ||
          `${e.firstName || ""} ${e.lastName || ""}`.trim() ||
          "Unknown";

        return {
          id: e.id,
          name: name,
          email: e.email,
          role: e.role,
          department: e.department,
          type: e.type,
          kekaId: e.employeeNumber,
          avatar: name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
        };
      });

      setEmployees(formatted);
    } catch (err) {
      console.error("Failed to load employees", err);
    }
  };
  loadEmployees();
}, []);

//Project-member
// useEffect(() => {
//   loadMembers();
// }, [project.id]);

// const loadMembers = async () => {
//   const res = await fetchProjectMembers(project.id);

//   if (res.success) {
//     setMembers(res.data);
//   }
// };



//*********** */
  useEffect(() => {
    const loadTimesheets = async () => {
      try {
        const data = await fetchTimesheets();
        console.log("Raw timesheet data from API:", data); // Debug log
        const formatted = data.map((t) => ({
          id: t.id,
          employeeId: t.userId, // 🔥 important
          projectId: t.projectId,
          taskId: t.taskId,
          date: t.date.split("T")[0], // remove time
          hours: t.hours,
          description: t.description,
          billable: t.billable,
          status: t.status.toLowerCase(), // 🔥 important
          weekOf: t.weekStart.split("T")[0],
          project: t.project, // keep relation if needed
          user: t.user,
        }));
        console.log("Formatted timesheet data:", formatted); // Debug log
        setTimesheets(formatted);
      } catch (err) {
        console.error("Failed to load timesheets", err);
      }
    };

    loadTimesheets();
  }, []);
const loadProjects=async()=> {
      try {
        console.log("load")
        
        const apiProjects = await fetchProjects();
        const formatted = apiProjects.map((p) => ({
          ...p,
          status: p.status.toLowerCase(), // ACTIVE -> active
          budget: p.budgetHours,
          progress: 0, // until calculated
          assignedMembers: p.members || [],
        }));
        setProjects(formatted);
      } catch (err) {
        console.error(err);
      }
    }
   
  useEffect(() => {
     loadProjects();
  },[]);
  useEffect(() => {
  if (inprogress === InteractionStatus.None && accounts.length > 0) {
    instance.acquireTokenSilent({
      scopes: ["openid", "profile", "email", "User.Read"],
      account: accounts[0],
    }).then(response => {
      console.log("=== ACCESS TOKEN ===");
      console.log(response.accessToken);
    }).catch(err => {
      console.error("Token error:", err);
    });
  }
}, [inprogress, accounts, instance]);

useEffect(() => {
  
  if (accounts.length === 0) return;
    
  console.log("full account:", accounts[0]); // 👈 add this

  const email = accounts[0].username;
  console.log("email:", email); 
    

    fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email , password:"Azure_Ad_user"}),
    })
    .then(res => res.json())
    .then(data => {
  console.log("backend response:", data); // 👈 check this
  
  localStorage.setItem("token", data.token);
  loadProjects();
});  
}, [accounts]);

  // const handleSelectProject = (p) => {
  //   setSelectedProject(p);
  //   setActiveView("projectDetail");
  // };

  const handleSelectProject = async (p) => {
    setSelectedProject(p);
    setActiveView("projectDetail");
    try {
       const data = await fetchTasks(p.id);
       console.log("data : ",data);
    } catch(err) {
      console.log(err);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <Dashboard
            timesheets={timesheets}
            incidents={incidents}
            projects={projects}
             employees={employees}
            currentUser = {user}
          />
        );
      // case "projects":
      //   return (
      //     <ProjectsView
      //       projects={projects}
      //       setProjects={setProjects}
      //       onSelectProject={handleSelectProject}
      //       employees={employees}
      //     />
      //   );
      case "projects":
  return (
    <ProjectsView
      projects={projects}
      setProjects={setProjects}
      onSelectProject={handleSelectProject}
      employees={employees}
    />
  );

case "projects-onboarding":
  return <OnBoardingMonkRadar/>;

case "projects-transition":
  return (
    <div style={{ margin: "-28px" }}>
      <ManagedServicesTransition
        initialValues={{}}
        onSubmit={(data) => console.log("MS Transition:", data)}
      />
    </div>
  );

case "projects-closure":
  return <ProjectClosure />;
      // case "projects": return <ProjectsView projects={MOCK_PROJECTS} employees={MOCK_EMPLOYEES} onSelectProject={handleSelectProject} />;
      case "projectDetail":
        return (
          <ProjectDetail
            project={selectedProject}
            employees={employees}
            tasks={MOCK_TASKS}
            onBack={() => setActiveView("projects")}
          />
        );
      case "timesheets":
        return (
          <TimesheetView
            timesheets={timesheets}
            setTimesheets={setTimesheets}
            projects={projects}
            tasks={MOCK_TASKS}
            employees={employees}
            currentUser={user}
          />
        );
      case "team":
        return <TeamView employees={employees} incidents={incidents} />;
      case "reports":
        return (
          <ReportsView
            timesheets={timesheets}
            employees={employees}
            projects={projects}
            incidents={incidents}
          />
        );
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  // if (!user) {
  //   return <Login onLogin={setUser} />;
  // }

  return (
    <>
    <AuthenticatedTemplate>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; background: #F8FAFC; }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            background: "#0F172A",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "22px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#3B82F6",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                ⏱
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "Sora, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  TimeTrack
                </div>
                <div
                  style={{ color: "#475569", fontSize: 10, fontWeight: 500 }}
                >
                  Pro
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "12px 10px", overflow: "auto" }}>
  {NAV_ITEMS.map((item) => {
    const isParentActive =
      activeView === item.id ||
      (activeView === "projectDetail" && item.id === "projects") ||
      (item.sub && item.sub.some((s) => s.id === activeView));

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            // 👇 parent always navigates to its own id, not sub[0]
            setActiveView(item.id);
            setSelectedProject(null);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "9px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: isParentActive ? "#1E293B" : "transparent",
            color: isParentActive ? "white" : "#64748B",
            fontSize: 13,
            fontWeight: isParentActive ? 600 : 400,
            marginBottom: 2,
            fontFamily: "inherit",
            transition: "all 0.15s",
            boxShadow: isParentActive
              ? "inset 0 0 0 1px rgba(59,130,246,0.3)"
              : "none",
          }}
          onMouseEnter={(e) => {
            if (!isParentActive) {
              e.currentTarget.style.background = "#1E293B";
              e.currentTarget.style.color = "#CBD5E1";
            }
          }}
          onMouseLeave={(e) => {
            if (!isParentActive) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748B";
            }
          }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}

          {/* Arrow — rotates when parent is active */}
          {item.sub && (
            <span style={{
              marginLeft: "auto",
              fontSize: 9,
              color: "#64748B",
              display: "inline-block",
              transition: "transform 0.2s",
              transform: isParentActive ? "rotate(90deg)" : "rotate(0deg)",
            }}>
              ▶
            </span>
          )}

          {/* Reports badge */}
          {item.id === "reports" &&
            incidents.filter((i) => !i.resolved).length > 0 && (
              <span style={{
                marginLeft: "auto",
                background: COLORS.red,
                color: "white",
                borderRadius: 99,
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
              }}>
                {incidents.filter((i) => !i.resolved).length}
              </span>
            )}
        </button>

        {/* Sub-nav dropdown — expands when parent is active */}
        {item.sub && isParentActive && (
          <div style={{
            marginLeft: 14,
            marginBottom: 4,
            borderLeft: "1px solid #1E293B",
            paddingLeft: 8,
          }}>
            {item.sub.map((sub) => {
              const isSubActive = activeView === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveView(sub.id);
                    setSelectedProject(null);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    background: isSubActive ? "#1E3A5F" : "transparent",
                    color: isSubActive ? "#93C5FD" : "#64748B",
                    fontSize: 12,
                    fontWeight: isSubActive ? 600 : 400,
                    marginBottom: 1,
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    textAlign: "left",
                    borderLeft: `2px solid ${isSubActive ? "#3B82F6" : "transparent"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubActive) {
                      e.currentTarget.style.background = "#1E293B";
                      e.currentTarget.style.color = "#CBD5E1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#64748B";
                    }
                  }}
                >
                  <span style={{ fontSize: 12 }}>{sub.icon}</span>
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  })}

  {/* AI Agent Button — keep as is */}
  <div style={{ margin: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
    <button
      onClick={() => setShowAIChase(true)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "9px 12px",
        borderRadius: 8,
        border: "1px solid rgba(59,130,246,0.3)",
        cursor: "pointer",
        background: "rgba(59,130,246,0.08)",
        color: "#93C5FD",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "inherit",
      }}
    >
      <span style={{ fontSize: 16 }}>🤖</span>
      AI Chase Agent
      <span style={{
        marginLeft: "auto",
        background: COLORS.amber,
        color: "white",
        borderRadius: 99,
        padding: "1px 6px",
        fontSize: 9,
        fontWeight: 700,
      }}>
        2 pending
      </span>
    </button>
  </div>
</nav>

          {/* User */}
          {/* User */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 8,
              }}
            >
              <Avatar
                initials={user?.name?.slice(0, 2).toUpperCase() || "U"}
                size={30}
                color="#3B82F6"
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{ color: "#E2E8F0", fontSize: 12, fontWeight: 600 }}
                >
                  {user?.name || "User"}
                </div>
                <div style={{ color: "#475569", fontSize: 10 }}>
                  {user?.role || "Member"}
                </div>
              </div>

              <button
                // onClick={() => {
                //   localStorage.removeItem("token");
                //   localStorage.removeItem("user");
                //   setUser(null);
                // }}
                onClick={() => {
                  localStorage.removeItem("token");
                  // setUser(null)
  instance.logoutRedirect({ postLogoutRedirectUri: "http://localhost:3000" })
}}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              background: "white",
              borderBottom: "1px solid #E2E8F0",
              padding: "12px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div
                style={{
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: "#1D4ED8",
                  fontWeight: 600,
                }}
              >
                🔗 Keka: Connected
              </div>
              {/* <TestAPI/> */}
              <Notification
                notifs={notifCount}
                onClear={() => setNotifCount(0)}
              />
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
            {renderView()}
          </div>
        </div>
      </div>

      {showAIChase && (
        <AIChasePanel
          onClose={() => setShowAIChase(false)}
          employees={MOCK_EMPLOYEES}
          incidents={incidents}
        />
      )}
      </AuthenticatedTemplate>
       <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}