import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="h-screen">
        <Navbar />
        <div className="flex items-center justify-center mt-16">
          <div className="w-96 p-4">
            <form onSubmit={handleLogin}>
              <h4 className="text-4xl font-bold mb-4 txt-color">Login</h4>
              <p className="text-sm mb-4">
                Enter your email and password to continue
              </p>
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

              <button type="submit" className="btn-primary my-2">
                Login
              </button>

              <p className="text-sm text-center">
                Not registered yet?{" "}
                <Link to="/signup" className="underline font-medium">
                  Create Account
                </Link>
              </p>
              {loading && (
                <div className="flex justify-center mt-4">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-300 border-t-transparent rounded-full"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {error && (
                <p className="text-red-500 text-sm p-1 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
