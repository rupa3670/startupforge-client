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
    <section className="relative overflow-hidden bg-[#0B0E14]">
      {/* background image, low opacity so it blends into the dark theme */}
      <div className="absolute inset-0">
        <Image
          src="/assest/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        {/* gradient overlays so text stays readable and edges fade into the bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/40 via-[#0B0E14]/70 to-[#0B0E14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-transparent to-[#0B0E14]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28 text-center">
        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-semibold text-white leading-tight tracking-tight mb-4"
        >
          Build your startup team,
          <br className="hidden sm:block" /> one collaborator at a time
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
          className="text-gray-400 text-base leading-relaxed mb-8 max-w-xl mx-auto"
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
          href="/dashboard/startup/new"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Post your startup
        </motion.a>
      </div>
    </section>
  );
}