import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, X as XIcon, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "@/components/ProfileMenu";

interface Match {
  id: string;
  opponent: string;
  result: "Win" | "Loss" | "Draw";
  date: string;
  playerSymbol: "X" | "O";
}

const dummyMatches: Match[] = [
  {
    id: "1",
    opponent: "Player123",
    result: "Win",
    date: "2024-01-15 14:30",
    playerSymbol: "X",
  },
  {
    id: "2",
    opponent: "Guest-abc123",
    result: "Loss",
    date: "2024-01-14 10:15",
    playerSymbol: "O",
  },
  {
    id: "3",
    opponent: "TicTacMaster",
    result: "Draw",
    date: "2024-01-13 16:45",
    playerSymbol: "X",
  },
  {
    id: "4",
    opponent: "GameLover99",
    result: "Win",
    date: "2024-01-12 09:20",
    playerSymbol: "O",
  },
  {
    id: "5",
    opponent: "Guest-xyz789",
    result: "Win",
    date: "2024-01-11 20:10",
    playerSymbol: "X",
  },
];

export default function BattleLogs() {
  const navigate = useNavigate();

  const getResultColor = (result: string) => {
    switch (result) {
      case "Win":
        return "text-[hsl(180,100%,50%)]";
      case "Loss":
        return "text-[hsl(320,100%,60%)]";
      case "Draw":
        return "text-white/60";
      default:
        return "text-white";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "Win":
        return <Trophy className="w-5 h-5" />;
      case "Loss":
        return <XIcon className="w-5 h-5" />;
      case "Draw":
        return <Circle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 relative overflow-hidden bg-[#0a0a0a]">
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

      {/* Profile Menu */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 right-6 z-20"
      >
        <ProfileMenu />
      </motion.div>

      {/* Content */}
      <div className="z-10 w-full max-w-2xl mt-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 mb-2">
            Battle Logs
          </h1>
          <p className="text-white/60 text-sm">Your match history</p>
        </motion.div>

        <div className="space-y-3">
          {dummyMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-xl p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      match.result === "Win"
                        ? "bg-[hsl(180,100%,50%)]/20"
                        : match.result === "Loss"
                        ? "bg-[hsl(320,100%,60%)]/20"
                        : "bg-white/10"
                    }`}
                  >
                    {getResultIcon(match.result)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">
                        vs {match.opponent}
                      </span>
                      <span className="text-white/40 text-xs">
                        ({match.playerSymbol})
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">{match.date}</p>
                  </div>
                </div>
                <div
                  className={`font-bold text-lg ${getResultColor(
                    match.result
                  )}`}
                >
                  {match.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {dummyMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60">No matches yet. Start playing!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
