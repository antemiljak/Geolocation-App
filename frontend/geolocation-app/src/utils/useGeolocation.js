import { useState, useEffect } from "react";

// Custom hook to track geolocation
const useGeolocation = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(id); // Cleanup on unmount
      };
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return position;
};

export default useGeolocation;
