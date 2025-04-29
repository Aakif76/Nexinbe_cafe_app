import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar"; // Import the default Navbar
import UserNavbar from "./UserNavbar"; // Import the UserNavbar for logged-in users

const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Order = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [order, setOrder] = useState(null);
  const { orderId } = useParams(); // get orderId from URL

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check login status by verifying the presence of a token in localStorage
      const token = localStorage.getItem("token"); // Check for the token
      setIsLoggedIn(!!token); // Set the login status based on the token's presence
    };

    checkLoginStatus(); // Run the login check when the component mounts
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  useEffect(() => {
    if (orderId) {
      axios.get(`${BACKEND_URL}/api/user/order/${orderId}`)
        .then(res => setOrder(res.data))
        .catch(() => setOrder(null));
    }
  }, [orderId]);

  return (
    <>
      {/* Conditionally render either UserNavbar or Navbar based on login status */}
      {isLoggedIn ? <UserNavbar /> : <Navbar />}

      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Order Tracking</h1>
        <p>Your order is being prepared...</p>
      </div>
    </>
  );
};

export default Order;