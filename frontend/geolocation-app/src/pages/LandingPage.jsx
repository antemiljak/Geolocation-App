import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
      <section className="md:h-screen bg-[url('assets/bg-landingpage-mobile.jpg')] md:bg-[url('assets/bg-landingpage.jpg')] bg-cover bg-center">
        <Navbar />
        <div className="md:flex md:justify-center mt-16 md:mr-[4%]">
          <div className="flex flex-col items-center md:ml-[4%] md:w-2/3 relative">
            <h1 className="text-6xl md:text-8xl txt-color font-bold mb-4">
              GeoLoCC
            </h1>
            <ul className="flex justify-center justify-center gap-8 md:gap-12 text-slate-200 w-[85%] md:w-[75%] mb-6 md:mb-4 italic text-sm">
              <li>RECORD</li>
              <li className="text-rose-500">TRACK</li>
              <li>MANAGE</li>
              <li className="text-rose-500">PAY</li>
            </ul>

            <div className="w-full mb-8 rounded-xl p-6">
              <p className="mb-8 rounded-lg p-2 text-lg txt-color">
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
                  About Us
                </button>
              </div>
            </div>
            <p className="text-4xl font-bold md:text-5xl mb-24 md:mb-6 md:mb-8 txt-color">
              All In One Place
              <br /> GeoLoCC Drive
            </p>
          </div>
        </div>
      </section>
      <section id="about" className="bg-white">
        <div className="md:flex items-center justify-between px-8 md:px-36 py-12 text-black">
          <h1 className="mt-12 text-3xl md:text-7xl font-bold md:w-1/2">
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

        <div className="relative flex flex-wrap justify-center gap-6">
          <div className="relative">
            <img
              src={Driving}
              alt="Driving"
              className="w-72 h-64 md:w-96 md:h-80 rounded brightness-50"
            />
            <p className="absolute inset-0 flex items-center justify-center txt-color md:text-lg text-center p-4">
              For businesses & freelancers - Keep every drive organized,
              optimize routes, and ensure accurate compensation for your team.
            </p>
            <div className="flex items-center">
              <i class="fas fa-lightbulb text-green-300 hover:text-rose-500 text-5xl m-4"></i>
              <p className="text-lg text-black">Enhance productivity.</p>
            </div>
          </div>

          <div className="relative">
            <img
              src={Road}
              alt="Road"
              className="w-72 h-64 md:w-96 md:h-80 rounded brightness-50"
            />
            <p className="absolute inset-0 flex items-center justify-center txt-color md:text-lg text-center p-4">
              All-in-One Solution – Say goodbye to messy logs! Get insights,
              reports, and payment tracking all in one place.
            </p>
            <div className="flex items-center">
              <i class="fas fa-money-bill-wave text-green-300 text-5xl m-4"></i>
              <p className="text-lg text-black">Free to use.</p>
            </div>
          </div>

          <div className="relative">
            <img
              src={Traffic}
              alt="Traffic"
              className="w-72 h-64 md:w-96 md:h-80 rounded brightness-50"
            />
            <p className="absolute inset-0 flex items-center justify-center txt-color md:text-lg text-center p-4">
              Start tracking today! Maximize efficiency, minimize effort.
            </p>
            <div className="flex items-center">
              <i class="fas fa-cloud text-green-300 text-5xl m-4"></i>
              <p className="text-lg text-black">All info at one place.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <button
            className="btn-primary w-64"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <p className="text-black text-lg mt-2">Start managing today.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
