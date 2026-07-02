"use client";

import React from "react";
import { STUDENT_PROFILE, COURSES_4TH_SEM, ATTENDANCE_DATA } from "../data/student-data";

export default function DashboardView() {
  const totalCredits     = COURSES_4TH_SEM.reduce((a, c) => a + c.credits, 0);
  const totalGradePoints = COURSES_4TH_SEM.reduce((a, c) => a + c.points * c.credits, 0);
  const sgpa = (totalGradePoints / totalCredits).toFixed(2);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Welcome banner */}
      <div style={{
        background: "#1a365d", borderRadius: "4px",
        padding: "18px 22px", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: "700", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "1px" }}>
            Student Portal — Spring 2026
          </p>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
            Hello Mr <span style={{ color: "#f59e0b" }}>{STUDENT_PROFILE.name}</span>
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#94a3b8" }}>
            {STUDENT_PROFILE.rollNo} • {STUDENT_PROFILE.campus}
          </p>
        </div>
        <span style={{
          padding: "4px 12px", background: "#22c55e20",
          border: "1px solid #22c55e50", borderRadius: "20px",
          color: "#4ade80", fontSize: "11px", fontWeight: "700",
        }}>Active Session</span>
      </div>

      {/* Stats cards */}
      <div className="responsive-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        {[
          { label: "CGPA", value: STUDENT_PROFILE.cgpa, color: "#1a365d" },
          { label: "SGPA", value: STUDENT_PROFILE.sgpa, color: "#1a365d" },
          { label: "Cr. Attempted", value: totalCredits, color: "#374151" },
          { label: "Fee Status", value: "Paid", color: "#16a34a" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", border: "1px solid #e2e8f0",
            borderRadius: "4px", padding: "16px 18px",
          }}>
            <p style={{ margin: "0 0 4px", fontSize: "10px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {s.label}
            </p>
            <p style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Registered Courses table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ background: "#1a365d", padding: "10px 16px", color: "#fff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Registered Courses — Spring 2026
        </div>
        <div className="responsive-table-wrap">
          <table className="responsive-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#0093DD", color: "#fff" }}>
              {["Course Code","Course Title","Section","Cr. Hrs","Attendance","Type"].map(h => (
                <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", borderRight: "1px solid #0081c2" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSES_4TH_SEM.map((c, i) => {
              const att = ATTENDANCE_DATA.find(a => a.courseCode === c.code);
              const pct = att ? att.percentage : 100;
              const barColor = pct < 80 ? "#ef4444" : pct < 85 ? "#f59e0b" : "#22c55e";

              return (
                <tr key={c.code} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e8edf2" }}>
                  <td style={{ padding: "9px 14px", fontWeight: "700", color: "#0093DD", fontFamily: "monospace", borderRight: "1px solid #e8edf2" }}>{c.code}</td>
                  <td style={{ padding: "9px 14px", color: "#1e293b", borderRight: "1px solid #e8edf2" }}>{c.title}</td>
                  <td style={{ padding: "9px 14px", color: "#475569", borderRight: "1px solid #e8edf2" }}>{c.section}</td>
                  <td style={{ padding: "9px 14px", fontWeight: "600", color: "#1e293b", borderRight: "1px solid #e8edf2" }}>{c.credits}</td>
                  <td style={{ padding: "9px 14px", borderRight: "1px solid #e8edf2" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, height: "10px", background: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: barColor,
                          backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,0.2) 3px,rgba(255,255,255,0.2) 6px)" }} />
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: pct < 80 ? "#ef4444" : "#374151", whiteSpace: "nowrap" }}>
                        {pct.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 14px", color: "#64748b", fontSize: "11px" }}>{c.type}</td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
