import { useState } from "react";

export const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const haversineDistance = (point1, point2) => {
  const R = 6371e3; // Radius of Earth in meters.
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Destructure the arrays into latitudes and longitudes
  const [lat1, lon1] = point1; // Point 1 is an array [latitude, longitude]
  const [lat2, lon2] = point2; // Point 2 is an array [latitude, longitude]

  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Haversine formula

  return distance;
};

export const calculateDuration = (durationMs) => {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;
};
