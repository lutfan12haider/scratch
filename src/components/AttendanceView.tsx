"use client";

import React, { useState } from "react";
import { COURSES_4TH_SEM, ATTENDANCE_DATA } from "../data/student-data";

export default function AttendanceView() {
  const [selectedCode, setSelectedCode] = useState("CL2001");

  const att  = ATTENDANCE_DATA.find(a => a.courseCode === selectedCode)!;
  const crs  = COURSES_4TH_SEM.find(c => c.code === selectedCode)!;
  const pct  = att.percentage;
  const barColor = pct < 80 ? "#ef4444" : pct < 85 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}>

        {/* Header bar with course tabs */}
        <div style={{
          background: "#1a365d", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "8px",
        }}>
          <span style={{ color: "#fff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Registered Courses
          </span>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {COURSES_4TH_SEM.map(c => (
              <button key={c.code} onClick={() => setSelectedCode(c.code)}
                style={{
                  padding: "4px 10px",
                  background: selectedCode === c.code ? "#0093DD" : "transparent",
                  color: "#fff",
                  border: selectedCode === c.code ? "1px solid #60b4e8" : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  fontSize: "11px", fontWeight: "700",
                  cursor: "pointer",
                }}>
                {c.code}
              </button>
            ))}
          </div>
        </div>

        {/* Course title + percentage bar */}
        <div style={{
          padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #e2e8f0", flexWrap: "wrap", gap: "12px",
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
            {crs.code}-{crs.title} ({crs.section})
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", color: "#475569", fontWeight: "600" }}>Attendance Percentage:</span>
            <span style={{
              background: barColor, color: "#fff",
              padding: "2px 10px", borderRadius: "3px",
              fontWeight: "700", fontSize: "12px",
            }}>{pct.toFixed(2)}%</span>
            {/* Striped progress bar */}
            <div style={{ width: "120px", height: "16px", backgroundColor: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                width: `${pct}%`, height: "100%", backgroundColor: barColor,
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)",
              }} />
            </div>
          </div>
        </div>

        {/* Attendance detail table matching screenshot exactly */}
        <div style={{ padding: "16px 20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#0093DD", color: "#fff" }}>
                {["Lecture No","Date","Duration (In Hours)","Presence"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", fontWeight: "700",
                    fontSize: "11px", textTransform: "uppercase",
                    textAlign: "center", letterSpacing: "0.3px",
                    borderRight: "1px solid #0081c2",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {att.records.map((rec, i) => (
                <tr key={rec.lectureNo}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e8edf2" }}>
                  <td style={{ padding: "8px 14px", textAlign: "center", color: "#374151", borderRight: "1px solid #e8edf2" }}>
                    {rec.lectureNo}
                  </td>
                  <td style={{ padding: "8px 14px", textAlign: "center", color: "#374151", borderRight: "1px solid #e8edf2" }}>
                    {rec.date}
                  </td>
                  <td style={{ padding: "8px 14px", textAlign: "center", color: "#374151", borderRight: "1px solid #e8edf2" }}>
                    {rec.duration}
                  </td>
                  <td style={{ padding: "8px 14px", textAlign: "center", fontWeight: "700", fontSize: "14px" }}>
                    {rec.status === "Present"
                      ? <span style={{ color: "#0093DD" }}>P</span>
                      : <span style={{ color: "#ef4444" }}>A</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
