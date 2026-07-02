"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStatus("sending");
    await new Promise(r => setTimeout(r, 2000));
    setStatus("done");
    toast.success("Message sent! We'll respond within 24 hours.");
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      <div className="orb orb-blue" style={{ width: "500px", height: "500px", bottom: "-100px", right: "-100px" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <div className="flex justify-center mb-5">
            <div className="section-label">Contact Us</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Ready to </span>
            <span className="gradient-text">Evolve?</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Join the vanguard of industries leveraging cognitive intelligence to redefine what&apos;s possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "cognitveslabs.ai@gmail.com", color: "#00d4ff" },
              { icon: MapPin, label: "Location", value: "Global AI Operations", color: "#7c3aed" },
              { icon: Phone, label: "Availability", value: "Available for Zoom calls", color: "#10b981" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + "15", border: `1px solid ${item.color}30` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">{item.label}</div>
                  <div className="text-white/80 text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="p-6 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-white font-bold mb-2">Prefer a direct call?</h3>
              <p className="text-white/40 text-sm mb-4">Book a Zoom strategy session with our experts</p>
              <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary text-sm px-5 py-2.5 w-full">
                Book a Meeting
              </button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-3">
            <div className="rounded-2xl p-8" style={{ background: "rgba(5,11,20,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {status === "done" ? (
                <div className="text-center py-8">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #00d4ff, #10b981)", boxShadow: "0 0 40px rgba(0,212,255,0.4)" }}>
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-white/40 text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-outline text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Name *</label>
                      <input className="input-futuristic" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Email *</label>
                      <input type="email" className="input-futuristic" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Subject</label>
                    <input className="input-futuristic" placeholder="How can we help?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Message *</label>
                    <textarea className="input-futuristic resize-none" rows={5} placeholder="Tell us about your project, goals, and challenges…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={status === "sending"} className="btn-primary w-full flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
                    ) : (
                      <><Send className="w-4 h-4" />Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
