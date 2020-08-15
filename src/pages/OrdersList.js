import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./OrdersList.css";
import OrderService from "../services/OrderService";
import FormatPrice from "../utils/FormatPrice";
import { Link } from "react-router-dom";
import FormatDate from "../utils/FormatDate";

const OrdersList = () => {
  const [ordersListData, setOrdersListData] = useState([]);

  const { userId } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userId !== null) {
      OrderService.getOrdersList(userId)
        .then((data) => {
          setOrdersListData(data);
        })
        .catch(() => {
          setOrdersListData([]);
        });
    };
  }, [userId]);

  return (
    <div id="orders-page">
      <table id="orders-table">
        <thead id="orders-tableHeader">
          <tr>
            <th>PEDIDO</th>
            <th>DATA</th>
            <th className="orders-tablePrice">VALOR</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody id="orders-tableBody">
          {ordersListData.map((order, index) => {
            return (
              <tr key={index}>
                <th>
                  <Link to={`/orders/${order.orderId}`}>{order.orderId}</Link>
                </th>
                <th>{FormatDate(order.orderedAt)}</th>
                <th className="orders-tablePrice">
                  {FormatPrice(order.totalPrice)}
                </th>
                <th>
                  <Link to={`/orders/${order.orderId}`}>Visualizar</Link>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
