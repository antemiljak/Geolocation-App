import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Function to fetch location
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    };

    // Call getLocation every 1 second
    const intervalId = setInterval(getLocation, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return position;
};

export default useGeolocation;
