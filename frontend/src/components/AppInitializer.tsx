import { useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth";

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    async function init() {
      setLoading(true);
      try {
        const res = await api.get("/api/auth/init");
        setAuth(res.data, res.data.accessToken);
      } catch (err) {
        console.log("Init failed", err);
        setLoading(false);
      }
    }

    init();
  }, [setAuth, setLoading]);

  return <>{children}</>;
}
