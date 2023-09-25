import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store/store";

interface TargetState {
  TShirtColor: any;
  Design: number;
}

const initialState: TargetState = {
  TShirtColor: "#000",
  Design: 1,
};

export const shirtSlice = createSlice({
  name: "shirt",
  initialState,
  reducers: {
    setTShirtColor: (state, action) => {
      state.TShirtColor = action.payload;
    },
    setDesign: (state, action) => {
      state.Design = action.payload;
    },
  },
});

export const { setTShirtColor, setDesign } = shirtSlice.actions;
export const selectTShirtColor = (state: RootState) => state.shirt.TShirtColor;
export const selectDesign = (state: RootState) => state.shirt.Design;
export default shirtSlice.reducer;
