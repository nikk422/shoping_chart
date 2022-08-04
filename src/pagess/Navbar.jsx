import {Link} from "react-router-dom";
import {useLogin} from "../context/LoginContext";
import {useNavigate} from "react-router-dom";


const Navbar=()=>{
    const {state:{authToken},dispatch}=useLogin();
    const navigate = useNavigate()


    const logoutHandler=()=>{
        dispatch({type: 'LOGOUT'})
        navigate("/")
    }



    return (
        <nav class="navbar bg-light">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold">Pushpak</a>
          <form class="d-flex" role="search">
          {
              authToken ? (
                  <button class="btn btn-outline-success fw-bold" type="submit" onClick={logoutHandler}>Logout</button>
              ):(

          <Link to="/">
            <button class="btn btn-outline-success fw-bold" type="submit">Login</button>
            </Link>
              )
          }
          </form>
        </div>
      </nav>
    )
}
export default Navbar;