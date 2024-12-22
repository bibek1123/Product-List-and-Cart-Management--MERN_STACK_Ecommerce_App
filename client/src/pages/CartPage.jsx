import React, { useState, useEffect } from "react";
import axios from "axios";
import CartModal from "../components/Cart/CartModal";
import CartSummary from "../components/Cart/CartSummary";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/cart/getItemList`);
        setCart(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Remove item from cart
  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`${process.env.API_BASE_URL}/cart/deleteItem/${itemId}`);
      setCart((prev) => prev.filter((item) => item._id !== itemId)); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => handleRemove(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))
      )}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        View Summary
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CartSummary items={cart} total={total} />
      </CartModal>
    </div>
  );
};

export default CartPage;
