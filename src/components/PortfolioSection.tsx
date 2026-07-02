"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";

const projects = [
  {
    title: "Neural Trading Engine",
    category: "FinTech AI",
    description: "Real-time algorithmic trading with predictive neural networks processing millions of data points per second.",
    tags: ["PyTorch", "AWS", "Real-time"],
    cols: "col-span-2",
    gradient: "from-[#00d4ff]/20 to-[#7c3aed]/20",
    accentColor: "#00d4ff",
    stat: "2.3x ROI increase",
    icon: "📈",
  },
  {
    title: "Medical Diagnostic AI",
    category: "HealthTech",
    description: "Computer vision model achieving 97.8% accuracy in early-stage disease detection.",
    tags: ["TensorFlow", "Computer Vision"],
    cols: "col-span-1",
    gradient: "from-[#10b981]/20 to-[#06b6d4]/20",
    accentColor: "#10b981",
    stat: "97.8% accuracy",
    icon: "🧬",
  },
  {
    title: "Supply Chain Intelligence",
    category: "Logistics",
    description: "Cognitive planning system reducing logistics costs by 40% for a global retail chain.",
    tags: ["Python", "Kubernetes"],
    cols: "col-span-1",
    gradient: "from-[#f472b6]/20 to-[#7c3aed]/20",
    accentColor: "#f472b6",
    stat: "40% cost reduction",
    icon: "🚚",
  },
  {
    title: "NLP Customer Intelligence",
    category: "Enterprise SaaS",
    description: "Advanced sentiment analysis and intent classification across 14 languages for a Fortune 500.",
    tags: ["NLP", "Azure", "BI"],
    cols: "col-span-1",
    gradient: "from-[#7c3aed]/20 to-[#f472b6]/20",
    accentColor: "#7c3aed",
    stat: "14 languages",
    icon: "💬",
  },
  {
    title: "Smart City Platform",
    category: "Government & IoT",
    description: "AI-powered urban intelligence system managing 50,000+ IoT sensors in real time.",
    tags: ["Edge AI", "IoT", "GCP"],
    cols: "col-span-2",
    gradient: "from-[#06b6d4]/20 to-[#10b981]/20",
    accentColor: "#06b6d4",
    stat: "50k+ sensors",
    icon: "🏙️",
  },
];

export default function PortfolioSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020408 0%, #050b14 50%, #020408 100%)" }}
    >
      <div className="orb orb-purple" style={{ width: "600px", height: "600px", bottom: "-200px", right: "-200px" }} />

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
            <div className="section-label">Case Studies</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            <span className="text-white">Proven Results,</span>
            <br />
            <span className="gradient-text">Real Impact</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            From FinTech to HealthTech — our AI solutions deliver measurable outcomes across industries.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`${project.cols} group cursor-pointer`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient.replace("from-[", "").replace("]/20", "30").replace("to-[", "").replace("]/20", "20")}, rgba(5,11,20,0.95))`,
                  border: hovered === i ? `1px solid ${project.accentColor}40` : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: hovered === i ? `0 20px 60px -10px ${project.accentColor}20` : "none",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-${hovered === i ? "100" : "40"} transition-opacity duration-500`} />

                <div className="relative p-8 h-full flex flex-col">
                  {/* Top */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: project.accentColor + "99" }}
                      >
                        {project.category}
                      </span>
                      <div className="text-4xl mb-2">{project.icon}</div>
                    </div>
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex gap-2"
                        >
                          <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white/60" />
                          </div>
                          <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-white/60" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: project.accentColor + "15",
                          border: `1px solid ${project.accentColor}30`,
                          color: project.accentColor + "cc",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stat */}
                  <div
                    className="text-sm font-bold"
                    style={{ color: project.accentColor }}
                  >
                    📊 {project.stat}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
