import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LandingPic from "../assets/landingpic.png";
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
        <div className="md:flex md:justify-center mt-24 md:mr-[4%]">
          <div className="flex flex-col items-center md:ml-[4%] md:w-1/2 relative">
            <p className="text-4xl font-bold md:text-6xl mb-6 md:mb-8 txt-color">
              All In One Place
              <br /> LoCCo Drive
            </p>
            <ul className="flex justify-center justify-center gap-8 md:gap-12 text-slate-200 w-[85%] md:w-[75%] mb-6 md:mb-4 italic text-sm">
              <li>REAL-TIME</li>
              <li>TRACKING</li>
              <li>MANAGE</li>
              <li>PAY</li>
            </ul>

            <div className="w-full md:w-[75%] mb-8 md:bg-zinc-900 rounded-xl p-6">
              <p className="mb-8 rounded-lg p-2 text-lg font-semibold txt-color">
                Experience the power of accurate and real-time location tracking
                with <span className="font-bold text-green-300">GeoLocc </span>
                app. Automatically track your movement in real-time. Calculate
                duration, distance, and speed with precision. Generate detailed
                reports for work or reimbursement. Pay commissions to employees
                for their business drives.
              </p>
              <p></p>
              <div className="px-2 flex items-center justify-center gap-4">
                <button
                  className="btn-primary w-64"
                  onClick={() => navigate("/signup")}
                >
                  New Account
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
            src={LandingPic}
            alt=""
            className="rounded-lg w-[100%] md:w-[50%] md:h-auto mx-auto mb-8 transition duration-500 ease-out hover:scale-110 hover:ease-in"
          />{" "}
        </div>
      </section>
      <section id="about" className="w-screen bg-white">
        <div className="md:flex items-center justify-between px-8 md:px-36 py-12 text-black">
          <h1 className="mt-12 text-3xl md:text-5xl font-bold md:w-1/2">
            About Us
          </h1>
          <p className=" mt-12 md:w-1/2 text-lg text-black">
            At GeoLocc, we believe that managing work-related drives should be
            effortless. Our platform was built to help professionals and
            businesses track, analyze, and optimize their local drives with
            ease. Whether you're logging trips for reimbursement, calculating
            distances for reporting, or managing employee commissions for
            business travel, we provide a seamless, all-in-one solution. With
            real-time tracking, automated reports, and integrated payment
            management, we take the guesswork out of mileage logging—so you can
            focus on what matters most. Our mission is to simplify drive
            management, improve transparency, and help businesses reward their
            teams accurately. Join us in making work-related travel smarter,
            faster, and more efficient!
          </p>
        </div>
        <div className="mt-6 flex items-center justify-start md:justify-center gap-8 md:gap-12 overflow-x-auto md:overflow-hidden mx-4 scroll-snap-type-x mandatory scrollbar-thin">
          <div className="relative flex flex-wrap justify-center gap-6">
            <div className="relative">
              <img
                src={Driving}
                alt="Driving"
                className="w-64 h-64 md:w-80 md:h-80 rounded brightness-50"
              />
              <p className="absolute inset-0 flex items-center justify-center text-white text-lg text-center p-4">
                💼 For businesses & freelancers – Keep every drive organized,
                optimize routes, and ensure accurate compensation for your team.
              </p>
            </div>

            <div className="relative">
              <img
                src={Road}
                alt="Road"
                className="w-64 h-64 md:w-80 md:h-80 rounded brightness-50"
              />
              <p className="absolute inset-0 flex items-center justify-center text-white text-lg text-center p-4">
                📊 All-in-One Solution – Say goodbye to messy logs! Get
                insights, reports, and payment tracking all in one place.
              </p>
            </div>

            <div className="relative">
              <img
                src={Traffic}
                alt="Traffic"
                className="w-64 h-64 md:w-80 md:h-80 rounded brightness-50"
              />
              <p className="absolute inset-0 flex items-center justify-center text-white text-lg text-center p-4">
                🔗 Start tracking today! Maximize efficiency, minimize effort.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
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
