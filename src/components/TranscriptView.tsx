"use client";

import React from "react";
import { STUDENT_PROFILE, COURSES_4TH_SEM } from "../data/student-data";

export default function TranscriptView() {
  const totalCredits     = COURSES_4TH_SEM.reduce((a, c) => a + c.credits, 0);
  const totalGradePoints = COURSES_4TH_SEM.reduce((a, c) => a + c.points * c.credits, 0);
  const sgpa = (totalGradePoints / totalCredits).toFixed(2);

  const gradeColor = (g: string) => {
    if (g.startsWith("A")) return "#d97706";
    if (g.startsWith("B")) return "#2563eb";
    if (g === "F")          return "#ef4444";
    return "#374151";
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Semester + Print */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ position: "relative" }}>
          <select style={{
            padding: "8px 36px 8px 14px",
            background: "#2c5282", color: "#fff",
            border: "1px solid #1a365d", borderRadius: "4px",
            fontSize: "13px", fontWeight: "700", cursor: "pointer", appearance: "none",
          }}>
            <option>Spring 2026</option>
          </select>
          <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#fff", pointerEvents: "none" }}>▾</span>
        </div>
        <button onClick={() => window.print()}
          className="no-print"
          style={{
            padding: "8px 18px", background: "#1a365d", color: "#fff",
            border: "none", borderRadius: "4px", fontWeight: "700",
            fontSize: "13px", cursor: "pointer",
          }}>
          🖨 Print Transcript
        </button>
      </div>

      <div className="print-container print-page" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}>

        {/* Summary header matching Image 4 */}
        <div style={{
          background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
          padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "8px",
        }}>
          <h2 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>Spring 2026</h2>
          <div style={{ display: "flex", gap: "20px", fontSize: "12px", fontWeight: "600", color: "#475569" }}>
            <span>Cr. Att:<strong style={{ color: "#1e293b", marginLeft: "4px" }}>{totalCredits}</strong></span>
            <span>Cr. Ernd:<strong style={{ color: "#1e293b", marginLeft: "4px" }}>{totalCredits}</strong></span>
            <span>CGPA:<strong style={{ color: "#004b87", marginLeft: "4px" }}>{STUDENT_PROFILE.cgpa}</strong></span>
            <span>SGPA:<strong style={{ color: "#004b87", marginLeft: "4px" }}>{STUDENT_PROFILE.sgpa}</strong></span>
          </div>
        </div>

        {/* Transcript table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#0093DD", color: "#fff" }}>
              {["Course Code","Course Name","Section","CrdHrs","Grade","Points","Type","Remarks"].map(h => (
                <th key={h} style={{
                  padding: "10px 14px", textAlign: "left",
                  fontWeight: "700", fontSize: "11px", textTransform: "uppercase",
                  borderRight: "1px solid #0081c2",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSES_4TH_SEM.map((c, i) => (
              <tr key={c.code} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e8edf2" }}>
                <td style={{ padding: "10px 14px", fontWeight: "700", color: "#0093DD", fontFamily: "monospace", borderRight: "1px solid #e8edf2" }}>{c.code}</td>
                <td style={{ padding: "10px 14px", color: "#1e293b", maxWidth: "180px", borderRight: "1px solid #e8edf2" }}>{c.title}</td>
                <td style={{ padding: "10px 14px", color: "#475569", borderRight: "1px solid #e8edf2" }}>{c.section}</td>
                <td style={{ padding: "10px 14px", fontWeight: "600", color: "#1e293b", borderRight: "1px solid #e8edf2" }}>{c.credits}</td>
                <td style={{ padding: "10px 14px", fontWeight: "700", color: gradeColor(c.grade), borderRight: "1px solid #e8edf2" }}>{c.grade}</td>
                <td style={{ padding: "10px 14px", color: "#374151", borderRight: "1px solid #e8edf2" }}>{c.points}</td>
                <td style={{ padding: "10px 14px", color: "#64748b", fontSize: "11px", borderRight: "1px solid #e8edf2" }}>Core</td>
                <td style={{ padding: "10px 14px", color: "#94a3b8", fontSize: "11px" }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Scroll to top */}
        <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", padding: "12px 20px" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#0093DD", color: "#fff", border: "none",
              fontWeight: "700", fontSize: "16px", cursor: "pointer",
            }}>↑</button>
        </div>
      </div>
    </div>
  );
}
