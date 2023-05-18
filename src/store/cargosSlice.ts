import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICargo } from "../types/modelTypes";

interface IInitialState {
  cargos: ICargo[];
}

const initialState: IInitialState = {
  cargos: [],
};

export const cargosSlice = createSlice({
  name: "cargos",
  initialState,
  reducers: {
    addCargo: (state, action: PayloadAction<ICargo>) => {
      state.cargos.push(action.payload);
    },
  },
});

export const { addCargo } = cargosSlice.actions;

export default cargosSlice.reducer;
