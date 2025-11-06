import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export type SessionCtx = {
  session: Session | null;
  loading: boolean;
};

export const SessionContext = createContext<SessionCtx>({
  session: null,
  loading: true,
});
