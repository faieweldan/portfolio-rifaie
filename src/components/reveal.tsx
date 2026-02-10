"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
