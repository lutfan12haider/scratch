"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Link2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const footerLinks = {
  Solutions: [
    "Computer Vision",
    "Predictive Analytics",
    "Neural Architectures",
    "Edge Computing",
  ],
  Company: [
    "About Us",
    "Our Process",
    "Security & Ethics",
    "Careers",
  ],
  Resources: [
    "Documentation",
    "Blog",
    "Case Studies",
    "API Reference",
  ],
};

const socials = [
  { icon: MessageCircle, label: "Twitter / X", color: "#1DA1F2" },
  { icon: Link2, label: "LinkedIn", color: "#0A66C2" },
  { icon: Globe, label: "Website", color: "#00d4ff" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! You'll receive the latest AI insights.");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden pt-24 pb-10" style={{ background: "#020408", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30" />

      {/* Background orbs */}
      <div className="orb orb-blue" style={{ width: "600px", height: "300px", top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.5 }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-10 md:p-14 text-center mb-20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.15), rgba(244,114,182,0.08))", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="absolute inset-0 grid-lines opacity-20" />
          <div className="orb orb-blue" style={{ width: "400px", height: "400px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.3 }} />

          <div className="relative z-10">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Ready to Build the Future?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Join the vanguard of industries leveraging cognitive intelligence to redefine what&apos;s possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary text-base px-8 py-4"
              >
                Book a Strategy Session
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline text-base px-8 py-4"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-white font-bold text-lg">Cognitive<span className="gradient-text">Labs</span></span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              Architecting the future of enterprise intelligence through advanced AI systems and cognitive engineering.
            </p>

            {/* Newsletter */}
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">
              AI Insights Newsletter
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                className="input-futuristic text-sm flex-1"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px 14px" }}
              />
              <button type="submit" className="btn-primary px-4 py-2 rounded-xl flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-sm mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/35 text-sm hover:text-white transition-colors duration-300 hover:text-[#00d4ff]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs">
            © 2024 COGNITIVE AI SOLUTIONS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">Terms of Service</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/30 transition-all duration-300 hover:scale-110"
                style={{ transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.borderColor = color + "40";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
