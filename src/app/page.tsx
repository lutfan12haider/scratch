"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { User, Lock, Loader2, Check, Bell } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import DashboardView from "@/components/DashboardView";
import AttendanceView from "@/components/AttendanceView";
import MarksView from "@/components/MarksView";
import TranscriptView from "@/components/TranscriptView";

import { STUDENT_PROFILE, COURSES_4TH_SEM } from "@/data/student-data";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn]         = useState(false);
  const [username, setUsername]             = useState("");
  const [password, setPassword]             = useState("");
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [isLoading, setIsLoading]           = useState(false);
  const [activeTab, setActiveTab]           = useState("dashboard");

  useEffect(() => {
    const s = sessionStorage.getItem("flex_session");
    if (s === "24K-3052") setIsLoggedIn(true);
  }, []);

  const handleCaptchaClick = () => {
    if (isCaptchaChecked) { setIsCaptchaChecked(false); return; }
    setIsCaptchaLoading(true);
    setTimeout(() => { setIsCaptchaLoading(false); setIsCaptchaChecked(true); }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username !== "24K-3052")     { toast.error("Invalid Roll Number.");  setIsLoading(false); return; }
      if (password !== "Policeline.123") { toast.error("Incorrect Password."); setIsLoading(false); return; }
      if (!isCaptchaChecked)           { toast.error("Please verify the captcha."); setIsLoading(false); return; }
      sessionStorage.setItem("flex_session", username);
      setIsLoggedIn(true);
      toast.success(`Welcome, ${STUDENT_PROFILE.name}!`);
      setIsLoading(false);
    }, 700);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("flex_session");
    setIsLoggedIn(false);
    setUsername(""); setPassword(""); setIsCaptchaChecked(false);
    setActiveTab("dashboard");
  };

  /* ─── LOGIN PAGE ─── */
  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>

        {/* LEFT – white login panel */}
        <div style={{
          width: "50%", background: "#fff",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "40px 60px",
        }}>
          <div style={{ width: "100%", maxWidth: "360px" }}>

            {/* Flex logo */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                {/* Checkmark logomark */}
                <svg width="52" height="52" viewBox="0 0 52 52">
                  <polyline points="8,28 20,40 44,14"
                    fill="none" stroke="#003087" strokeWidth="7"
                    strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,28 26,38 44,18"
                    fill="none" stroke="#0093DD" strokeWidth="5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "56px", fontWeight: "700",
                  color: "#0093DD", lineHeight: 1, letterSpacing: "-1px",
                }}>Flex</span>
              </div>
              {/* "Academic Portal" double-border strip */}
              <div style={{
                borderTop: "1px solid #003087",
                borderBottom: "3px double #003087",
                padding: "3px 0",
                marginTop: "4px",
              }}>
                <span style={{
                  fontFamily: "Georgia, serif", fontSize: "13px",
                  fontWeight: "600", color: "#003087",
                  letterSpacing: "2px", textTransform: "uppercase",
                }}>Academic Portal</span>
              </div>
            </div>

            <h2 style={{
              fontFamily: "Georgia, serif", fontSize: "22px",
              fontWeight: "400", textAlign: "center",
              color: "#1e293b", marginBottom: "20px",
            }}>Sign In</h2>

            <form onSubmit={handleLogin}>
              {/* Roll No */}
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "4px" }}>
                Roll No.
              </label>
              <div style={{ position: "relative", marginBottom: "6px" }}>
                <User size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type="text" value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Roll Number i.e (171-1234)"
                  required
                  style={{
                    width: "100%", padding: "10px 10px 10px 32px",
                    border: "1px solid #d1d5db", borderRadius: "4px",
                    fontSize: "13px", background: "#f9fafb",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 14px" }}>Roll Number i.e (171-1234)</p>

              {/* Password */}
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "4px" }}>
                Password
              </label>
              <div style={{ position: "relative", marginBottom: "18px" }}>
                <Lock size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", padding: "10px 10px 10px 32px",
                    border: "1px solid #d1d5db", borderRadius: "4px",
                    fontSize: "13px", background: "#f9fafb",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* reCAPTCHA box */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                border: "1px solid #d3d3d3", borderRadius: "4px",
                padding: "12px 14px", background: "#f9f9f9",
                marginBottom: "14px", maxWidth: "300px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button type="button" onClick={handleCaptchaClick}
                    style={{
                      width: "24px", height: "24px", borderRadius: "2px",
                      border: "2px solid #c1c1c1", background: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0,
                    }}>
                    {isCaptchaLoading
                      ? <Loader2 size={14} color="#0093DD" style={{ animation: "spin 1s linear infinite" }} />
                      : isCaptchaChecked
                        ? <Check size={16} color="#00a000" strokeWidth={3} />
                        : null}
                  </button>
                  <span style={{ fontSize: "13px", color: "#333" }}>I'm not a robot</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px" }}>🛡️</div>
                  <div style={{ fontSize: "8px", color: "#666", fontWeight: "700", letterSpacing: "0.5px" }}>reCAPTCHA</div>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", fontSize: "12px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4b5563", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "#0093DD" }} />
                  Remember me
                </label>
                <a href="#" onClick={e => { e.preventDefault(); toast("Please contact Academic Office for password reset."); }}
                  style={{ color: "#1d4ed8", fontWeight: "600", textDecoration: "none" }}>
                  Forget Password ?
                </a>
              </div>

              <button type="submit" disabled={isLoading}
                style={{
                  width: "100%", padding: "11px",
                  background: "#1a365d", color: "#fff",
                  border: "none", borderRadius: "4px",
                  fontSize: "14px", fontWeight: "700",
                  cursor: "pointer", opacity: isLoading ? 0.7 : 1,
                }}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT – bookshelf welcome panel */}
        <div style={{
          width: "50%",
          background: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)),
            url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80') center/cover no-repeat`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "48px",
          textAlign: "center",
        }}>
          <h1 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "40px", fontWeight: "400",
            color: "#fff", lineHeight: "1.3",
            marginBottom: "20px",
          }}>Welcome to Flex-Student</h1>
          <div style={{ width: "80px", height: "1px", background: "rgba(255,255,255,0.3)", margin: "0 auto 20px" }} />
          <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
            For Password related queries contact concerned Academic Officer on{" "}
            <a href="https://nu.edu.pk" target="_blank"
              style={{ color: "#60a5fa", fontWeight: "700", textDecoration: "underline" }}>
              nu.edu.pk
            </a>
          </p>
        </div>
      </div>
    );
  }

  /* ─── PORTAL LAYOUT ─── */
  const tabTitle: Record<string, string> = {
    dashboard:  "Student Dashboard",
    courses:    "Course Registration",
    attendance: "Attendance",
    marks:      "Student Marks",
    transcript: "Transcript",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5", fontFamily: "Inter, sans-serif" }}>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        darkMode={false}
        setDarkMode={() => {}}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>

        {/* Top Nav Bar */}
        <header className="no-print" style={{
          height: "56px", background: "#1a365d",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 24px",
          borderBottom: "1px solid #0f2440", flexShrink: 0,
        }}>
          <h2 style={{ color: "#fff", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
            {tabTitle[activeTab] ?? ""}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => toast("No new notifications.")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
              <Bell size={16} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderLeft: "1px solid #2c4a7c", paddingLeft: "16px" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#f59e0b", fontSize: "11px", fontWeight: "700", margin: 0 }}>
                  Hello Mr<span style={{ color: "#fff" }}>{STUDENT_PROFILE.name}</span>
                </p>
                <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0 }}>{STUDENT_PROFILE.rollNo}</p>
              </div>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "#2c5282", border: "2px solid #4a72a8",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "11px", fontWeight: "700",
              }}>LH</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "24px 28px" }}>
          {activeTab === "dashboard"  && <DashboardView />}
          {activeTab === "attendance" && <AttendanceView />}
          {activeTab === "marks"      && <MarksView />}
          {activeTab === "transcript" && <TranscriptView />}
          {activeTab === "courses"    && (
            <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ background: "#1a365d", padding: "10px 16px", color: "#fff", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" }}>
                Registered Courses — Spring 2026
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#0093DD", color: "#fff" }}>
                    {["Course Code","Course Title","Section","Cr. Hrs","Type"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: "700", fontSize: "11px", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COURSES_4TH_SEM.map((c, i) => (
                    <tr key={c.code} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700", color: "#0093DD", fontFamily: "monospace" }}>{c.code}</td>
                      <td style={{ padding: "10px 14px", color: "#1e293b" }}>{c.title}</td>
                      <td style={{ padding: "10px 14px", color: "#475569" }}>{c.section}</td>
                      <td style={{ padding: "10px 14px", color: "#1e293b", fontWeight: "600" }}>{c.credits}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b", fontSize: "11px" }}>{c.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
