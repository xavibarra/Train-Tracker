import { useSession } from "@/hooks/useSession";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { isAuthed } = useSession();
  const loc = useLocation();

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      className={clsx(
        "px-3 py-2 rounded-md text-sm font-medium",
        loc.pathname === to
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-800"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="font-semibold">Entreno Diario</div>
        {isAuthed && (
          <nav className="flex gap-2 ml-4">
            <NavLink to="/today" label="Hoy" />
            <NavLink to="/history" label="Historial" />
            <NavLink to="/manage" label="Mis grupos" />
          </nav>
        )}
      </div>
    </header>
  );
}
