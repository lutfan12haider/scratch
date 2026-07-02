"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    title: "CTO, GlobalTech Industries",
    company: "GlobalTech",
    avatar: "SC",
    rating: 5,
    testimonial:
      "CognitiveLabs transformed our entire data infrastructure. Their ML models reduced our processing overhead by 68% while increasing prediction accuracy. The team's expertise in neural architecture design is genuinely world-class.",
    accentColor: "#00d4ff",
    metric: "68% overhead reduction",
  },
  {
    name: "Marcus Rodriguez",
    title: "VP of Engineering, Nexus AI",
    company: "Nexus AI",
    avatar: "MR",
    rating: 5,
    testimonial:
      "Working with CognitiveLabs felt like having an AI research lab embedded within our company. Their rapid deployment philosophy and CI/CD automation cut our time-to-market by more than half. Outstanding partnership.",
    accentColor: "#7c3aed",
    metric: "50%+ faster deployment",
  },
  {
    name: "Elena Vasquez",
    title: "Head of Analytics, DataVue",
    company: "DataVue",
    avatar: "EV",
    rating: 5,
    testimonial:
      "The strategic analytics platform they built us handles petabytes of data in real time. The business intelligence dashboards have become the cornerstone of our entire decision-making process. Truly remarkable work.",
    accentColor: "#10b981",
    metric: "Petabyte-scale processing",
  },
  {
    name: "James Whitfield",
    title: "CEO, CyberCore Systems",
    company: "CyberCore",
    avatar: "JW",
    rating: 5,
    testimonial:
      "The cloud infrastructure they designed for us is nothing short of exceptional. Zero downtime in 18 months, 40% cost savings on compute, and the security posture they implemented is fortress-grade.",
    accentColor: "#f472b6",
    metric: "Zero downtime, 18 months",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-32 overflow-hidden"
      style={{ background: "#020408" }}
    >
      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "500px", height: "500px", top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <div className="section-label">Testimonials</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-white/45 text-lg">
            See what Fortune 500 companies say about our work.
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
                style={{
                  background: "rgba(5, 11, 20, 0.8)",
                  border: `1px solid ${t.accentColor}20`,
                  boxShadow: `0 40px 100px -20px ${t.accentColor}15`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Glow orb */}
                <div
                  className="absolute top-0 left-0 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${t.accentColor}10, transparent 70%)` }}
                />

                {/* Quote mark */}
                <div
                  className="text-8xl font-serif leading-none mb-6 block"
                  style={{ color: t.accentColor + "30" }}
                >
                  "
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: t.accentColor, fill: t.accentColor }} />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 relative z-10">
                  {t.testimonial}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${t.accentColor}40, ${t.accentColor}20)`,
                        border: `1px solid ${t.accentColor}40`,
                        boxShadow: `0 0 20px ${t.accentColor}30`,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">{t.name}</div>
                      <div className="text-white/40 text-sm">{t.title}</div>
                    </div>
                  </div>

                  {/* Metric badge */}
                  <div
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: t.accentColor + "15",
                      border: `1px solid ${t.accentColor}30`,
                      color: t.accentColor,
                    }}
                  >
                    📊 {t.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current ? testimonials[i].accentColor : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid of mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl p-4 text-left transition-all duration-300"
              style={{
                background: current === i ? `${t.accentColor}10` : "rgba(255,255,255,0.02)",
                border: current === i ? `1px solid ${t.accentColor}30` : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="text-xs font-bold text-white/70">{t.name}</div>
              <div className="text-xs text-white/30 mt-0.5">{t.company}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
