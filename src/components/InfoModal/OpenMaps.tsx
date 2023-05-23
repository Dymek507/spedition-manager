import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const position = [51.505, -0.09]

const OpenStreetMapExample = () => {
  return (
    <MapContainer
      //@ts-ignore
      center={position}
      zoom={12}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> {/* OpenStreetMap tile layer */}
      {/* Markers or additional components can be added here */}
    </MapContainer>
  );
};

export default OpenStreetMapExample;
