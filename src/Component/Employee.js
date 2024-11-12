import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { API_URL } from "../API_URL/api_url";
import { NavBar } from "../Navigation Bar/header";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        EmployeeName: action.payload.EmployeeName,
        Email: action.payload.Email,
        Mobile: action.payload.Mobile,
        Designation: action.payload.Designation,
        Gender: action.payload.Gender,
        EmployCourseeeName: action.payload.EmployCourseeeName,
        PhotoFileName: action.payload.PhotoFileName,
      };
    case "MODAL_TITLE_ADD_EMPLOYEE":
      return {
        ...state,
        modalTitle: "Add Employee",
        EmployeeId: 0,
        EmployeeName: "",
        Email: "",
        Mobile: "",
        Designation: "HR",
        Gender: "Male",
        EmployCourseeeName: "MCA",
        PhotoFileName: "",
      };

    case "MODAL_TITLE_EDIT_EMPLOYEE":
      return {
        ...state,
        modalTitle: "Update Employee",
        EmployeeId: action.payload.EmployeeId,
        EmployeeName: action.payload.EmployeeName,
        Email: action.payload.Email,
        Mobile: action.payload.Mobile,
        Designation: action.payload.Designation,
        Gender: action.payload.Gender,
        EmployCourseeeName: action.payload.EmployCourseeeName,
        PhotoFileName: action.payload.PhotoFileName,
      };
    default:
      return;
  }
};

