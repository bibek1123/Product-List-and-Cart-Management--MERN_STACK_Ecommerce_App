import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Product Cart</Link>
        <div className="space-x-4">
          <Link to="/admin">Admin</Link>
          <Link to="/order-confirmation">Order Confirmation</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
