import { ICargo, IRouteCords } from "../types/model";
import adressToCord from "./adressToCord";

export const DEFAULT_ROUTE_CORDS = {
  from: { lat: 52.237049, lng: 21.017532 },
  destination: { lat: 52.237049, lng: 21.017532 },
  center: { lat: 52.237049, lng: 21.017532 },
};

export const getRouteCords = async ({
  from,
  destination,
}: ICargo): Promise<IRouteCords> => {
  if (from === undefined || destination === undefined)
    return DEFAULT_ROUTE_CORDS;

  const fromCords = await adressToCord(from.zipCode + " " + from.city);

  const destinationCords = await adressToCord(
    destination.zipCode + " " + destination.city
  );

  const center = {
    lat: (fromCords.lat + destinationCords.lat) / 2,
    lng: (fromCords.lng + destinationCords.lng) / 2,
  };

  return {
    from: fromCords,
    destination: destinationCords,
    center,
  };
};
