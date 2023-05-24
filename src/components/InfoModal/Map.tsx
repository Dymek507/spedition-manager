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
import L, { LatLngExpression } from "leaflet";
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



const Map = ({ routeCords }: { routeCords: (IRouteCords | undefined) }) => {
  const [map, setMap] = useState(null);

  const [start, setStart] = useState<LatLngExpression | undefined>(undefined)
  // const [start, setStart] = useState<LatLngExpression>([38.9072, -77.0369])
  console.log('start', start)
  const [end, setEnd] = useState<LatLngExpression | undefined>(undefined)
  // const [end, setEnd] = useState<LatLngExpression>([37.7749, -122.4194])
  console.log('end', end)

  useEffect(() => {
    if (routeCords) {
      setStart([routeCords.from.lat, routeCords.from.lng])
      setEnd([routeCords.destination.lat, routeCords.destination.lng])
    }
  }, [routeCords])



  return (
    <>
      {start && end && (
        <MapContainer
          center={routeCords.center}
          zoom={3}
          scrollWheelZoom={false}
          // zoomControl={false}
          className='h-[600px]'
          whenCreated={map => setMap(map)}
        >
          {/* <ResetCenterView centerPosition={routeCords.center} /> */}
          <RoutingControl position={'topleft'} start={start} end={end} color={'#757de8'} />
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