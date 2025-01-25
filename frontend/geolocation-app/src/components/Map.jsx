import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import useGeolocation from "../utils/useGeolocation";

const Map = () => {
  const position = useGeolocation();

  const MapUpdater = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        // Center the map to the user's position once it's available
        map.setView([position.lat, position.lng], 16);
      }
    }, [position, map]);

    return null;
  };

  return (
    <MapContainer
      center={[43.513295, 16.454859]}
      zoom={16}
      className="h-full w-full md:rounded-xl"
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
