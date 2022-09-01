import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

export const Forgot = () => {
  const [inputValue, setInputValue] = useState({ password: "Password@54" });
  const navigate = useNavigate();

  const {
    state: { authToken, error },
    LoginPage,
  } = useLogin();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const Submit = () => {
    LoginPage(inputValue);
  };

  if (authToken) {
    navigate("/dashboard");
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center  m-2"
      style={{ height: "100vh" }}
    >
      <img
        src="data:image/png;base64,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"
        alt="logo img"
      />

      <div
        className="d-flex  justify-content-center align-items-center  m-3 "
        style={{ width: "100%" }}
      >
        <div class="card p-3 rounded-4" style={{ width: "fit-content" }}>
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ width: "100%" }}
          >
            <h1>Forgot Password</h1>
          </div>

          <div class="card-body d-flex align-items-start flex-column ">
            <h5>Email</h5>
            <div class="input-group mb-3">
              <input
                type="text"
                name="username"
                class="form-control rounded-4"
                placeholder="Enter Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => inputHandler(e)}
              />
            </div>

            {error && (
              <div
                className="d-flex flex-column justify-content-center align-items-center m-3"
                style={{ color: "red", width: "100%" }}
              >
                Incorrect Username or Password!
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary mb-3 rounded-4"
              onClick={Submit}
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
