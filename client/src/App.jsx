import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import {jwtDecode} from "jwt-decode";
import { useEffect} from "react";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        console.log(error);
        Cookies.remove("user");
        // navigate("/login")
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="h-full">
      <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
