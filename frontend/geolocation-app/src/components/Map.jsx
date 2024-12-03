import React from "react";
import { MapContainer } from "react-leaflet";
import MapRoute from "../components/MapRoute";

const Map = ({ allRoutes }) => {
  return (
    <MapContainer
      center={[43.513295, 16.454859]}
      zoom={13}
      className="h-full w-full rounded"
    >
      {allRoutes?.map((route) => (
        <MapRoute key={route._id} coordinates={route.coordinates} />
      ))}
    </MapContainer>
  );
};

export default Map;
