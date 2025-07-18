'use client';

import { motion } from 'framer-motion';

interface CheckAnimatedProps {
  size?: number;
  color?: string;
}

export function CheckAnimated({
  size = 40,
  color = 'currentColor',
}: CheckAnimatedProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-green-600 dark:text-green-400"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        stroke={color}
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      <motion.path
        d="M16 26 L22 32 L36 18"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
      />
    </motion.svg>
  );
}
