require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const MapRoute = require("./models/map-route.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//Create Account
app.post("/create-account", async (req, res) => {
  const { name, age, company, carPlate, email, password, role } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!age) {
    return res.status(400).json({ error: true, message: "Age is required" });
  }

  if (!company) {
    return res
      .status(400)
      .json({ error: true, message: "Company is required" });
  }

  if (!carPlate) {
    return res
      .status(400)
      .json({ error: true, message: "License plate is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }

  // Default role is "user"
  let userRole = "user";

  // If trying to create an admin, check authorization
  if (role === "admin") {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .json({ error: true, message: "Unauthorized to create admin" });
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({
          error: true,
          message: "Only admins can create another admin",
        });
      }
      userRole = "admin";
    } catch (error) {
      return res
        .status(403)
        .json({ error: true, message: "Invalid or expired token" });
    }
  }

  const user = new User({
    name,
    age,
    company,
    carPlate,
    email,
    password,
    role: userRole,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user: {
      name,
      age,
      company,
      carPlate,
      email,
      role: userRole,
      _id: user._id,
    },
    accessToken,
    message: "Registration Successful",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password required",
    });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    const isAdmin = userInfo.role === "admin";

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
      isAdmin,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      name: isUser.name,
      age: isUser.age,
      company: isUser.company,
      carPlate: isUser.carPlate,
      email: isUser.email,
      role: isUser.role,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

app.get("/get-all-users", authenticateToken, async (req, res) => {
  const { user } = req.user;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ error: true, message: "Unauthorized. Admins only." });
  }

  try {
    const users = await User.find({ company: user.company });

    if (users.length === 0) {
      return res.status(404).json({
        error: true,
        message: `No users found for company: ${user.company}`,
      });
    }

    return res.json({
      users: users.map((user) => ({
        name: user.name,
        age: user.age,
        company: user.company,
        carPlate: user.carPlate,
        email: user.email,
        _id: user._id,
        createdOn: user.createdOn,
      })),
      message: "Users fetched successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Failed to retrieve users" });
  }
});

app.post("/add-map-route", authenticateToken, async (req, res) => {
  const { title, coordinates, distance, startTime, endTime, duration } =
    req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!coordinates) {
    return res
      .status(400)
      .json({ error: true, message: "No provided coordinates" });
  }

  if (!distance) {
    return res
      .status(400)
      .json({ error: true, message: "Failed to calculate distance" });
  }

  if (!startTime) {
    return res
      .status(400)
      .json({ error: true, message: "No recorded start time" });
  }

  if (!endTime) {
    return res
      .status(400)
      .json({ error: true, message: "No recorded end time" });
  }

  if (!duration) {
    return res
      .status(400)
      .json({ error: true, message: "Failed to calculate duration" });
  }

  try {
    const mapRoute = new MapRoute({
      title,
      coordinates,
      distance,
      startTime,
      endTime,
      duration,
      userId: user._id,
    });

    await mapRoute.save();
    return res.json({
      error: false,
      mapRoute,
      message: "Map Route Successfuly added",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/get-all-map-routes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const mapRoute = await MapRoute.find({ userId: user._id });

    return res.json({
      error: false,
      mapRoute,
      message: "All map routes retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.delete(
  "/delete-map-route/:mapRouteId",
  authenticateToken,
  async (req, res) => {
    const mapRouteId = req.params.mapRouteId;
    const { user } = req.user;

    try {
      const mapRoute = await MapRoute.findOne({
        _id: mapRouteId,
        userId: user._id,
      });

      if (!mapRoute) {
        return res
          .status(404)
          .json({ error: true, message: "Map Route not found" });
      }

      await MapRoute.deleteOne({ _id: mapRouteId, userId: user._id });

      return res.json({
        error: false,
        message: "Map Route deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  }
);

app.listen(8000, "0.0.0.0", () => {
  console.log("Server is running on 0.0.0.0");
});

module.exports = app;
