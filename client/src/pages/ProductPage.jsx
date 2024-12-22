import React, { useState, useEffect } from "react";
import ProductGrid from "../components/Product/ProductGrid";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/user/product/list`)
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/cart/addItem`, {
        productId: product.id,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        setCart((prev) => [...prev, { ...product, quantity: 1 }]);
        alert("Item added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
