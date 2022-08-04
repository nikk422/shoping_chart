import { useOrders } from "../context/OrdersContext";
import { useEffect, useState } from "react";
import Navbar from "../pagess/Navbar";
import Chart from "./Chart";

const Dashboard = () => {
  const {
    state: { orderlist, summaryOrder, ordersDays },
    orderData,
    orderSummary,
    Orders7Days,
  } = useOrders();

  useEffect(() => {
    orderData();
    orderSummary();
    Orders7Days();
  }, []);

  let coloresData = [
    { name: "processing", color: "yellow", icon: "fa-refresh" },
    { name: "delivered", color: "green", icon: "fa-check-square-o" },
    { name: "in delivery", color: "skyblue", icon: "fa-truck" },
    { name: "refund", color: "black", icon: "fa-sign-out" },
    { name: "cancelled", color: "red", icon: "fa-times-rectangle-o" },
  ];

  const [filterValue, setFilterValue] = useState("");

  const lengthcolor = (count) => {
    let totalCount = summaryOrder.summary.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
    return (count / totalCount) * 100;
  };

  const accending = () => {
    if (summaryOrder.summary) {
      return summaryOrder.summary.sort((a, b) => a.count - b.count);
    }
    return [];
  };

  const colorsfun = (e) => {
    return coloresData.find((a) => a.name === e).color;
  };

  const colorsIcon = (e, type) => {
    if (type === "color") {
      return coloresData.find((a) => a.name === e).color;
    } else {
      return coloresData.find((a) => a.name === e).icon;
    }
  };

  const filteredFun = () => {
    let filteredArray = orderlist;

    if (filterValue === "Choose...") {
      return filteredArray;
    } else if (filterValue) {
      return filteredArray.filter((item) => item.order_status === filterValue);
    }
    return filteredArray;
  };

  return (
    <>
      <Navbar />
      {summaryOrder.overview !== undefined ? (
        <div className="d-flex justify-content-evenly pt-5">
          <div
            className="border-start text-start ps-4"
            style={{ height: "70vh", width: "25%" }}
          >
            <p className="fw-semibold text-black-50">Welcome Natalia</p>
            <h4 className="fw-bolder">Overview shop</h4>
            <div className="d-flex gap-4 ">
              <div
                className="border border-secondary text-bg-warning bg-opacity-10 rounded-4 p-2"
                style={{ height: "15vh", width: "7vw" }}
              >
                <h6>New orderes</h6>
                <small className="text-start mt-3 text-muted">
                  +5% <i class="fa fa-upload"></i>
                </small>
                <p>{summaryOrder.overview.new_orders[0].new_orders}</p>
              </div>
              <div
                className="border border-secondary rounded-4 p-2 bg-success p-2 text-dark bg-opacity-25"
                style={{ height: "15vh", width: "7vw" }}
              >
                <h6>Average sale</h6>
                <small className="text-start text-muted mt-3">
                  +4.8% <i class="fa fa-upload"></i>
                </small>
                <p>${summaryOrder.overview.average_sale[0].average_sale}</p>
              </div>
              <div
                className="border border-secondary rounded-4 p-2 bg-success p-2 text-dark bg-opacity-10"
                style={{ height: "15vh", width: "7vw" }}
              >
                <h6>Total Earnings</h6>
                <small className="text-start text-muted mt-3">
                  +3.2% <i class="fa fa-upload"></i>
                </small>
                <p>${summaryOrder.overview.total_earnings[0].total_earnings}</p>
              </div>
            </div>
            <div
              className="border border-secondary d-flex justify-content-around  rounded-4 p-2 mt-4 text-bg-secondary bg-opacity-10 "
              style={{ height: "40vh", width: "23rem" }}
            >
              <div
                className="text-bg-secondary bg-opacity-10 rounded-4 overflow-hidden"
                style={{ width: "5%", height: "100%" }}
              >
                {accending().map((i) => {
                  return (
                    <div
                      className="opacity-75"
                      style={{
                        backgroundColor: `${colorsfun(i.order_status)}`,
                        height: `${lengthcolor(i.count)}%`,
                      }}
                    ></div>
                  );
                })}
              </div>
              <div
                className="d-flex flex-column justify-content-between m-1"
                style={{ width: "85%" }}
              >
                {accending()
                  .reverse()
                  .map((e) => {
                    return (
                      <div className="d-flex justify-content-around align-items-center opacity-75">
                        <p
                          className="d-flex justify-content-center align-items-center rounded mb-0"
                          style={{
                            width: "3rem",
                            height: "3rem",
                            backgroundColor: `${colorsIcon(
                              e.order_status,
                              "color"
                            )}`,
                          }}
                        >
                          <i
                            className={`fa ${colorsIcon(
                              e.order_status,
                              "icon"
                            )} text-primary text-white`}
                            style={{ fontSize: "24px" }}
                          ></i>
                        </p>
                        <div
                          className="d-flex justify-content-between ms-3 align-items-center"
                          style={{ width: "90%" }}
                        >
                          <h5 className="text-dark m-1">{e.order_status}</h5>
                          <h6 className="text-dark m-1">{e.count}</h6>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
              <div className="ms-1" style={{ width: "150%"}}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div
                    className="d-flex justify-content-between ms-1"
                    style={{ width: "10rem" }}
                  >
                    <h5>Revenue</h5>
                    <h5>Orders</h5>
                  </div>
                  <select
                    class="form-select me-2"
                    aria-label="Default select example"
                    style={{ width: "8.5rem" }}
                  >
                    <option selected>Last 7 Days</option>
                    <option value="1">Last Month</option>
                    <option value="2">Last Year</option>
                    <option value="3">Last 3 Year</option>
                  </select>
                </div>
                <Chart data={ordersDays} />
              </div>
            </div>
          <div
            className="border border-2"
            style={{ height: "fit-content", width: "40%" }}
          >
            <div className="text-start p-4">
              <h4 className="fw-bolder">Latest Orders</h4>
              <div className="input-group mb-3">
                <button
                  className="border-0 rounded-start pe-3 ps-3"
                  style={{ backgroundColor: "white" }}
                >
                  <i className="fa fa-filter" style={{ fontSize: "24px" }}></i>
                </button>
                <select
                  onClick={(e) => setFilterValue(e.target.value)}
                  className="form-select border-0"
                  id="inputGroupSelect03"
                  aria-label="Example select with button addon"
                  style={{ height: "6vh" }}
                >
                  <option selected value="Choose...">
                    Choose...
                  </option>
                  <option value="in delivery">in delivery</option>
                  <option value="refund">refund</option>
                  <option value="processing">processing</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>{" "}
              <div className="m-3 d-flex justify-content-between text-black">
                <span className="m-3">Date</span>
                <span className="m-3">ID</span>
                <span className="m-3">Billing name</span>
                <span className="m-2">Amount</span>
                <span className="m-2">Order Status</span>
              </div>
              {filteredFun().map((i) => (
                <div className=" m-1 d-flex ">
                  <span className="m-2" style={{ width: "8rem" }}>
                    {i.date.slice(0, 10)}
                  </span>
                  <span className="m-2" style={{ width: "8rem" }}>
                    {i.id}
                  </span>
                  <span className="m-2" style={{ width: "12rem" }}>
                    {i.billing_name}
                  </span>
                  <span className="m-2" style={{ width: "2rem" }}>
                    ${i.amount}
                  </span>
                  <span
                    className="ms-5 rounded p-1 bg-opacity-10"
                    style={{
                      backgroundColor: `${colorsfun(i.order_status)}`,
                      color: `${
                        i.order_status === "refund" ? "white" : "black"
                      }`,
                      textAlign: "center",
                      width: "11rem",
                    }}
                  >
                    {i.order_status}
                  </span>
                </div>
              ))}
              <div className="text-end">
                <button
                  className="btn btn-primary fw-bolder rounded-3"
                  type="button"
                >
                  More Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Dashboard;
