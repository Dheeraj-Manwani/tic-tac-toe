import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link2, UserPlus, X as XIcon } from "lucide-react";

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareLink: () => void;
  onInviteByUsername: () => void;
  onPlayLocally: () => void;
}

export function NewGameModal({
  isOpen,
  onClose,
  onShareLink,
  onInviteByUsername,
  onPlayLocally,
}: NewGameModalProps) {
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
                  <h2 className="text-3xl font-display font-bold text-white/90 mb-2">
                    Start New Game
                  </h2>
                  <p className="text-white/60 text-sm">
                    Choose how you want to invite your opponent
                  </p>
                </motion.div>

                {/* Options */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  <Button
                    onClick={onShareLink}
                    className="w-full h-14 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl justify-start px-6 gap-4"
                  >
                    <Link2 className="h-5 w-5 text-white/60" />
                    <span>Share game invite link</span>
                  </Button>

                  <Button
                    onClick={onInviteByUsername}
                    className="w-full h-14 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl justify-start px-6 gap-4"
                  >
                    <UserPlus className="h-5 w-5 text-white/60" />
                    <span>Invite by username</span>
                  </Button>

                  <Button
                    onClick={onPlayLocally}
                    className="w-full h-14 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl justify-start px-6 gap-4"
                  >
                    <Link2 className="h-5 w-5 text-white/60" />
                    <span>Play locally (on this device)</span>
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
