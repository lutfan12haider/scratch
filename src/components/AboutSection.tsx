"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime Reliability", description: "Enterprise-grade SLA" },
  { value: 2.5, suffix: "x", label: "Efficiency Gain", description: "Average client improvement" },
  { value: 150, suffix: "+", label: "Models Deployed", description: "Across industries" },
  { value: 24, suffix: "/7", label: "Expert Monitoring", description: "Always-on support" },
];

function CounterNumber({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = (end - start) / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(parseFloat(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <span>
      {display % 1 === 0 ? display.toFixed(0) : display.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const statsRef = useRef(null);
  const [countStarted, setCountStarted] = useState(false);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !countStarted) setCountStarted(true);
  }, [isInView, countStarted]);

  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "500px", height: "500px", bottom: "0", left: "-100px" }} />
      <div className="orb orb-pink" style={{ width: "400px", height: "400px", top: "0", right: "0" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label inline-flex mb-6">Our Story</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              <span className="text-white">We Engineer</span>
              <br />
              <span className="gradient-text">Cognitive Systems</span>
              <br />
              <span className="text-white">That Evolve</span>
            </h2>
            <p className="text-white/45 leading-relaxed text-base mb-6">
              We don&apos;t just build software; we engineer cognitive systems that evolve with your
              business. Our track record speaks for itself across Fortune 500 integrations,
              delivering AI solutions that redefine what&apos;s possible.
            </p>
            <p className="text-white/35 leading-relaxed text-sm mb-8">
              Founded by a team of AI researchers and enterprise architects, CognitiveLabs
              stands at the intersection of cutting-edge research and practical business
              intelligence. We transform abstract AI capabilities into concrete competitive advantages.
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                { year: "2020", event: "Founded by AI researchers from top institutions" },
                { year: "2022", event: "First Fortune 500 enterprise partnership" },
                { year: "2023", event: "150+ AI models deployed globally" },
                { year: "2024", event: "Expanded to multi-cloud infrastructure" },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
                  </div>
                  <div>
                    <span className="text-[#00d4ff] text-xs font-bold mr-3">{item.year}</span>
                    <span className="text-white/50 text-sm">{item.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Central AI Visual */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full spin-slow-animation"
                style={{ border: "1px dashed rgba(0,212,255,0.2)" }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-8 rounded-full spin-reverse-animation"
                style={{ border: "1px dashed rgba(124,58,237,0.15)" }}
              />
              {/* Inner ring */}
              <div
                className="absolute inset-16 rounded-full spin-slow-animation"
                style={{ border: "1px solid rgba(244,114,182,0.1)" }}
              />

              {/* Center core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center pulse-glow-animation"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
                      border: "1px solid rgba(0,212,255,0.3)",
                      boxShadow: "0 0 60px rgba(0,212,255,0.2), inset 0 0 40px rgba(124,58,237,0.1)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                        boxShadow: "0 0 30px rgba(0,212,255,0.5)",
                      }}
                    >
                      <span className="text-white font-black text-xl">AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting nodes */}
              {["ML", "NLP", "CV", "BI"].map((label, i) => {
                const angle = (i * 90) * (Math.PI / 180);
                const radius = 130;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={label}
                    className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center text-xs font-bold text-white glass"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      border: "1px solid rgba(0,212,255,0.3)",
                      boxShadow: "0 0 15px rgba(0,212,255,0.15)",
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={statsRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative group"
              >
                <div
                  className="rounded-2xl p-8 text-center gradient-border transition-all duration-500 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="text-4xl md:text-5xl font-black mb-2 gradient-text"
                  >
                    <CounterNumber value={stat.value} suffix={stat.suffix} active={countStarted} />
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-white/30 text-xs">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
