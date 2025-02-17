import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import NewRouteRecording from "../components/NewRouteRecording";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
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

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <section className="md:h-screen bg-[url('assets/bg-landingpage-mobile.jpg')] md:bg-[url('assets/bg-landingpage.jpg')] bg-cover bg-center">
        <Navbar userInfo={userInfo} />
        <div className="flex gap-3 text-lg ml-[4%]">
          <button
            onClick={() => navigate("/allroutespage", { state: { userInfo } })}
            className="btn-secondary w-32"
          >
            All Routes
          </button>
          <button
            onClick={() => navigate("/stats", { state: { userInfo } })}
            className="btn-secondary w-32"
          >
            Profile
          </button>
        </div>
        <div className="md:flex md:h-[85vh] py-6 md:p-6 mx-auto md:max-w-[95%]">
          <div className="md:flex-[0.8] w-full h-[55vh] md:h-full">
            <Map />
          </div>
          <div className="p-6 md:p-0 md:flex-[0.4] flex flex-col gap-y-4 justify-center items-center">
            <NewRouteRecording userInfo={userInfo} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
