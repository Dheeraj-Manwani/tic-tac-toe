import { useState, useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  UserCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "@/stores/auth";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useAuthStore();
  const username = user?.username || "Guest123";

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
    setIsOpen(false);
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page
    console.log("Profile clicked");
    setIsOpen(false);
  };

  const handleSettings = () => {
    // TODO: Navigate to settings page
    console.log("Settings clicked");
    setIsOpen(false);
  };

  const handleHelp = () => {
    // TODO: Navigate to help/support page
    console.log("Help clicked");
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {isLoading ? (
        <Button
          variant="outline"
          disabled
          className="bg-white/5 text-white border-white/10 backdrop-blur-md rounded-xl px-4 gap-2 cursor-not-allowed opacity-70"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="hidden sm:inline">
            Checking authentication status
          </span>
        </Button>
      ) : (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl px-4 gap-2"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{username}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-xl p-2 shadow-2xl z-50"
          >
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                Signed in as
              </p>
              <p className="text-white font-medium">{username}</p>
            </div>

            <div className="py-1">
              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <UserCircle className="h-4 w-4 text-white/60" />
                <span>Profile</span>
              </button>

              <button
                onClick={handleSettings}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4 text-white/60" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleHelp}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-white/60" />
                <span>Help & Support</span>
              </button>
            </div>

            <div className="border-t border-white/10 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
