import { Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// Utility to sign access tokens
export function signAccessToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      type: user.type,
      email: user.email || null,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
}

// Utility to sign refresh tokens
export function signRefreshToken(user: User) {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// Set refresh token cookie
export function setRefreshCookie(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
