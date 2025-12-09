import passport from "passport";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import prisma from "../lib/db";
import { v4 as uuid } from "uuid";
import { UserType } from "@prisma/client";
import {
  setRefreshCookie,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import bcrypt from "bcryptjs";
import { SessionUser } from "../types/user";
import { getSessionUser } from "../lib/mappers";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const router = Router();

router.get("/init", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken ==== ", refreshToken);
  console.log("REFRESH_TOKEN_SECRET ==== ", REFRESH_TOKEN_SECRET);
  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET
      ) as SessionUser;

      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
      console.log("user ==== ", user);
      if (user) {
        const accessToken = signAccessToken(user);
        return res.json({ ...user, accessToken });
      }
    } catch (err) {
      console.error("Invalid refresh token:", err);
    }
  }

  // Create new guest
  const user = await prisma.user.create({
    data: {
      username: "Guest-" + uuid().slice(0, 8),
      type: "guest",
    },
  });

  const accessToken = signAccessToken(user);
  const newRefresh = signRefreshToken(user);

  setRefreshCookie(res, newRefresh);

  return res.json({ ...user, accessToken });
});

router.post("/upgrade-password", async (req, res) => {
  const { id, email, password, username } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: hashed,
        username,
        type: "username",
      },
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    setRefreshCookie(res, refreshToken);

    return res.json({ ...getSessionUser(user), accessToken });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Upgrade failed" });
  }
});

router.get("/google", (req, res, next) => {
  // Forward guest user ID in state param
  const state = req.query.state?.toString() ?? "";

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const guestId = req.query.state as string;
    const googleData = req.user as any;

    try {
      const user = await prisma.user.update({
        where: { id: guestId },
        data: {
          email: googleData.email,
          googleId: googleData.googleId,
          avatarUrl: googleData.avatar,
          username: googleData.name,
          type: "google",
        },
      });

      const accessToken = signAccessToken(user);
      const refreshToken = signRefreshToken(user);

      setRefreshCookie(res, refreshToken);

      return res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?token=${accessToken}`
      );
    } catch (err) {
      console.error(err);
      return res.redirect(`${process.env.FRONTEND_URL}/oauth-error`);
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  return res.json({ message: "Logged out" });
});

export default router;
