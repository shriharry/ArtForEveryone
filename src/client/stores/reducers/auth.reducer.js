import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    user: null,
    successResponse: null,
    errorResponse: null,
  },
  reducers: {
    setLoginSuccess: (state, action) => {
      const successResponse = action.payload;
      if (successResponse) {
        localStorage.setItem("user", JSON.stringify(successResponse));
      }
      return {
        ...state,
        isLoggedIn: true,
        successResponse: "User logged in successfully.",
        user: successResponse,
      };
    },
    setLoginFailure: (state, action) => {
      return { ...state, isLoggedIn: false, errorResponse: action.payload };
    },
    logout: (state, action) => {
      return { ...state, isLoggedIn: false, user: null };
    },
    clearSuccessResponse: (state, action) => {
      return { ...state, successResponse: null };
    },
    clearErrorResponse: (state, action) => {
      return { ...state, errorResponse: null };
    },
  },
});

export const {
  setLoginSuccess,
  setLoginFailure,
  logout,
  clearSuccessResponse,
  clearErrorResponse,
} = authSlice.actions;
export default authSlice.reducer;
