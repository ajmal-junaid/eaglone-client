import React from "react";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/user/courses");
  };
  return (
    <motion.div
      className="bg-gray-100 h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <AiOutlineShoppingCart size={64} />
      <motion.h1
        className="text-2xl mt-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Your cart is empty
      </motion.h1>
      <p className="text-gray-500 mt-2">
        Start adding items to your cart and see them here.
      </p>
      <motion.button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={() => handleShopNow()}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

export default CartEmpty;
