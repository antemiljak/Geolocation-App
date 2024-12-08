import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter name");
      return;
    }

    if (!age || age < 0 || age > 110) {
      setError("Please enter valid age");
      return;
    }

    if (!height || height < 100 || height > 250) {
      setError("Please enter valid height");
      return;
    }

    if (!weight || weight < 0 || weight > 300) {
      setError("Please enter valid weight");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    //Sign up API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        name: name,
        age: age,
        weight: weight,
        height: height,
        email: email,
        password: password,
      });

      //Handle successful create account response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      //Handle register error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center justify-center mt-28 ">
          <div className="w-5/12 p-5 flex justify-center items-center">
            <form onSubmit={handleSignUp}>
              <h4 className="text-3xl font-bold mb-4">Sign Up</h4>
              <p className="text-sm mb-4">Enter your information down below</p>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <p className="mb-2">Name</p>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <div>
                      <p className="mb-2">Age</p>
                      <input
                        type="number"
                        placeholder="years"
                        className="input-box"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="mb-2">Height </p>
                      <input
                        type="number"
                        placeholder="cm"
                        className="input-box"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="mb-2">Weight </p>
                      <input
                        type="number"
                        placeholder="kg"
                        className="input-box"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="mb-2">Email</p>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="mb-2">Password</p>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 flex gap-2 items-center justify-center">
                <button type="submit" className="btn-primary w-1/2">
                  Sign Up
                </button>
                <p className="text-sm text-center w-1/2">
                  Already have account?{" "}
                  <Link to="/login" className="underline font-medium">
                    Login
                  </Link>
                </p>{" "}
              </div>
              {error && (
                <p className="text-red-500 text-xs pt-3 pb-1">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
