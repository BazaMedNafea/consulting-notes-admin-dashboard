import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
