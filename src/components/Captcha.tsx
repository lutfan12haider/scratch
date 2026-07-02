"use client";

import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onVerify: (code: string) => void;
  captchaCode: string;
  setCaptchaCode: (code: string) => void;
}

export default function Captcha({ onVerify, captchaCode, setCaptchaCode }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Avoid O, 0, I, 1 to minimize confusion
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserInput("");
    setIsValid(null);
    onVerify(""); // Reset validation in parent
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and set background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw some noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(
        Math.random() * 150
      )}, ${Math.floor(Math.random() * 200)}, 0.4)`;
      ctx.lineWidth = 1.5 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(
        Math.random() * 200
      )}, ${Math.floor(Math.random() * 200)}, 0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw the captcha characters with random rotation and positioning
    ctx.font = "bold 26px 'Courier New', monospace";
    ctx.textBaseline = "middle";

    for (let i = 0; i < captchaCode.length; i++) {
      const char = captchaCode[i];
      const x = 15 + i * 22 + Math.random() * 6;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      const angle = (Math.random() * 30 - 15) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Text color (dark blue/purple hues)
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 30 + 15)}, ${Math.floor(
        Math.random() * 60 + 20
      )}, ${Math.floor(Math.random() * 120 + 60)})`;
      
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    if (captchaCode === "") {
      generateCaptcha();
    } else {
      drawCaptcha();
    }
  }, [captchaCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    onVerify(value);
  };

  return (
    <div className="space-y-2 select-none">
      <label className="block text-xs font-semibold uppercase tracking-wider text-fast-text-light dark:text-gray-400">
        Security Verification
      </label>
      <div className="flex items-center gap-3">
        <div className="relative border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden flex-shrink-0">
          <canvas
            ref={canvasRef}
            width={140}
            height={44}
            className="block h-[44px] w-[140px]"
          />
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-fast-navy dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
          title="Refresh Security Code"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <input
          type="text"
          maxLength={5}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Code"
          className="block w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fast-navy focus:border-fast-navy dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center uppercase tracking-widest font-bold text-lg text-fast-navy dark:text-white"
          required
        />
      </div>
    </div>
  );
}
