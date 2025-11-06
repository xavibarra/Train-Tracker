import AuthForm from "@/components/AuthForm";
import { useSession } from "@/hooks/useSession";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const { isAuthed, loading } = useSession();
  if (loading) return <div className="p-6">Cargando…</div>;
  if (isAuthed) return <Navigate to="/today" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AuthForm />
    </div>
  );
}
