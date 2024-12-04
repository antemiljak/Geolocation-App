import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

const Map = () => {
  const [position, setPosition] = useState(null);

  const MapUpdater = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        // Center the map to the user's position once it's available
        map.setView([position.lat, position.lng], 13);
      }
    }, [position, map]);

    return null;
  };

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      const tracker = navigator.geolocation.watchPosition(
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
          enableHighAccuracy: true, // Ensure we get the most accurate position
          maximumAge: 0, // Don't use cached position
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      return () => {
        if (tracker) {
          navigator.geolocation.clearWatch(tracker);
        }
      };
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  console.log(position);
  return (
    <MapContainer
      center={[43.513295, 16.454859]}
      zoom={13}
      className="h-full w-full rounded"
      whenCreated={(map) => map.invalidateSize()}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MapUpdater position={position} />
      {position && <Marker position={[position.lat, position.lng]}></Marker>}
    </MapContainer>
  );
};

export default Map;
