"use client";

import React, { useState } from "react";
import { COURSES_4TH_SEM, MARKS_DATA } from "../data/student-data";

export default function MarksView() {
  const [selectedCode, setSelectedCode] = useState("CL2001");

  const marks = MARKS_DATA.find(m => m.courseCode === selectedCode)!;
  const crs   = COURSES_4TH_SEM.find(c => c.code === selectedCode)!;

  const total = marks.items.reduce((a, b) => a + b.obtainedMarks, 0);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Semester selector */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <div style={{ position: "relative" }}>
          <select style={{
            padding: "8px 36px 8px 14px",
            background: "#2c5282", color: "#fff",
            border: "1px solid #1a365d", borderRadius: "4px",
            fontSize: "13px", fontWeight: "700",
            cursor: "pointer", appearance: "none",
          }}>
            <option>Spring 2026</option>
          </select>
          <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#fff", pointerEvents: "none" }}>▾</span>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "4px", overflow: "hidden" }}>

        {/* Header with course tabs */}
        <div style={{
          background: "#1a365d", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "8px",
        }}>
          <span style={{ color: "#fff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Student Marks
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

        <div style={{ padding: "16px 20px" }}>
          {/* Course label */}
          <h3 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
            {crs.code}-{crs.title} ({crs.section})
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#0093DD", fontWeight: "600" }}>
            Component-wise Marks (Total: 100)
          </p>

          {/* Marks table */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#0093DD", color: "#fff" }}>
                {["Component","Total Marks","Obtained Marks","Class Average","Minimum","Maximum"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", textAlign: "center",
                    fontWeight: "700", fontSize: "11px", textTransform: "uppercase",
                    borderRight: "1px solid #0081c2", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marks.items.map((item, i) => (
                <tr key={item.component} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e8edf2" }}>
                  <td style={{ padding: "9px 14px", fontWeight: "600", color: "#1e293b", borderRight: "1px solid #e8edf2" }}>
                    {item.component}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "center", color: "#374151", borderRight: "1px solid #e8edf2" }}>
                    {item.totalMarks}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "center", fontWeight: "700", color: "#1a365d", borderRight: "1px solid #e8edf2" }}>
                    {item.obtainedMarks}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "center", color: "#475569", borderRight: "1px solid #e8edf2" }}>
                    {item.classAverage}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "center", color: "#ef4444", borderRight: "1px solid #e8edf2" }}>
                    {item.classMin}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "center", color: "#16a34a" }}>
                    {item.classMax}
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr style={{ background: "#f0f7ff", borderTop: "2px solid #0093DD" }}>
                <td style={{ padding: "10px 14px", fontWeight: "700", color: "#1a365d" }}>Total</td>
                <td style={{ padding: "10px 14px", textAlign: "center", fontWeight: "700", color: "#1a365d" }}>100</td>
                <td style={{ padding: "10px 14px", textAlign: "center", fontWeight: "700", color: "#0093DD" }}>{total}</td>
                <td colSpan={3} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
