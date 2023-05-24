import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L, { LatLngExpression } from 'leaflet';
import placeholder from "./placeholder.png"
import { IRouteCords } from '../../types/model';
import RoutingMachine from './RoutingMachine';

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

const OpenStreetMapExample = ({ routeCords }: { routeCords: IRouteCords }) => {
  const { from, center, destination } = routeCords || {}

  useEffect(() => {
    const fromLatLng = L.latLng(from);
    const toLatLng = L.latLng(destination);

    const dis = fromLatLng.distanceTo(toLatLng);
    console.log(dis / 1000);
  }, [routeCords])

  return (
    <div className='wh-full'>
      <MapContainer center={[51.505, -0.09]} zoom={8} scrollWheelZoom={false}
        className='h-[600px]'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine />
        {routeCords && (
          <>
            <Marker position={from} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={destination} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
        <ResetCenterView centerPosition={center} />
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapExample;
