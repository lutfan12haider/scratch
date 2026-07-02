"use client";

import React from "react";
import {
  Home,
  Calendar,
  FileText,
  GraduationCap,
  BookOpen,
  LogOut,
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/student-data";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard",   label: "Home",         icon: Home },
    { id: "courses",     label: "Registration", icon: BookOpen },
    { id: "attendance",  label: "Attendance",   icon: Calendar },
    { id: "marks",       label: "Marks",        icon: FileText },
    { id: "transcript",  label: "Transcript",   icon: GraduationCap },
  ];

  return (
    <aside className="no-print flex-shrink-0 responsive-sidebar" style={{
      width: "200px",
      minHeight: "100vh",
      background: "#111622",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #1a2035",
    }}>
      {/* Avatar / Profile block */}
      <div style={{
        padding: "24px 16px 20px",
        borderBottom: "1px solid #1a2035",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "8px",
      }}>
        <div style={{
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          background: "#1e2a3a",
          border: "2px solid #2d3a4e",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}>LH</div>
        <div>
          <p style={{ color: "#e2e8f0", fontSize: "11px", fontWeight: "600", margin: 0, lineHeight: "1.4" }}>
            {STUDENT_PROFILE.name}
          </p>
          <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "monospace", margin: "2px 0 0" }}>
            {STUDENT_PROFILE.rollNo}
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="responsive-sidebar-nav" style={{ flex: 1, paddingTop: "8px" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                background: isActive ? "#161c2b" : "transparent",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                borderLeft: isActive ? "3px solid #d97706" : "3px solid transparent",
                color: isActive ? "#d97706" : "#94a3b8",
                fontWeight: isActive ? "700" : "500",
                fontSize: "11px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.8px",
                cursor: "pointer",
                textAlign: "left" as const,
                transition: "all 0.15s",
              }}
            >
              <Icon size={14} color={isActive ? "#d97706" : "#d97706"} style={{ opacity: isActive ? 1 : 0.5 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid #1a2035" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "8px",
            background: "rgba(220,38,38,0.1)",
            border: "1px solid rgba(220,38,38,0.2)",
            borderRadius: "4px",
            color: "#f87171",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <LogOut size={12} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
