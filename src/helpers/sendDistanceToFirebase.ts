import { ICargo } from "../types/model";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { calculateDirections } from "./calculateDirections";
import { getRouteCords } from "./getRouteCords/getRouteCords";

const sendDistanceToFirebase = async (cargo: ICargo) => {
  const updateCargoData = async () => {
    console.log("Updating cargo distance");
    const cargoRef = doc(db, "cargos", cargo.id);
    //Convert adress to cords
    const routeCords = await getRouteCords(cargo);
    //Calculate route
    const result = await calculateDirections(routeCords);
    //Update cargo distance
    if (result !== undefined) {
      const newDistance = result.routes[0].legs[0].distance?.value ?? 1;
      await updateDoc(cargoRef, {
        distance: (newDistance / 1000).toFixed(0),
      });
    }
  };
  if (cargo.distance === 0) {
    await updateCargoData();
  }
};

export default sendDistanceToFirebase;
