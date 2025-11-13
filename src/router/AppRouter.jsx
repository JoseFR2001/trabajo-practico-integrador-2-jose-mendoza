import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes></Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
