import { configureStore } from "@reduxjs/toolkit";
import cargosReducer from "./cargosSlice";

export default configureStore({
  reducer: {
    cargos: cargosReducer,
  },
});
