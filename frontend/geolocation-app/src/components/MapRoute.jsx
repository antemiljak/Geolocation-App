import React from "react";
import StartLogo from "../assets/running.png";
import EndLogo from "../assets/racing-flag.png";
import { TileLayer, Polyline, Popup, Marker } from "react-leaflet";
import L from "leaflet";

const MapRoute = ({ coordinates, title }) => {
  const startPosition = coordinates[0];
  const endPosition = coordinates[coordinates.length - 1];

  const startIcon = L.divIcon({
    html: '<i class="fas fa-car fa-2x" style="color: black;"></i>',
    className: "custom-start-icon",
    iconSize: [32, 32], // Adjust icon size
    iconAnchor: [3, 25],
    popupAnchor: [4, -31],
  });

  const endIcon = L.divIcon({
    html: '<i class="fas fa-flag-checkered fa-2x" style="color: black;"></i>',
    className: "custom-start-icon",
    iconSize: [32, 32], // Adjust icon size
    iconAnchor: [3, 25],
    popupAnchor: [4, -31],
  });
  return (
    <div>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Polyline positions={coordinates} color="black" />{" "}
      <Marker position={startPosition} icon={startIcon}>
        <Popup>{title + " : Start"}</Popup>
      </Marker>
      <Marker position={endPosition} icon={endIcon}>
        <Popup>{title + " : Finish"}</Popup>
      </Marker>
    </div>
  );
};

export default MapRoute;
