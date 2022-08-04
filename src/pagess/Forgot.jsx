import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";


export const Forgot = () => {

    const [inputValue, setInputValue] = useState({ password: "Password@54" });
    const navigate = useNavigate();

    const { state: { authToken, error }, dispatch,LoginPage } = useLogin();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    };

    const Submit = () => {
        LoginPage(inputValue);
    };


    if (authToken) {
        navigate("/dashboard")
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center  m-2" style={{ height: "100vh" }}>

            <img src="./pushpak.jpeg" alt="logo img" />

            <div className="d-flex  justify-content-center align-items-center  m-3 " style={{ width: "100%" }}>
                <div class="card p-3 rounded-4" style={{ width: "40rem" }}>

                    <div className="d-flex justify-content-center align-items-center " style={{ width: "100%" }}>
                        <h1>Forgot Password</h1>
                    </div>

                    <div class="card-body d-flex align-items-start flex-column " >

                        <h5>Email</h5>
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                name="username"
                                class="form-control rounded-4"
                                placeholder="Enter Email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => inputHandler(e)}
                            />
                        </div>


                        {error &&
                            <div className="d-flex flex-column justify-content-center align-items-center m-3" style={{ color: "red", width: "100%" }}>
                                Incorrect Username or Password!
                            </div>
                        }

                        <button
                            type="button"
                            className="btn btn-primary mb-3 rounded-4"
                            onClick={Submit}
                            style={{ width: "100%" }}>Submit</button>

                    </div>
                </div>
            </div>
        </div>
    )
}