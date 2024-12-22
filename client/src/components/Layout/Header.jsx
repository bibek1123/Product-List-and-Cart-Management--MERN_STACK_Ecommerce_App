import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">My E-commerce</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-gray-300">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
