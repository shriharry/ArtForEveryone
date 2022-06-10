import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {},
  reducers: {
    setRegistrationSuccess: (state, action) => {
      const response = action.payload;
      return { success: true, response };
    },
    setRegistrationFailure: (state, action) => {
      return { success: false, message: action.payload };
    },
  },
});

export const { setRegistrationSuccess, setRegistrationFailure } =
  registrationSlice.actions;
export default registrationSlice.reducer;
