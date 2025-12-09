import { User } from "@prisma/client";
import { SessionUser } from "../types/user";

export const getSessionUser = (user: User): SessionUser => {
  return {
    id: user.id,
    username: user.username,
    type: user.type,
    email: user.email,
  };
};
