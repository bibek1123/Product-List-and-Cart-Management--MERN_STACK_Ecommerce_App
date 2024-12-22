import React, { useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import axios from "axios";

const Home = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.API_BASE_URL}/user/product/list`).then(response => setProducts(response.data));
  }, []);

  const addToCart = product => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Desserts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
