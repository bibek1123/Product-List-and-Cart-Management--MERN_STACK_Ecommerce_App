import React from "react";

const CartSummary = ({ items, total }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price} x {item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold mt-4">Total: ${total}</p>
    </div>
  );
};

export default CartSummary;