export const EmpoyeePage = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const [designation, setDepartment] = useState(["HR", "Manager", "Sales"]);
  const [course, setCourse] = useState(["MCA", "BCA", "BSC"]);
  const [gender, setGender] = useState(["Male", "Female"]);
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    EmployeeId: 0,
    EmployeeName: "",
    Email: "",
    Mobile: "",
    Designation: "HR",
    Gender: "Male",
    EmployCourseeeName: "MCA",
    photoPath: API_URL.photosPath,
    PhotoFileName: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = (search = "") => {
    //fetching employee information
    axios
      .get(`${API_URL.EMPLOYEE}?search=${search}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setEmployee(res.data);
      });
  };

  const addClick = () => {
    dispatch({
      type: "MODAL_TITLE_ADD_EMPLOYEE",
      payload: {
        modalTitle: state.modalTitle,
        EmployeeId: state.EmployeeId,
        EmployeeName: "",
        Email: "",
        Mobile: "",
        Designation: "HR",
        Gender: "Male",
        EmployCourseeeName: "MCA",
        PhotoFileName: "",
      },
    });
  };

  const editClick = (emp) => {
    dispatch({
      type: "MODAL_TITLE_EDIT_EMPLOYEE",
      payload: {
        modalTitle: state.modalTitle,
        EmployeeId: emp.EmployeeId,
        EmployeeName: emp.EmployeeName,
        Email: emp.Email,
        Mobile: emp.Mobile,
        Designation: emp.Designation,
        Gender: emp.Gender,
        EmployCourseeeName: emp.EmployCourseeeName,
        PhotoFileName: emp.PhotoFileName,
      },
    });
  };

  //    add employement
  const handleCreate = () => {
    if (
      !state.EmployeeName ||
      !state.Email ||
      !state.Mobile ||
      !state.Designation ||
      !state.Gender ||
      !state.EmployCourseeeName ||
      !state.PhotoFileName
    ) {
      alert("ALL FIELDS ARE REQUIRED!");
      return;
    }
    const formData = new FormData();
    formData.append("EmployeeName", state.EmployeeName);
    formData.append("Email", state.Email);
    formData.append("Mobile", state.Mobile);
    formData.append("Designation", state.Designation);
    formData.append("Gender", state.Gender);
    formData.append("EmployCourseeeName", state.EmployCourseeeName);
    formData.append("PhotoFileName", state.PhotoFileName);
    axios
      .post(API_URL.EMPLOYEE, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("The Employee is successfully added!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(`Error while Creating Employee: ${err.response.data.message}`);
        } else if (err.request) {
          alert("Error sending request. Please try again later.");
        } else {
          alert("Unknown error. Please try again later.");
        }
      });
  };

  const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(API_URL.PROFILEPHOTO, formData)
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "ADD_EMPLOYEE",
          payload: {
            ...state,
            PhotoFileName: res.data.fileName,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error while uploading image");
      });
  };

  const handleUpdate = (id) => {
    if (
      !state.EmployeeName ||
      !state.Email ||
      !state.Mobile ||
      !state.Designation ||
      !state.Gender ||
      !state.EmployCourseeeName ||
      !state.PhotoFileName
    ) {
      alert("ALL FIELDS ARE REQUIRED!");
      return;
    }

    const _id = employee.find(({ EmployeeId }) => EmployeeId === id)?._id;

    axios
      .put(
        `${API_URL.EMPLOYEE}${_id}`,
        {
          EmployeeName: state.EmployeeName,
          Email: state.Email,
          Mobile: state.Mobile,
          Designation: state.Designation,
          Gender: state.Gender,
          EmployCourseeeName: state.EmployCourseeeName,
          PhotoFileName: state.PhotoFileName,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(
        (res) => {
          alert("You are Succeccfully Update Employee!");
          window.location.reload();
        },
        (err) =>
          alert(
            `Error while Updating the Employee! ,please try again ${err.response.data.message}`
          )
      );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete Employee?")) {
      axios
        .delete(`${API_URL.EMPLOYEE}${id}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            alert("You are Successfully Delete Employee !");
            window.location.reload();
          },
          (err) =>
            alert(
              `Error While Deleting Employee,try again! ${err.response.data.message}`
            )
        );
    }
  };

  const handleSearch = () => {
    getPosts(search);
  };

  return (
    <div className="table-responsive navbarCustom">
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Employee List</h1>
      <div className="employee-header">
        <div className="employee-search">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search Employees..."
            className="search-input"
          />
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => addClick()}
        >
          Create Employee
        </button>
      </div>
      <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="Unique Id">{emp.EmployeeId}</td>
              <td data-title="Image">
                <img
                  className="rounded-circle profileImage"
                  src={state.photoPath + emp.PhotoFileName}
                  alt=""
                />
              </td>
              <td data-title="Name">{emp.EmployeeName}</td>
              <td data-title="Email">{emp.Email}</td>
              <td data-title="Mobile">{emp.Mobile}</td>
              <td data-title="Designation">{emp.Designation}</td>
              <td data-title="Gender">{emp.Gender}</td>
              <td data-title="Course">{emp.EmployCourseeeName}</td>
              <td data-title="Action">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </span>
                </button>
                <button
                  className="btn btn-sm shadow-lg  rounded-pill ms-2"
                  onClick={() => handleDelete(emp._id)}
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      style={{ fontSize: "12px" }}
                    ></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h4 className="modal-title">{state.modalTitle}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Name:</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            EmployeeName: e.target.value,
                          },
                        })
                      }
                      value={state.EmployeeName}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Email:</span>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Email: e.target.value,
                          },
                        })
                      }
                      value={state.Email}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Mobile:</span>
                    <input
                      type="text"
                      pattern="[789][0-9]{9}"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Mobile: e.target.value,
                          },
                        })
                      }
                      value={state.Mobile}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Designation:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Designation: e.target.value,
                          },
                        })
                      }
                      value={state.Designation}
                    >
                      {designation.map((dep) => (
                        <option key={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Gender:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Gender: e.target.value,
                          },
                        })
                      }
                      value={state.Gender}
                    >
                      {gender.map((dep) => (
                        <option key={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Course:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            EmployCourseeeName: e.target.value,
                          },
                        })
                      }
                      value={state.EmployCourseeeName}
                    >
                      {course.map((dep) => (
                        <option key={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* photo  */}
                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    alt=""
                    src={`${state.photoPath}${state.PhotoFileName}`}
                  />
                  <input
                    className="m-2"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={imageUpload}
                  />
                </div>
              </div>
              {/* button to update department  */}
              {state.EmployeeId !== 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={() => handleUpdate(state.EmployeeId)}
                >
                  {" "}
                  Update
                </button>
              ) : null}
              {/* button to create new department  */}
              {state.EmployeeId === 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={handleCreate}
                >
                  {" "}
                  Create
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
