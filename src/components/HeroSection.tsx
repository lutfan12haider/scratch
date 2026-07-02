"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight, Brain, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = ["Intelligence", "Innovation", "Evolution", "Precision"];
  const currentWordRef = useRef(0);

  useEffect(() => {
    const el = document.getElementById("hero-rotating-word");
    if (!el) return;
    const interval = setInterval(() => {
      currentWordRef.current = (currentWordRef.current + 1) % words.length;
      el.textContent = words[currentWordRef.current];
    }, 2500);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020408 0%, #050b14 60%, #020408 100%)" }}
    >
      {/* Grid lines background */}
      <div className="absolute inset-0 grid-lines opacity-40" />

      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "700px", height: "700px", top: "-200px", left: "-200px" }} />
      <div className="orb orb-purple" style={{ width: "600px", height: "600px", bottom: "-100px", right: "-100px" }} />
      <div className="orb orb-pink" style={{ width: "400px", height: "400px", top: "30%", left: "60%" }} />

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0 rounded-full spin-slow-animation"
          style={{
            border: "1px solid rgba(0, 212, 255, 0.06)",
            boxShadow: "0 0 60px rgba(0, 212, 255, 0.04) inset",
          }}
        />
        <div
          className="absolute inset-16 rounded-full spin-reverse-animation"
          style={{
            border: "1px solid rgba(124, 58, 237, 0.08)",
          }}
        />
        <div
          className="absolute inset-32 rounded-full spin-slow-animation"
          style={{
            border: "1px solid rgba(244, 114, 182, 0.05)",
          }}
        />
      </div>

      {/* Floating AI dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${6 + i * 2}px`,
            height: `${6 + i * 2}px`,
            background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#f472b6",
            left: `${15 + i * 13}%`,
            top: `${20 + (i % 3) * 20}%`,
            filter: "blur(0px)",
            boxShadow: `0 0 20px ${i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#f472b6"}80`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="section-label">
            <Brain className="w-3 h-3" />
            Next-Gen Enterprise AI Platform
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">Building the Future</span>
          <br />
          <span className="text-white">with AI-Powered</span>
          <br />
          <motion.span
            id="hero-rotating-word"
            className="gradient-text inline-block"
            key="rotating"
            animate={{ opacity: [0, 1], y: [10, 0] }}
            transition={{ duration: 0.5 }}
          >
            Intelligence
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Empower your enterprise with cognitive computing solutions that bridge the gap between
          complex data and actionable foresight. Trusted by Fortune 500 companies worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToBooking}
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            Schedule Meeting
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollToServices}
            className="btn-outline flex items-center gap-2 text-base px-8 py-4"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Trusted logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {["GLOBALTECH", "CYBERCORE", "SYNAPSE", "DATAVUE", "NEXUS AI"].map((name) => (
              <span
                key={name}
                className="text-white/20 text-sm font-bold tracking-widest hover:text-white/50 transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#020408] pointer-events-none" />
    </section>
  );
}
