import { SessionContext } from "@/context/SessionContext";
import { useContext } from "react";

export function useSession() {
  const { session, loading } = useContext(SessionContext);
  const userId = session?.user?.id ?? null;
  return { session, userId, loading, isAuthed: !!userId };
}
