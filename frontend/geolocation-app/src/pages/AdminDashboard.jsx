import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token); // Retrieve stored token
      const response = await axiosInstance.get("/get-all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
    getAllUsers();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="w-full h-full md:grid md:grid-cols-3 gap-6 mb-6 ">
        {allUsers?.map((item, index) => (
          <UserCard
            key={item._id}
            id={item._id}
            name={item.name}
            email={item.email}
            carPlate={item.carPlate}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
