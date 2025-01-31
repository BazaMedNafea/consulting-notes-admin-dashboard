import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AllTeachers from "./pages/teachers/AllTeachers";
import AllParents from "./pages/parents/AllParents";
import AddParent from "./pages/parents/AddParent";
import ParentDetails from "./pages/parents/ParentDetails";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import AddTeacher from "./pages/teachers/AddTeacher";

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
          path="/admin/add-teacher"
          element={
            <Layout>
              <ProtectedRoute>
                <AddTeacher />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/teachers/:teacherId"
          element={
            <Layout>
              <ProtectedRoute>
                <TeacherDetails />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/admin/parents"
          element={
            <Layout>
              <ProtectedRoute>
                <AllParents />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/admin/add-parent"
          element={
            <Layout>
              <ProtectedRoute>
                <AddParent />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/parents/:parentId"
          element={
            <Layout>
              <ProtectedRoute>
                <ParentDetails />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
