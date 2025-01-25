import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Earth from "../assets/earth.png";
import Footer from "../components/Footer";
import Traffic from "../assets/traffic.jpg";
import Road from "../assets/road.jpg";
import Driving from "../assets/driving.jpg";
const LandingPage = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <section className="md:w-screen md:h-screen">
        <Navbar />
        <div className="md:flex md:items-center md:justify-center mt-16 md:mr-[4%]">
          <div className="flex flex-col items-center md:ml-[4%] mt-12 mt-16 md:w-1/2 relative">
            <p className="text-4xl font-bold md:text-6xl mb-6 md:mb-8 bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
              Discover the World
              <br /> Around You
            </p>
            <ul className="flex justify-center justify-center gap-8 md:gap-12 text-xs text-slate-200 w-[85%] md:w-[75%] mb-6 md:mb-4">
              <li>REAL-TIME</li>
              <li>TRACKING</li>
              <li>MANAGE</li>
              <li>DISCOVER</li>
            </ul>

            <div className="w-[75%] mb-8 bg-zinc-900 rounded-xl p-6">
              <p className="mb-8 rounded-lg p-2 text-slate-100 text-sm md:text-md">
                Experience the power of accurate and real-time location tracking
                with <span className="font-bold">Geolocation App</span>. Whether
                you're navigating through a new city, keeping track of loved
                ones, or managing assets, our app gives you the tools you need
                to stay connected and in control.
              </p>
              <p></p>
              <div className="px-2 flex items-center justify-center gap-4">
                <button
                  className="btn-primary w-64"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </button>
                <button
                  className="btn-secondary w-64"
                  onClick={() => scrollToSection("about")}
                >
                  Learn more...
                </button>
              </div>
            </div>
          </div>
          <img
            src={Earth}
            alt=""
            className="rounded-lg w-[75%] md:w-[40%] md:h-auto mx-auto mb-8 md:mt-16"
          />{" "}
        </div>
      </section>
      <section id="about" className="h-fit md:h-screen w-screen bg-white">
        <div className="md:flex items-center justify-between px-12 md:px-36 py-12 text-black">
          <h1 className="mt-12 text-3xl md:text-5xl font-bold md:w-1/2">
            About Us
          </h1>
          <p className=" mt-12 md:w-1/2 text-sm md:text-md">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham.Finibus Bonorum et Malorum" by Cicero are
            also reproduced in their exact original form, accompanied by English
            versions from the 1914 translation by H. Rackham.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-start md:justify-center gap-8 md:gap-12 overflow-x-auto md:overflow-hidden mx-4 scroll-snap-type-x mandatory">
          <img
            src={Driving}
            alt="Driving"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded"
          />
          <img
            src={Road}
            alt="Road"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded"
          />
          <img
            src={Traffic}
            alt="Traffic"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded"
          />
        </div>
        <div className="flex items-center justify-center my-16">
          <button
            className="btn-primary w-64"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
