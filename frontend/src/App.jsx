import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Webcam from "./Pages/webcam";
import Violations from "./pages/Violations";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/webcam"
        element={
          <Layout>
            <Webcam />
          </Layout>
        }
      />

      <Route
        path="/violations"
        element={
          <Layout>
            <Violations />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
