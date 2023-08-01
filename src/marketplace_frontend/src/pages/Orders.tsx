import React from "react";
import OrderDetails from "../components/Orders/OrderDetails";
import OrderHistory from "../components/Orders/OrderHistory";
import { useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { backendActor } from "../hooks/config";

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [rawOrders, setRawOrders] = useState(null);
  const [orders, setOrders] = useState(null);

  const getPrincipalId = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      setUserId(userPrincipal);
    }
  };

  useEffect(() => {
    getPrincipalId();
  }, []);

  const getOrders = async () => {
    const res = await backendActor.getMyOrders(userId);
    setRawOrders(res);
  };

  useEffect(() => {
    if (userId) {
      getOrders();
    }
  }, [userId]);

  useEffect(() => {
    if (rawOrders) {

      const formatOrderDate = (timestamp: bigint): string => {
        const date = new Date(Number(timestamp));
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString();
      };

      const ordersWithModifiedFields = rawOrders.map((order) => {

        const formattedDate = formatOrderDate(order.dateCreated);

        return {
          ...order,
          step: parseInt(order.step),
          dateCreated: formattedDate,
        };
      });
      setOrders(ordersWithModifiedFields);
    }
  }, [rawOrders]);

  return (
    <div>
      <OrderDetails orders={orders} />
      <OrderHistory />
    </div>
  );
};

export default Orders;
