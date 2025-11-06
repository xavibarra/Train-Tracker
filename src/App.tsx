import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/pages/AuthPage";
import HistoryPage from "@/pages/HistoryPage";
import ManagePage from "@/pages/ManagePage";
import TodayPage from "@/pages/TodayPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        <Route path="*" element={<div className="p-6">404</div>} />
      </Routes>
    </div>
  );
}
