import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabaseClient";

export default function TodayPage() {
  const { session } = useSession();
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-2">Sesión iniciada ✅</h2>
      <p className="text-sm text-gray-700 mb-4">
        User ID:{" "}
        <code className="bg-gray-100 px-2 py-1 rounded">
          {session?.user.id}
        </code>
      </p>
      <button
        onClick={logout}
        className="px-3 py-2 rounded bg-black text-white"
      >
        Cerrar sesión
      </button>

      <div className="mt-6 text-gray-600">
        Aquí irá el semáforo de dieta y el selector de ítems del día.
      </div>
    </div>
  );
}
