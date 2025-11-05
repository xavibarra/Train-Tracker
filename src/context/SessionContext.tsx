import { supabase } from "@/lib/supabaseClient";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];

type SessionCtx = {
  session: Session;
  loading: boolean;
};

const Ctx = createContext<SessionCtx>({ session: null, loading: true });

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setSession(sess)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return <Ctx.Provider value={{ session, loading }}>{children}</Ctx.Provider>;
}

export function useSessionCtx() {
  return useContext(Ctx);
}
