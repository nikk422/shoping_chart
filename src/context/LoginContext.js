import {createContext , useContext , useReducer} from "react";
import axios from "axios";

const loginContext= createContext("")

const LoginProvider=({children})=>{

    const reducer=(state,action)=>{
        switch(action.type){
            case "LOGIN":
                return {...state,authToken:localStorage.getItem("token",action.payload)}
            
            case "LOGOUT":
                localStorage.removeItem("token")
                return {...state, authToken:null,error:false}
            case "ERROR":
                return {...state, error:true}

            default:
                return state;
        }

    }

    const [state,dispatch] = useReducer(reducer,{
        authToken:localStorage.getItem("token"),
        error:false
    })


    const LoginPage = async({username, password})=>{
        try {
            const {data}= await axios.post("http://13.76.214.165:8001/api/login",{ username, password });
             localStorage.setItem("token" , data.token)
             dispatch({type:"LOGIN",payload:data.token})
             console.log("succes")
        } catch (error) {
            console.error(error)
            dispatch({type:"ERROR"})
        }
    }




    return (
        <loginContext.Provider value={{LoginPage, state,dispatch}}>
            {children}
        </loginContext.Provider>
    )
}


const useLogin=()=>useContext(loginContext);

export {useLogin , LoginProvider};