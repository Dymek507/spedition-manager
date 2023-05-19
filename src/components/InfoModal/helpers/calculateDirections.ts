import { IRouteCords } from "../../../types/model";

export const calculateDirections = async ({
  from,
  destination,
  center,
}: IRouteCords) => {
  if (from === undefined || destination === undefined) return;
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: from,
    // waypoints:
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
  });

  return results;
};
