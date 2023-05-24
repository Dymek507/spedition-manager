import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

const createRoutineMachineLayer = (props: any) => {
  const { routeCords } = props || {}
  const instance = L.Routing.control({
    position: 'topleft',
    waypoints: [
      L.latLng(routeCords.from.lat, routeCords.from.lng),
      L.latLng(routeCords.destination.lat, routeCords.destination.lng)
    ],
    lineOptions: {
      styles: [
        {
          color: '#757de8',
        },
      ],
    },
  });

  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;