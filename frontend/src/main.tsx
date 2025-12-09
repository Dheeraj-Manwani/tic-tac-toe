import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Game from "@/pages/game";
import Home from "@/pages/home";
import BattleLogs from "@/pages/battle-logs";
import NotFound from "@/pages/not-found";
import { AppInitializer } from "@/components/AppInitializer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/battle-logs",
    element: <BattleLogs />,
  },
  {
    path: "/:id",
    element: <Game />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </StrictMode>
);
