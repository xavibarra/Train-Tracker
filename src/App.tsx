// src/App.tsx
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];

export default function App() {
  const [session, setSession] = useState<Session>(null);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar sesión actual + suscripción a cambios
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setSession(sess)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignup = async () => {
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password }); // password ≥ 6 caracteres
    setLoading(false);
    if (error) return setMsg(error.message);
    setMsg(
      "Cuenta creada. Si tu proyecto requiere confirmación por email, revisa tu correo."
    );
  };

  const handleLogin = async () => {
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) return setMsg(error.message);
    setMsg("¡Login correcto!");
  };

  const handleLogout = async () => {
    setMsg(null);
    await supabase.auth.signOut();
    setEmail("");
    setPassword("");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
          <h1 className="text-xl font-semibold mb-4 text-center">
            Entreno Diario
          </h1>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded ${
                mode === "signup" ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded ${
                mode === "login" ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              Login
            </button>
          </div>

          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full border rounded px-3 py-2 mb-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />

          <label className="block text-sm mb-1">Password</label>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="mín. 6 caracteres"
          />

          {msg && <div className="text-sm mb-3 text-blue-600">{msg}</div>}

          <button
            onClick={mode === "signup" ? handleSignup : handleLogin}
            className="w-full py-2 rounded bg-[#009BDD] text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading
              ? "Procesando…"
              : mode === "signup"
              ? "Crear cuenta"
              : "Entrar"}
          </button>

          <p className="text-xs text-gray-500 mt-3">
            En dev, puedes desactivar la confirmación por email en Supabase →
            Auth → Providers → Email.
          </p>
        </div>
      </div>
    );
  }

  // Si hay sesión → mostramos info básica y botón logout
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Sesión iniciada ✅</h2>
        <p className="text-sm text-gray-700 mb-4">
          User ID:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {session.user.id}
          </code>
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded bg-black text-white"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
