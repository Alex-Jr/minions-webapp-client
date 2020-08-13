import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Orders.css";
import OrderService from "../services/OrderService";
import FormatPrice from "../Utils/FormatPrice";
import { Link } from "react-router-dom";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);

  const { userId } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userId !== null) {
      OrderService.getOrders(userId)
        .then((data) => {
          setOrdersData(data);
        });
    }
  }, [userId]);

  return (
    <div id="orders-page">
      <table id="orders-table">
        <thead id="orders-tableHeader">
          <tr>
            <th>PEDIDO</th>
            <th>DATA</th>
            <th>VALOR</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody id="orders-tableBody">
          {ordersData.map((order, index) => {
            const date = new Date(order.orderedAt);
            const convertedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            return (
            <tr key={index}>
              <th>
                <Link to={`/orders/${order.orderId}`}>
                  {order.orderId}
                </Link>
              </th>
              <th>
                {convertedDate}
              </th>
              <th>
                {FormatPrice(order.totalPrice)}
              </th>
              <th>
                <Link to={`/orders/${order.orderId}`}>
                  Visualizar
                </Link>
              </th>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
