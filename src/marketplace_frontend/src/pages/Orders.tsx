import React from "react";
import OrderDetails from "../components/Orders/OrderDetails";
import OrderHistory from "../components/Orders/OrderHistory";
import { useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  canisterId,
  idlFactory,
} from "../../../declarations/marketplace_backend";

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [rawOrders, setRawOrders] = useState(null);
  const [orders, setOrders] = useState(null);

  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

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
      const convertImage = (image: Uint8Array | number[]): string => {
        const imageContent = new Uint8Array(image);
        const blob = new Blob([imageContent.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
      };

      const formatOrderDate = (timestamp: bigint): string => {
        const date = new Date(Number(timestamp));
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString();
      };

      const ordersWithConvertedImages = rawOrders.map((order) => {
        const orderProducts = order.orderProducts.map((product) => ({
          ...product,
          image: convertImage(product.image),
        }));

        const formattedDate = formatOrderDate(order.dateCreated);

        return {
          ...order,
          dateCreated: formattedDate,
          orderProducts: orderProducts,
        };
      });
      setOrders(ordersWithConvertedImages);
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
