import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-user");
      if (response.data && response.data.user) {
        setAllUsers(response.data.user);
        console.log(allUsers);
      }
    } catch (error) {
      console.log("Unexpected error occured.");
    }
  };
  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <div>{allUsers}</div>
    </div>
  );
};

export default AdminDashboard;
