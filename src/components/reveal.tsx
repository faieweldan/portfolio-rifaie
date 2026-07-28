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
      initial={{ opacity: 0, y: 9 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.48,
        delay: Math.min(delay, 0.5),
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
