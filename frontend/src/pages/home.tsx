import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Play, Trophy, List, Eye } from "lucide-react";
import { BackgroundShapes } from "@/components/BackgroundShapes";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";
import { NewGameModal } from "@/components/NewGameModal";
import { SpectateModal } from "@/components/SpectateModal";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [isSpectateModalOpen, setIsSpectateModalOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Elements */}
      <BackgroundShapes />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[hsl(260,100%,65%)] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(180,100%,50%)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      {/* Profile Menu */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 right-6 z-20"
      >
        <ProfileMenu />
      </motion.div>

      <div className="z-10 flex flex-col items-center max-w-md w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]">
            <Trophy
              className="w-12 h-12 text-[hsl(180,100%,50%)] drop-shadow-[0_0_10px_hsl(180,100%,50%)]"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 tracking-tighter mb-2 drop-shadow-2xl">
            100x
            <br />
            TicTacToe
          </h1>
          <p className="text-white/60 font-sans tracking-widest text-sm uppercase">
            The Classic Game Reimagined
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 w-full"
        >
          <motion.div variants={item}>
            <Button
              onClick={() => setIsNewGameModalOpen(true)}
              className="w-full h-14 text-lg font-bold tracking-wide bg-[hsl(260,100%,65%)] hover:bg-[hsl(260,100%,70%)] text-white border-0 shadow-[0_0_20px_-5px_hsl(260,100%,65%)] hover:shadow-[0_0_30px_-5px_hsl(260,100%,65%)] transition-all hover:scale-105 active:scale-95 rounded-xl"
            >
              <Play className="mr-2 h-5 w-5 fill-current" /> NEW GAME
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Button
              onClick={() => navigate("/battle-logs")}
              variant="outline"
              className="w-full h-14 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl  px-6"
            >
              <List className="mr-4 h-5 w-5 text-white/60" /> Battle Log
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Button
              onClick={() => setIsSpectateModalOpen(true)}
              variant="outline"
              className="w-full h-14 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl  px-6"
            >
              <Eye className="mr-4 h-5 w-5 text-white/60" /> Spectate
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <footer className="absolute bottom-8 text-center w-full text-white/20 text-xs font-sans">
        © 2026 100x TicTacToe • v1.0.0
      </footer>

      {/* New Game Modal */}
      <NewGameModal
        isOpen={isNewGameModalOpen}
        onClose={() => setIsNewGameModalOpen(false)}
        onShareLink={() => {
          setIsNewGameModalOpen(false);
          navigate("/game");
        }}
        onInviteByUsername={() => {
          setIsNewGameModalOpen(false);
          navigate("/game");
        }}
        onPlayLocally={() => {
          setIsSpectateModalOpen(false);
          navigate("/game");
        }}
      />

      {/* Spectate Modal */}
      <SpectateModal
        isOpen={isSpectateModalOpen}
        onClose={() => setIsSpectateModalOpen(false)}
        onJoin={(gameId) => {
          console.log("Joining game to spectate:", gameId);
          setIsSpectateModalOpen(false);
          // TODO: Navigate to spectate view
        }}
      />
    </div>
  );
}
