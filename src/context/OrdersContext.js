import {createContext , useContext , useReducer} from "react";
import axios from "axios";

const ordersContext=createContext();

const OrdersProvider=({children})=>{


    const reducer=(state, action)=>{
        switch(action.type){
            case "ORDER-LIST":
                return {...state, orderlist:action.payload}
            case "ORDER-SUMMARY":
                return {...state, summaryOrder:action.payload}
            case "ORDER-7-DAYS":
                return {...state, ordersDays:action.payload}
            default:
                return state;
        }

    }

    const [state , dispatch]= useReducer(reducer,{
        orderlist:[],
        summaryOrder:{overview:undefined},
        ordersDays:[]
    })

    const orderData= async()=>{
        try {
            const res= await axios.get("http://13.76.214.165:8001/api/orders?page=1&limit=15&order_status=",{
                headers: {Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM"}
            })
            dispatch({type: "ORDER-LIST", payload:res.data.data})
            
        } catch (error) {
            console.log(error)
            
        }
    }

    const orderSummary=async()=>{
        try {
            const res= await axios.get("http://13.76.214.165:8001/api/analytics/summary",{
                headers:{Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM"}

            })
            dispatch({type:"ORDER-SUMMARY",payload:res.data.data})
            
        } catch (error) {
            console.log(error)
            
        }
    }

    const Orders7Days= async()=>{
        try{
            const res  = await axios.get("http://13.76.214.165:8001/api/analytics/last7Days",
            {
                headers : {Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM"}
            })
            dispatch({type:'ORDER-7-DAYS',payload:res.data.data})
        }catch(err){
            console.log(err)
        }
    }

    return (
        <ordersContext.Provider value={{orderData,Orders7Days, orderSummary ,state , dispatch}}>
            {children}
        </ordersContext.Provider>
    )

}


const useOrders=()=>useContext(ordersContext);

export {useOrders , OrdersProvider}