import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayoutBs from "../pages/admin/DashboardLayout";

export default function AdminRoutes() {
  const isAdmin = true; // kiểm tra đăng nhập và vai trò admin

  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/" element={<DashboardLayoutBs />} />
        </>
      ) : (
        <Route path="/admin/*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}
