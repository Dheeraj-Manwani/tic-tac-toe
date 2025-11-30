import { motion, AnimatePresence } from "motion/react";
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  disabled: boolean;
  isWinning?: boolean;
  index: number;
}

export function Square({
  value,
  onClick,
  disabled,
  isWinning,
  index,
}: SquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl flex items-center justify-center text-4xl overflow-hidden transition-all duration-300",
        "bg-white/5 hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20",
        "border border-white/10 backdrop-blur-md",
        isWinning &&
          "bg-white/15 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] border-white/30"
      )}
      data-testid={`square-${index}`}
    >
      <AnimatePresence>
        {value === "X" && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <X
              className="w-16 h-16 text-[hsl(180,100%,50%)] drop-shadow-[0_0_15px_hsl(180,100%,50%)]"
              strokeWidth={2.5}
            />
          </motion.div>
        )}
        {value === "O" && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Circle
              className="w-14 h-14 text-[hsl(320,100%,60%)] drop-shadow-[0_0_15px_hsl(320,100%,60%)]"
              strokeWidth={2.5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle grid noise texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>
    </button>
  );
}
