import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import placeholder from "./placeholder.png"

import RoutingControl from './RoutingControl'
import L from "leaflet";
import { IRouteCords } from "../../types/model";

const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [38, 38],
});

function ResetCenterView({ centerPosition }: {
  centerPosition: {
    lat: number
    lng: number
  }
}) {
  const map = useMap();

  useEffect(() => {
    if (centerPosition) {
      map.setView(
        L.latLng(centerPosition?.lat, centerPosition?.lng),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [centerPosition, map]);

  return null;
}



const Map = ({ routeCords }: { routeCords: IRouteCords }) => {

  const [map, setMap] = useState(null);

  return (
    <>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={8}
        zoomControl={false}
        className='h-[600px]'
        whenCreated={map => setMap(map)}
      >
        {/* *************** */}
        {/* <RoutingMachine /> */}
        {/* *************** */}
        <RoutingControl routeCords={routeCords} />
        {routeCords && (
          <>
            <Marker position={routeCords.destination} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={routeCords.destination} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <ResetCenterView centerPosition={routeCords.center} />
      </MapContainer>
    </>
  );
};

export default Map;