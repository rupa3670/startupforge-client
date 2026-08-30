"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 px-4 flex justify-center items-center bg-slate-50 dark:bg-[#0B0E14] transition-colors duration-300">
      {/* Outer Glassmorphic Frame */}
      <div className="w-full max-w-5xl rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl dark:shadow-2xl backdrop-blur-md text-slate-900 dark:text-white transition-colors duration-300">

        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-slate-900 dark:text-white">
            Testimonials
          </h2>
          <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            What startup founders and collaborators say about StartupForge
          </div>
        </div>

        {/* 3 Columns Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -6 }}
          >
            <Card className="h-full border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/40 backdrop-blur-md shadow-md dark:shadow-lg rounded-2xl p-6 flex flex-col items-center text-center justify-between space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-md">
                <Image
                  src="/assest/womenjfif.jpg"
                  alt="Sarah Jones"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sarah Jones</h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Founder @ TechFlow</div>
              </div>

              <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs">
                StartupForge helped us recruit our core frontend developer within two weeks. Absolutely essential for early-stage teams!
              </div>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -6 }}
          >
            <Card className="h-full border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/40 backdrop-blur-md shadow-md dark:shadow-lg rounded-2xl p-6 flex flex-col items-center text-center justify-between space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-md">
                <Image
                  src="/assest/men.jpg"
                  alt="Diane Moore"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Diane Moore</h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Full-Stack Collaborator</div>
              </div>

              <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs">
                I found an incredible AI startup project to contribute to. Tracking application statuses directly on the dashboard is super smooth.
              </div>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -6 }}
          >
            <Card className="h-full border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/40 backdrop-blur-md shadow-md dark:shadow-lg rounded-2xl p-6 flex flex-col items-center text-center justify-between space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-md">
                <Image
                  src="/assest/women2.jpg"
                  alt="Maria Smith"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Maria Smith</h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Co-Founder @ BuildLabs</div>
              </div>

              <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs">
                The platform seamlessly connects founders with skilled talent. Upgrading to the premium founder package was totally worth it.
              </div>
            </Card>
          </motion.div>

        </div>



      </div>
    </section>
  );
}