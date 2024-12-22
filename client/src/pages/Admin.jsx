import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${process.env.API_BASE_URL}/admin/product/create`, product);
    alert("Product added successfully");
    setProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full"
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          className="border p-2 w-full"
          value={product.price}
          onChange={e => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 w-full"
          value={product.image}
          onChange={e => setProduct({ ...product, image: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Admin;
