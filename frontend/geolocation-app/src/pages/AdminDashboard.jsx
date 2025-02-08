import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import MonthPicker from "../components/MonthPicker";
import MonthlyList from "../components/MonthlyList";

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [company, setCompany] = useState(null);
  const [paidCommissions, setPaidCommissions] = useState(0);
  const [unpaidCommissions, setUnpaidCommissions] = useState(0);
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setCompany(response.data.user.company);
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

  const handlePaidComission = (comission) => {
    if (comission < paidCommissions) return;
    else setPaidCommissions((prev) => prev + comission);
  };

  const handleUnpaidComission = (comission) => {
    if (comission < unpaidCommissions) return;
    else setUnpaidCommissions((prev) => prev + comission);
  };

  const handleUserSelect = (name) => {
    setSelectedUser(name);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleAllTimeClick = () => {
    setSelectedMonth(null);
  };

  useEffect(() => {
    getUserInfo();
    getAllUsers();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="md:flex md:justify-between">
        <MonthPicker
          onMonthChange={handleMonthChange}
          onAllTime={handleAllTimeClick}
        />
        <MonthlyList selectedMonth={selectedMonth} />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 px-2">
        <div className=" bg-zinc-800 rounded-xl">
          <div className="p-2 text-lg md:text-3xl font-bold txt-color">
            Select employee:
          </div>
          <div className="overflow-y-auto max-h-36 custom-scrollbar md:m-2">
            <ul>
              <li
                className="md:text-2xl txt-color font-bold cursor-pointer hover:text-white mx-4"
                onClick={() => handleUserSelect("all")}
              >
                Show all
              </li>
              <hr className="m-2" />
              {allUsers
                .filter((user) => user.role !== "admin")
                .map((item) => (
                  <div
                    className="flex items-center gap-2 m-2 mx-4 hover:scale-105"
                    onClick={() => handleUserSelect(item.name)}
                  >
                    <i class="fas fa-user" />
                    <li
                      key={item._id}
                      className="md:text-xl txt-color font-bold cursor-pointer  hover:text-white"
                    >
                      {item.name}
                    </li>
                  </div>
                ))}
            </ul>
          </div>
        </div>

        <div className=" bg-zinc-800 rounded-xl">
          <div className="p-2 text-lg md:text-3xl font-bold txt-color">
            Comissions:
          </div>
          <ul className=" m-2">
            <div className="flex items-center gap-2 m-2">
              <li className="text-sm md:text-md text-slate-300">Payed out:</li>
              <li className="md:text-xl font-semibold text-green-300">
                {paidCommissions.toFixed(2) / 2}€
              </li>
            </div>
            <div className="flex items-center gap-2 m-2">
              <li className="text-sm md:text-md text-slate-300">
                To be paid:{" "}
              </li>
              <li className="md:text-xl font-semibold text-rose-500">
                {unpaidCommissions.toFixed(2)}€
              </li>
            </div>
            <div className="flex items-center gap-2 m-2">
              <li className="text-sm md:text-md text-slate-300">Total:</li>
              <li className="md:text-xl font-semibold">
                {(paidCommissions / 2 + unpaidCommissions).toFixed(2)}€
              </li>
            </div>
            {unpaidCommissions ? (
              ""
            ) : (
              <p className="m-2 font-bold">
                All commisions paid <i class="fas fa-check"></i>
              </p>
            )}
          </ul>
        </div>
        <div className=" bg-zinc-800 rounded-xl">
          <div className="p-2 text-xl md:text-3xl font-bold txt-color">
            Employees:
          </div>
          <div className="w-24 h-24 flex items-center justify-center rounded-full text-green-300 text-4xl font-bold bg-zinc-900 mx-auto my-4">
            {allUsers.length - 1}
          </div>
        </div>
        <div className="flex items-center justify-center bg-zinc-800 rounded-xl p-2">
          <h1 className="text-3xl md:text-5xl font-bold">{company}</h1>
        </div>
      </div>
      <div className="m-2 md:m-0">
        {allUsers
          ?.filter((user) =>
            selectedUser !== "all"
              ? user.name === selectedUser
              : user.role === "user"
          )
          .map((item) => (
            <UserCard
              key={item._id}
              id={item._id}
              name={item.name}
              email={item.email}
              carPlate={item.carPlate}
              reportPaidComission={handlePaidComission}
              reportUnpaidComission={handleUnpaidComission}
              selectedMonth={selectedMonth}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
