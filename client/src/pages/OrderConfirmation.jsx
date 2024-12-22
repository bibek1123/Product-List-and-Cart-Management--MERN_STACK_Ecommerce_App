import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const OrderConfirmation = () => {
  const { cart, dispatch } = useContext(CartContext);

  const confirmOrder = () => {
    alert("Order Confirmed!");
    dispatch({ type: "RESET_CART" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      {cart.map(item => (
        <div key={item.id} className="border-b py-2">
          <p>{item.name}</p>
          <p>${item.price} x {item.quantity}</p>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={confirmOrder}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
