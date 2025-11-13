import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoute from "./PublicRoute";
import { useState } from "react";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const [auth, setAuth] = useState(true);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Rutas Publicas */}
        <Route element={<PublicRoute authStatus={auth} />}>
          <Route path="/login" />
          <Route path="/register" />
        </Route>

        <Route element={<PrivateRoute authStatus={auth} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
