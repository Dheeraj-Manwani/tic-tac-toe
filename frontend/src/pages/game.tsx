import { Board } from "@/components/tic-tac-toe/board";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Game() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[hsl(260,100%,65%)] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(180,100%,50%)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      {/* Back Button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl px-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </motion.div>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-5 text-center z-10"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 tracking-tighter mb-2 drop-shadow-2xl">
          100x
          <br />
          TicTacToe
        </h1>
        {/* <p className="text-white/40 font-sans tracking-widest text-xs uppercase">
          Interactive • Sound • Motion
        </p> */}
      </motion.div>
      <div className="z-10 w-full max-w-xl">
        <Board />
      </div>
      <footer className="absolute bottom-4 text-center w-full text-white font-sans">
        <a
          href="https://github.com/Dheeraj-Manwani"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with 💜 by <span className="text-purple-400">Dheeraj</span>
        </a>
      </footer>
    </div>
  );
}
