import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, X as XIcon, Circle } from "lucide-react";

type Player = "X" | "O";

interface GameResultModalProps {
  isOpen: boolean;
  winner: Player | "Draw" | null;
  onClose: () => void;
  onPlayAgain: () => void;
}

export function GameResultModal({
  isOpen,
  winner,
  onClose,
  onPlayAgain,
}: GameResultModalProps) {
  if (!isOpen || !winner) return null;

  const handlePlayAgain = () => {
    onPlayAgain();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-panel rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-6 text-center">
                {/* Icon/Animation */}
                {winner === "Draw" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20"
                  >
                    <Trophy className="w-12 h-12 text-white/60" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      winner === "X"
                        ? "bg-[hsl(180,100%,50%)]/20 border-4 border-[hsl(180,100%,50%)] shadow-[0_0_30px_hsl(180,100%,50%)]"
                        : "bg-[hsl(320,100%,60%)]/20 border-4 border-[hsl(320,100%,60%)] shadow-[0_0_30px_hsl(320,100%,60%)]"
                    }`}
                  >
                    {winner === "X" ? (
                      <XIcon
                        className="w-16 h-16 text-[hsl(180,100%,50%)] drop-shadow-[0_0_20px_hsl(180,100%,50%)]"
                        strokeWidth={3}
                      />
                    ) : (
                      <Circle
                        className="w-14 h-14 text-[hsl(320,100%,60%)] drop-shadow-[0_0_20px_hsl(320,100%,60%)]"
                        strokeWidth={3}
                      />
                    )}
                  </motion.div>
                )}

                {/* Title */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {winner === "Draw" ? (
                    <h2 className="text-3xl font-display font-bold text-white/90 mb-2">
                      It's a Draw!
                    </h2>
                  ) : (
                    <h2 className="text-3xl font-display font-bold mb-2">
                      <span
                        className={
                          winner === "X"
                            ? "text-[hsl(180,100%,50%)] neon-text-glow"
                            : "text-[hsl(320,100%,60%)] neon-text-glow"
                        }
                      >
                        Player {winner} Wins!
                      </span>
                    </h2>
                  )}
                  <p className="text-white/60 text-sm">
                    {winner === "Draw"
                      ? "Great game! Both players played well."
                      : "Congratulations on the victory!"}
                  </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 w-full"
                >
                  <Button
                    onClick={handlePlayAgain}
                    className="flex-1 bg-[hsl(260,100%,65%)] hover:bg-[hsl(260,100%,70%)] text-white border-0 shadow-[0_0_20px_-5px_hsl(260,100%,65%)] hover:shadow-[0_0_30px_-5px_hsl(260,100%,65%)] transition-all hover:scale-105 active:scale-95 rounded-xl gap-2"
                  >
                    <RotateCcw size={18} />
                    Play Again
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl"
                  >
                    Close
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
