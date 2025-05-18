# GPS Tracking Web Application

## Table of Contents
1. [General Info](#general-info)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Database Model](#database-model)
6. [Deployed Version](#deployed-version)

---

## General Info
This web application is designed to track and analyze the movement of users based on GPS data. The app collects GPS data from the user's mobile device to track their route on an interactive map. Based on the collected data, the app calculates key parameters such as distance traveled, route duration, average speed, and a calculated allowance based on a pre-defined price.

Users of this application represent employees of a specific company, while the administrator represents the employer. The user can view information about all their past routes, see all recorded routes on a map, access statistics for their profile, and visualize the data they've collected during their travels. On the other hand, the administrator has access to all data about users' routes. The admin can view the total generated cost of all routes and generate monthly reports for individual or all users within the company.

The goal of this project is to develop a functional application that allows users to track their routes in a precise yet simple way, while enabling the employer to effectively monitor business trips, costs, and payments for each user’s route.

The app is built using the MERN stack (MongoDB, Express.js, React, Node.js), which ensures a fast and efficient implementation for a large number of users and companies while keeping up with modern trends in web development.

---

## Features
- Real-time GPS tracking of user movement.
- Route visualization on an interactive map.
- Calculation of distance traveled, route duration, and average speed.
- Automatic calculation of allowances based on predefined prices.
- User profile and route history with statistics.
- Admin access to all user route data and cost summaries.
- Ability to generate monthly reports for users.
- Integration with Google Geocoding API for address visualization on routes.
- Real-time data updates using Geolocation API and Leaflet for maps.
  
---

## Technologies
This project uses a range of technologies for both the backend and frontend:

- **Backend**: 
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)  
  - ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

- **Frontend**: 
  - ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
  - ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=flat&logo=tailwind-css&logoColor=white)  

- **Database**: 
  - ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

- **Real-time Communication**: 
  - Geolocation API

- **Map Visualization**: 
  - ![Leaflet](https://img.shields.io/badge/Leaflet-3c3c3c?style=flat&logo=leaflet&logoColor=white)

- **Charts**: 
  - ![Charts.js](https://img.shields.io/badge/Charts.js-F7A400?style=flat&logo=chart.js&logoColor=white)

- **Geocoding**: 
  - Google Geocoding API


The app utilizes the MERN stack, which is a popular combination of technologies for building modern, scalable web applications.

---

## Database Model
The application uses MongoDB for storing user data and routes. Below are the key schemas:

### User Model:
```javascript
const userSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  company: { type: String },
  carPlate: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdOn: { type: Date, default: new Date().getTime() },
});
```

### Route Model:
```javascript
const mapRouteSchema = new Schema({
  title: { type: String, required: true },
  coordinates: { type: Array, required: true },
  distance: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  status: { type: Boolean, required: true },
  userId: { type: String, required: true },
});
});
```

## Deployed Version

You can access the live, deployed version of the application here:

- [Live App on Vercel](https://geolocation-app-swart.vercel.app/)
