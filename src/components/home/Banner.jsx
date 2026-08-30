"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-slate-100/90 dark:bg-[#0B0E14] transition-colors duration-300">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/assest/hero.jpg"
          alt="Startup team"
          fill
          priority
          className="object-cover object-center opacity-40 dark:opacity-40 mix-blend-multiply dark:mix-blend-normal transition-opacity duration-300"
        />

        {/* Balanced Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-slate-100/70 to-slate-100 dark:from-[#0B0E14]/40 dark:via-[#0B0E14]/70 dark:to-[#0B0E14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/80 via-transparent to-slate-100/80 dark:from-[#0B0E14]/80 dark:via-transparent dark:to-[#0B0E14]/80" />
        
        {/* Soft Background Blue Glow to Break Plain White */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-blue-500/15 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28 text-center">
        {/* Title with Primary Blue Accent */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4"
        >
          Build your startup team,
          <br className="hidden sm:block" />
          <span className="text-blue-600 dark:text-indigo-400"> one collaborator at a time</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
          className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-medium"
        >
          Post your idea, find developers, designers and marketers who believe
          in it — or browse open roles and join a team already in motion.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm sm:text-base font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-blue-500/25 transition-all duration-200"
        >
          Post your startup
        </motion.a>
      </div>
    </section>
  );
}