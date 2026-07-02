"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cloud, BarChart3, Rocket, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Custom neural architectures and predictive modeling for complex enterprise datasets. We build intelligent systems that learn and evolve.",
    gradient: "from-[#00d4ff] to-[#7c3aed]",
    glow: "rgba(0, 212, 255, 0.3)",
    tag: "Core Service",
    features: ["Neural Architecture Design", "Predictive Models", "NLP & Computer Vision", "AutoML Pipelines"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Scalable, secure cloud deployment strategies optimized for heavy computational workloads across AWS, GCP, and Azure.",
    gradient: "from-[#7c3aed] to-[#f472b6]",
    glow: "rgba(124, 58, 237, 0.3)",
    tag: "Infrastructure",
    features: ["Multi-cloud Strategy", "Auto-scaling Systems", "Security & Compliance", "Cost Optimization"],
  },
  {
    icon: BarChart3,
    title: "Strategic Analytics",
    description:
      "Transform raw data into strategic foresight with real-time visualization and enterprise BI pipelines that drive decisions.",
    gradient: "from-[#06b6d4] to-[#10b981]",
    glow: "rgba(6, 182, 212, 0.3)",
    tag: "Analytics",
    features: ["Real-time Dashboards", "Predictive Analytics", "Data Engineering", "Business Intelligence"],
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description:
      "Accelerate go-to-market with automated CI/CD pipelines and production-ready AI ecosystems built for speed and scale.",
    gradient: "from-[#f472b6] to-[#00d4ff]",
    glow: "rgba(244, 114, 182, 0.3)",
    tag: "Deployment",
    features: ["CI/CD Automation", "Docker & Kubernetes", "Edge Computing", "99.9% Uptime SLA"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * 8;
    const tiltY = ((x - centerX) / centerX) * -8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="relative rounded-2xl p-px overflow-hidden cursor-pointer group"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${service.glow.replace("0.3)", "0.6)")}, rgba(255,255,255,0.05))`
            : "rgba(255, 255, 255, 0.05)",
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease",
          boxShadow: hovered ? `0 30px 80px -20px ${service.glow}` : "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse follow glow inside card */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${service.glow.replace("0.3)", "0.15)")}, transparent 70%)`,
            }}
          />
        )}

        <div
          className="relative rounded-2xl p-7 h-full"
          style={{ background: "rgba(5, 11, 20, 0.95)" }}
        >
          {/* Tag */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">{service.tag}</span>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              style={{ boxShadow: `0 0 20px ${service.glow}` }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-white/45 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient}`} />
                <span className="text-xs text-white/40">{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            style={{ WebkitTextFillColor: "transparent" }}>
            Learn More
            <ArrowRight className="w-4 h-4 text-[#00d4ff] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      {/* Background orbs */}
      <div className="orb orb-purple" style={{ width: "500px", height: "500px", top: "0", left: "50%", transform: "translateX(-50%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <div className="section-label">Specialized Capabilities</div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            <span className="text-white">Comprehensive </span>
            <span className="gradient-text">Technology Suites</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            Designed to solve high-stakes business challenges with AI solutions that drive measurable ROI.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
