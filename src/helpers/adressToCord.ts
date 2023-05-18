import Geocode from "react-geocode";

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

const DEFAULT_LOCATION = { lat: 52.237049, lng: 21.017532 };

const adressToCord = async (
  placeName: string
): Promise<{ lat: number; lng: number }> => {
  return await Geocode.fromAddress(placeName).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      if (lat && lng && typeof lat === "number" && typeof lng === "number") {
        return { lat, lng };
      } else {
        return DEFAULT_LOCATION;
      }
    },
    (error) => {
      console.log("error: " + placeName);
      return DEFAULT_LOCATION;
    }
  );
};

export default adressToCord;
