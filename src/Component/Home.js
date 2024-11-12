import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../Navigation Bar/header";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="table-responsive navbarCustom">
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Employee Management System</h1>
      <h3 style={{ marginTop: "40px", textAlign: "center" }}>
        Welcome to admin panel!
      </h3>
    </div>
  );
};
