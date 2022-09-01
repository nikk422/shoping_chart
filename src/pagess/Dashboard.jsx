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
        <div className="d-flex justify-content-center flex-wrap pt-5 Container-dash">
          <div
            className="d-flex flex-column align-items-center pt-4"
            style={{ width: "55rem" }}
          >
            <div
              className="d-flex flex-column align-items-start w-semibold  mb-4"
              style={{ width: "68%" }}
            >
              <p className="text-black-50 ms-3 ">Welcome Natalia</p>
              <h1 className="ms-3 ">Overview Shop</h1>
            </div>
            <div
              className="d-flex justify-content-center flex-wrap"
              style={{ width: "100%" }}
            >
              <div
                className="card text-bg-warning bg-opacity-10 m-2 rounded-4"
                style={{ width: "12rem", height: "12rem" }}
              >
                <div className="card-body text-start" style={{ width: "7rem" }}>
                  <h4 className="card-text">New orders</h4>
                </div>
                <p className="text-start text-muted ms-3">
                  +5% <i class="fa fa-upload"></i>
                </p>
                <h4 className="text-start ms-3">
                  $ {summaryOrder.overview.average_sale[0].average_sale}
                </h4>
              </div>

              <div
                className="card text-bg-secondary bg-opacity-10 m-2 rounded-4"
                style={{ width: "12rem", height: "12rem" }}
              >
                <div className="card-body text-start" style={{ width: "8rem" }}>
                  <h4 className="card-text text-black">Average sale</h4>
                </div>
                <p className="text-start text-muted ms-3">
                  +4.8% <i class="fa fa-upload"></i>
                </p>
                <h4 className="text-black text-start ms-3">
                  $ {summaryOrder.overview.new_orders[0].new_orders}
                </h4>
              </div>

              <div
                className="card text-bg-info bg-opacity-10 m-2 rounded-4"
                style={{ width: "12rem", height: "12rem" }}
              >
                <div
                  className="card-body text-start"
                  style={{ width: "8.5rem" }}
                >
                  <h4 className="card-text">Total Earnings</h4>
                </div>
                <p className="text-start text-muted ms-3">
                  +3.2% <i class="fa fa-upload"></i>
                </p>
                <h4 className="text-start ms-3">
                  $ {summaryOrder.overview.total_earnings[0].total_earnings}
                </h4>
              </div>
            </div>
            <div
              className="d-flex justify-content-around text-bg-secondary  rounded-4 p-4 mt-4"
              style={{ width: "95%", height: "50vh" }}
            >
              <div
                className="text-bg-secondary bg-opacity-10 overflow-hidden rounded-4"
                style={{ width: "5%", height: "100%" }}
              >
                {accending().map((e) => {
                  return (
                    <div
                      className="opacity-75"
                      style={{
                        height: `${lengthcolor(e.count)}%`,
                        backgroundColor: `${colorsfun(e.order_status)}`,
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
                          className="d-flex justify-content-between align-items-center"
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
            
            <div className="mt-5" style={{ width: "95%" }}>
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
            className=" pt-4 text-bg-secondary  rounded-4 responsive-orders"
            style={{ width: "100vw" }}
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
                <div style={{width:"90%"}}>
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
                </div>
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
