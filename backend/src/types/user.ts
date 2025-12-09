import { UserType } from "@prisma/client";

export interface SessionUser {
  id: string;
  username: string;
  type: UserType;
  email: string | null;
}
