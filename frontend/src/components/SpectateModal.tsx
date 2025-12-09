import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { X as XIcon, Eye } from "lucide-react";
import { useState } from "react";

interface SpectateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (gameId: string) => void;
}

export function SpectateModal({ isOpen, onClose, onJoin }: SpectateModalProps) {
  const [gameId, setGameId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId.trim()) {
      onJoin(gameId.trim());
      setGameId("");
    }
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
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                {/* Header */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="inline-block mb-4 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                    <Eye className="w-6 h-6 text-[hsl(180,100%,50%)]" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white/90 mb-2">
                    Spectate Game
                  </h2>
                  <p className="text-white/60 text-sm">
                    Enter a game ID to watch the match
                  </p>
                </motion.div>

                {/* Form */}
                <motion.form
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="gameId"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Game ID
                    </label>
                    <input
                      id="gameId"
                      type="text"
                      value={gameId}
                      onChange={(e) => setGameId(e.target.value)}
                      placeholder="Enter game ID"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(260,100%,65%)] focus:border-transparent transition-all"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={!gameId.trim()}
                      className="flex-1 bg-[hsl(260,100%,65%)] hover:bg-[hsl(260,100%,70%)] text-white border-0 shadow-[0_0_20px_-5px_hsl(260,100%,65%)] hover:shadow-[0_0_30px_-5px_hsl(260,100%,65%)] transition-all hover:scale-105 active:scale-95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Join
                    </Button>
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
