import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setMsg(null);
    setLoading(true);
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMsg(error.message);
    else
      setMsg(
        mode === "signup"
          ? "Cuenta creada. Si tu proyecto requiere confirmación por email, revisa tu correo."
          : "¡Login correcto!"
      );
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-semibold mb-4 text-center">Entreno Diario</h1>

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
        onClick={handle}
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
        En dev, puedes desactivar la confirmación por email en Supabase → Auth →
        Providers → Email.
      </p>
    </div>
  );
}
