import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AllTeachers from "./pages/teachers/AllTeachers";
import TeacherApproval from "./pages/teachers/TeacherApproval";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout hideNavbar>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout hideNavbar>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <Layout>
              <ProtectedRoute>
                <AllTeachers />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/admin/approval"
          element={
            <Layout>
              <ProtectedRoute>
                <TeacherApproval />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
