"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Mail, Building2, MessageSquare, CheckCircle2, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const TIMES = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const PURPOSES = [
  "AI/ML Consultation",
  "Cloud Infrastructure",
  "Strategic Analytics",
  "Product Demo",
  "Partnership Discussion",
  "Technical Assessment",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function BookingSection() {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "form" | "submitting" | "done">("pick");
  const [form, setForm] = useState({
    name: "", email: "", company: "", purpose: "", message: "", timezone: "UTC+5:00",
  });

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const isPastDay = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  const isWeekend = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.purpose) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setStep("submitting");
    await new Promise(r => setTimeout(r, 2500));
    setStep("done");
    toast.success("Meeting scheduled! Check your email for confirmation.", { duration: 5000 });
  };

  const reset = () => {
    setStep("pick");
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", company: "", purpose: "", message: "", timezone: "UTC+5:00" });
  };

  return (
    <section id="booking" className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #020408 0%, #050b14 50%, #020408 100%)" }}>
      <div className="orb orb-blue" style={{ width: "600px", height: "600px", top: "0", right: "-200px" }} />
      <div className="orb orb-purple" style={{ width: "500px", height: "500px", bottom: "0", left: "-150px" }} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex justify-center mb-5">
            <div className="section-label"><Calendar className="w-3 h-3" />Schedule a Meeting</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Book a </span>
            <span className="gradient-text">Strategy Session</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Connect with our AI experts. Get personalized insights for your enterprise.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* DONE STATE */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }} className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #00d4ff, #10b981)", boxShadow: "0 0 60px rgba(0,212,255,0.4)" }}>
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-3xl font-black text-white mb-3">Meeting Scheduled!</h3>
              <p className="text-white/50 mb-2">
                {MONTH_NAMES[calMonth]} {selectedDate}, {calYear} · {selectedTime}
              </p>
              <p className="text-white/40 text-sm mb-8">A Zoom link has been sent to <span className="text-[#00d4ff]">{form.email}</span></p>
              <button onClick={reset} className="btn-primary">Schedule Another</button>
            </motion.div>
          )}

          {/* SUBMITTING */}
          {step === "submitting" && (
            <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
                <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Scheduling your meeting…</h3>
              <p className="text-white/40">Sending confirmation & Zoom link to your email</p>
            </motion.div>
          )}

          {/* PICK DATE/TIME */}
          {step === "pick" && (
            <motion.div key="pick" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(5,11,20,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold">{MONTH_NAMES[calMonth]} {calYear}</span>
                    <button onClick={nextMonth} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Day labels */}
                  <div className="grid grid-cols-7 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div key={d} className="text-center text-xs text-white/30 font-semibold py-1">{d}</div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} />)}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const past = isPastDay(day);
                      const weekend = isWeekend(day);
                      const disabled = past || weekend;
                      const sel = selectedDate === day;
                      return (
                        <button
                          key={day}
                          onClick={() => !disabled && setSelectedDate(day)}
                          disabled={disabled}
                          className="aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center"
                          style={{
                            background: sel ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "transparent",
                            color: disabled ? "rgba(255,255,255,0.2)" : sel ? "white" : "rgba(255,255,255,0.7)",
                            boxShadow: sel ? "0 0 20px rgba(0,212,255,0.4)" : "none",
                            transform: sel ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(5,11,20,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <Clock className="w-4 h-4 text-[#00d4ff]" />
                    <h3 className="text-white font-bold">
                      {selectedDate ? `${MONTH_NAMES[calMonth]} ${selectedDate}` : "Select a date first"}
                    </h3>
                  </div>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {TIMES.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="py-3 rounded-xl text-sm font-medium transition-all duration-200"
                          style={{
                            background: selectedTime === time ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "rgba(255,255,255,0.03)",
                            border: selectedTime === time ? "none" : "1px solid rgba(255,255,255,0.07)",
                            color: selectedTime === time ? "white" : "rgba(255,255,255,0.6)",
                            boxShadow: selectedTime === time ? "0 0 20px rgba(0,212,255,0.3)" : "none",
                            transform: selectedTime === time ? "scale(1.03)" : "scale(1)",
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center">
                      <p className="text-white/20 text-sm">Pick a date to see available slots</p>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => setStep("form")} className="btn-primary w-full mt-5 flex items-center justify-center gap-2">
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* FORM */}
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="rounded-2xl p-8" style={{ background: "rgba(5,11,20,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Selected date/time bar */}
                <div className="flex items-center justify-between mb-8 p-4 rounded-xl" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-white text-sm font-semibold">{MONTH_NAMES[calMonth]} {selectedDate}, {calYear} · {selectedTime}</span>
                  </div>
                  <button onClick={() => setStep("pick")} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input className="input-futuristic pl-11" placeholder="John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input type="email" className="input-futuristic pl-11" placeholder="john@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input className="input-futuristic pl-11" placeholder="Your Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Purpose *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none z-10" />
                      <select
                        className="input-futuristic pl-11 bg-transparent cursor-pointer"
                        value={form.purpose}
                        onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                      >
                        <option value="" style={{ background: "#050b14" }}>Select purpose…</option>
                        {PURPOSES.map(p => <option key={p} value={p} style={{ background: "#050b14" }}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Message</label>
                    <textarea
                      className="input-futuristic resize-none"
                      rows={3}
                      placeholder="Tell us about your project or specific questions…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                  <p className="text-white/40 text-xs">
                    🔒 A Zoom meeting link will be sent automatically to your email. All meetings are treated with complete confidentiality under our privacy policy.
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep("pick")} className="btn-outline flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button onClick={handleSubmit} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Confirm & Schedule Zoom Meeting
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
