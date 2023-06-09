export interface ILocation {
  city: string;
  zipCode: string;
  adress?: string;
  voivodeship?: string;
}

export interface ICargo {
  state: string;
  timeStamp: string;
  number: string;
  id: string;
  from: ILocation;
  midLocation: ILocation;
  destination: ILocation;
  distance: number;
  perKilometer: number;
  surcharge: number;
  bid?: number | null;
  timeLeft?: string;
  price: number;
  loadingDate: string;
  unloadDate: string;
  weight?: string;
  type?: string;
  comments: string;
  company?: string;
}

export interface IRouteCords {
  from: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  center: { lat: number; lng: number };
}

export interface IModalData {
  cargo: ICargo;
  routesOptions: google.maps.DirectionsResult | undefined;
  routeCords: IRouteCords;
}
