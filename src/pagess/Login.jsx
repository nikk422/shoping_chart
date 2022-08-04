import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../context/LoginContext";


const SignIn = () => {
  const { state: {authToken,error}, LoginPage  } = useLogin();
  const navigate= useNavigate()

  const [showpass, setShowPass]=useState(false);

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e;
    setLoginDetail({ ...loginDetail, [name]: value });
  };

  const submit = () => {
    LoginPage(loginDetail);
  };

  if(authToken){
      navigate("/dashboard")
  }


  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column px-3
    "
      style={{ height: "100vh" }}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokCH_hmbIUYqWFJQMUp8WH9Cf3AQOC57ySQ&usqp=CAU"
        alt="logo"
      />
      <div
        className="container  border border-2 rounded-4 p-4"
        style={{ width: "35rem", height: "50vh" }}
      >
        <h2 className="fw-bold text-decoration-underline ">Sign In</h2>
        <h5 className="text-start fw-bolder ">Email</h5>
        <input
          type="email"
          className="form-control rounded-5"
          placeholder="Enter your Email"
          required
          onChange={(e) => inputHandler(e.target)}
          name="username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        {error && <p style={{color:"red"}}>incorrect username</p>}
        <h5 className="text-start fw-bolder mt-3">Password</h5>
        <div className="input-group mb-3">
          <input
            type={showpass ? "text" : "password"}
            className="form-control rounded-5 rounded-end"
            id="exampleFormControlInput1"
            required
            onChange={(e) => inputHandler(e.target)}
            name="password"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            placeholder="Enter your Password"
          />
          <span className="input-group-text rounded-5 rounded-start" onClick={() =>setShowPass(!showpass)}>show</span>
        </div>
        {error && <p style={{color:"red"}}>incorrect password</p>}
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary fw-bolder rounded-3"
            onClick={submit}
            type="button"
          >
            Sign in
          </button>
          <Link to="/forgot">
            <p>Forgot Password ?</p>
          </Link>
          <p>
            Don't have an account?
            <Link to="/">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
