import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ".././App.css";
export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbarCustom">
      <nav className="navbar  navbar-expand-sm navbar-dark bg-light text-uppercase ">
        <div className="container-fluid ">
          <ul className="navbar-nav ms-5 mt-2">
            <li className="nav-item">
              <Link className="btn btn-light btn-outline-primary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employee
              </Link>
            </li>

            <li className="nav-item">
              <p>{}</p>
            </li>
            <li className="nav-item">
              <button className="Logout" onClick={handleLogout}>
                <Link className="btn btn-light btn-outline-primary" to="/">
                  logout{" "}
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-right-from-bracket"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </span>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
