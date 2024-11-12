import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  browserHistory,
  Redirect,
  Link,
  Navigate,
} from "react-router-dom";

import { EmpoyeePage } from "../Component/Employee";
import { LoginPage } from "../Component/Login";
import { HomePage } from "../Component/Home";

export const AllRouter = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: localStorage.getItem("token") ? <HomePage /> : <LoginPage />,
  //   },
  //   {
  //     path: "/Login",
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: "/employee",
  //     element: localStorage.getItem("token") ? <EmpoyeePage /> : <LoginPage />,
  //   },
  // ]);

  // return <RouterProvider router={router} />;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/employee" element={<EmpoyeePage />} />
      </Routes>
    </BrowserRouter>
  );
};
