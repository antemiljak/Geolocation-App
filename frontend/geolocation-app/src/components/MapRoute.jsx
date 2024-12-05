import React from "react";
import StartLogo from "../assets/running.png";
import EndLogo from "../assets/racing-flag.png";
import { TileLayer, Polyline, Popup, Marker } from "react-leaflet";
import L from "leaflet";

const MapRoute = ({ coordinates, title }) => {
  const startPosition = coordinates[0];
  const endPosition = coordinates[coordinates.length - 1];

  const startIcon = L.icon({
    iconUrl: StartLogo,
    iconSize: [30, 30],
    iconAnchor: [20, 30],
    popupAnchor: [4, -31],
  });

  const endIcon = L.icon({
    iconUrl: EndLogo,
    iconSize: [30, 30],
    iconAnchor: [3, 30],
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
        <Popup>{title + ":Start"}</Popup>
      </Marker>
      <Marker position={endPosition} icon={endIcon}>
        <Popup>Finish</Popup>
      </Marker>
    </div>
  );
};

export default MapRoute;
