import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Problem2 = () => {
  const navigate = useNavigate();

  const handleModal = (name) => {
    if (name === "all") {
      navigate("/problem-2/modal/modalA");
    } else if (name === "us") {
      navigate("/problem-2/modal/modalB");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => handleModal("all")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => handleModal("us")}
          >
            US Contacts
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Problem2;
