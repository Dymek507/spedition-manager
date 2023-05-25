import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import sendDistanceToFirebase from "../../helpers/sendDistanceToFirebase";
import { ICargo } from "../../types/model";

interface IRoutingMachineProps {
  position: string
  start: L.LatLng
  end: L.LatLng
  color: string
  cargo: ICargo
}


const createRoutineMachineLayer = ({ position, start, end, color, cargo }: IRoutingMachineProps) => {
  const instance = L.Routing.control({
    position,
    waypoints: [
      start,
      end
    ],
    show: false,
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });
  console.log('instance', instance)
  instance.on('routesfound', function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    sendDistanceToFirebase(cargo, summary)
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;