'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoaderWithComplete({
  completed = false,
  className,
}: {
  completed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-screen h-screen flex items-center justify-center',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="loader"
            className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 1,
            }}
          />
        ) : (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"
          >
            <Check className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
