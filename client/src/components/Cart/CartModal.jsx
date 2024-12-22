import React from "react";

const CartModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <button onClick={onClose} className="text-red-500 font-bold mb-4">Close</button>
        {children}
      </div>
    </div>
  );
};

export default CartModal;
