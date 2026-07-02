"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const techStack = [
  { name: "React.js", category: "Frontend", color: "#61DAFB" },
  { name: "Python", category: "Backend", color: "#3776AB" },
  { name: "JavaScript", category: "Language", color: "#F7DF1E" },
  { name: "AWS", category: "Cloud", color: "#FF9900" },
  { name: "Google Cloud", category: "Cloud", color: "#4285F4" },
  { name: "Azure", category: "Cloud", color: "#0089D6" },
  { name: "TensorFlow", category: "AI/ML", color: "#FF6F00" },
  { name: "PyTorch", category: "AI/ML", color: "#EE4C2C" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "Node.js", category: "Backend", color: "#339933" },
  { name: "Docker", category: "DevOps", color: "#2496ED" },
  { name: "Kubernetes", category: "DevOps", color: "#326CE5" },
];

const categoryColors: Record<string, string> = {
  Frontend: "#00d4ff",
  Backend: "#10b981",
  Language: "#f59e0b",
  Cloud: "#7c3aed",
  "AI/ML": "#f472b6",
  Database: "#06b6d4",
  DevOps: "#8b5cf6",
};

function TechBadge({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const catColor = categoryColors[tech.category] || "#00d4ff";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-xl px-5 py-3 flex items-center gap-3 transition-all duration-300"
        style={{
          background: hovered ? `rgba(${hexToRgb(catColor)}, 0.08)` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? catColor + "40" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? `0 0 20px ${catColor}20` : "none",
        }}
      >
        {/* Color dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}80` }}
        />
        <div>
          <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
            {tech.name}
          </div>
          <div className="text-xs" style={{ color: catColor + "99" }}>
            {tech.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020408 0%, #050b14 50%, #020408 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "400px", height: "400px", top: "0", right: "0" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <div className="section-label">Technology Stack</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            <span className="text-white">Built with </span>
            <span className="gradient-text">Industry-Leading</span>
            <br />
            <span className="text-white">Platforms</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            Leveraging the most powerful tools in the modern technology ecosystem to
            deliver enterprise-grade solutions.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStack.map((tech, i) => (
            <TechBadge key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-white/30">{cat}</span>
            </div>
          ))}
        </motion.div>

        {/* Horizontal scrolling logos strip */}
        <div className="mt-24 overflow-hidden">
          <div
            className="flex gap-10 items-center"
            style={{
              animation: "marquee 30s linear infinite",
            }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex-shrink-0 text-white/15 font-bold text-xl tracking-wider hover:text-white/40 transition-colors cursor-default"
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
