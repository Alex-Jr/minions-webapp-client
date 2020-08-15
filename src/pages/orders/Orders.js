import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import OrderService from "../../services/OrderService"
import FormatDate from "../../utils/FormatDate"
import FormatPrice from "../../utils/FormatPrice"
import "./Orders.css"

const Orders = () => {
  const { orderId }  = useParams()
  const [ ordersData, setOrdersData ] = useState(false);
  useEffect(() => {
    OrderService.getOrders(orderId)
    .then((data) => {
        setOrdersData(data)
    })
    .catch(() => {
        setOrdersData(false);
        alert("Pedido não encontrado");
    })
  },[orderId])

  return(
    <div id="orders-page">
      {ordersData && 
        <div id="orders-container">
          <h1>Pedido N°{ordersData.orderId}</h1>
          <h2>Feito às {FormatDate(ordersData.orderedAt)} - Valor: {FormatPrice(ordersData.totalPrice)}</h2>
          <p>Endereço para entrega: {ordersData.address.street} - CEP: {ordersData.address.cep}</p>
          <p>Pedido:</p>
          {Object.values(ordersData.products).map((product, index) => {
            return(
              <div key={index} id="product-container">
                {product.quantity} {product.name} por {FormatPrice(product.price * product.quantity)} 
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Orders;