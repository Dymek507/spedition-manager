export interface ILocation {
  city: string;
  zipCode: string;
  adress?: string;
  voivodeship?: string;
}

export interface ICargo {
  stat: string;
  number: string;
  id: string;
  from: ILocation;
  midLocation: ILocation;
  destination: ILocation;
  distance: number;
  perKilometer: number;
  surcharge: number;
  price: number;
  loadingDate: string;
  unloadDate: string;
  weight?: string;
  comments: string;
}
