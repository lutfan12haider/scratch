"use client";

import React from "react";
import { STUDENT_PROFILE, COURSES_4TH_SEM, COURSES_FALL_2025 } from "../data/student-data";

export default function TranscriptView() {
  const semesterSections = [
    { title: "Spring 2026", courses: COURSES_4TH_SEM },
    { title: "Fall 2025", courses: COURSES_FALL_2025 },
  ];

  const getSemesterSummary = (title: string, courses: typeof COURSES_4TH_SEM) => {
    const totalCredits = courses.reduce((a, c) => a + c.credits, 0);
    const gradePoints = courses.reduce((a, c) => a + c.points * c.credits, 0);
    const computedSgpa = (gradePoints / totalCredits).toFixed(2);

    return {
      totalCredits,
      sgpa: title === "Spring 2026" ? STUDENT_PROFILE.sgpa.toFixed(2) : computedSgpa,
      cgpa: title === "Spring 2026" ? STUDENT_PROFILE.cgpa.toFixed(2) : STUDENT_PROFILE.cgpa.toFixed(2),
    };
  };

  const gradeColor = (g: string) => {
    if (g.startsWith("A")) return "#d97706";
    if (g.startsWith("B")) return "#2563eb";
    if (g === "F")          return "#ef4444";
    return "#374151";
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Semester + Print */}
      <div className="responsive-action-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>Official Academic Transcript</div>
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

      {semesterSections.map((section) => {
        const summary = getSemesterSummary(section.title, section.courses);

        return (
          <div key={section.title} className="print-container print-page" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
            <div className="responsive-summary-bar" style={{
              background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
              padding: "12px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "8px",
            }}>
              <h2 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>Semester: {section.title}</h2>
              <div style={{ display: "flex", gap: "20px", fontSize: "12px", fontWeight: "600", color: "#475569" }}>
                <span>Cr. Att:<strong style={{ color: "#1e293b", marginLeft: "4px" }}>{summary.totalCredits}</strong></span>
                <span>Cr. Ernd:<strong style={{ color: "#1e293b", marginLeft: "4px" }}>{summary.totalCredits}</strong></span>
                <span>CGPA:<strong style={{ color: "#004b87", marginLeft: "4px" }}>{summary.cgpa}</strong></span>
                <span>SGPA:<strong style={{ color: "#004b87", marginLeft: "4px" }}>{summary.sgpa}</strong></span>
              </div>
            </div>

            <div className="responsive-table-wrap">
              <table className="responsive-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
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
                {section.courses.map((c, i) => (
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
            </div>
          </div>
        );
      })}

      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", padding: "12px 20px" }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#0093DD", color: "#fff", border: "none",
            fontWeight: "700", fontSize: "16px", cursor: "pointer",
          }}>↑</button>
      </div>
    </div>
  );
}
