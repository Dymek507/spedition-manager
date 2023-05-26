import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
} from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import placeholder from "./placeholder.png"

import RoutingControl from './RoutingControl'
import L, { LatLngExpression } from "leaflet";
import { ICargo, IRouteCords } from "../../types/model";

const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [38, 38],
});

interface IMapProps {
  routeCords: IRouteCords | undefined
  cargo: ICargo
}

const Map = ({ routeCords, cargo }: IMapProps) => {
  const [map, setMap] = useState(null);

  const [start, setStart] = useState<LatLngExpression | undefined>(undefined)
  const [end, setEnd] = useState<LatLngExpression | undefined>(undefined)

  useEffect(() => {
    if (routeCords) {
      setStart([routeCords.from.lat, routeCords.from.lng])
      setEnd([routeCords.destination.lat, routeCords.destination.lng])
    }
  }, [routeCords])



  return (
    <>
      {start && end && routeCords && (
        <MapContainer
          center={routeCords.center}
          zoom={12}
          scrollWheelZoom={true}
          className='h-[400px]'
          whenReady={setMap}
        >
          {/* <ResetCenterView centerPosition={routeCords.center} /> */}
          <RoutingControl position={'topleft'} start={start} end={end} color={'#757de8'} cargo={cargo} />
          {/* <RoutingControl routeCords={routeCords} position={'topleft'} /> */}
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      )}
    </>
  );
};

export default Map;