import { useSession } from "@/hooks/useSession";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthed, loading } = useSession();
  if (loading) return <div className="p-6">Cargando…</div>;
  return isAuthed ? <Outlet /> : <Navigate to="/auth" replace />;
}
