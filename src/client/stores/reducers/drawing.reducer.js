import { createSlice } from "@reduxjs/toolkit";

const drawingSlice = createSlice({
  name: "drawing",
  initialState: {
    isDrawingSaved: null,
    isDrawingDeleted: null,
    response: [],
    list: [],
  },
  reducers: {
    setSaveDrawingSuccess: (state, action) => {
      return {
        ...state,
        isDrawingSaved: true,
        isDrawingDeleted: null,
        response: [],
      };
    },
    setSaveDrawingFailure: (state, action) => {
      return {
        ...state,
        isDrawingSaved: false,
        isDrawingDeleted: null,
        response: [],
      };
    },
    fetchDrawingSuccess: (state, action) => {
      return {
        ...state,
        success: true,
        isDrawingDeleted: null,
        list: action.payload,
      };
    },
    fetchDrawingFailure: (state, action) => {
      return {
        ...state,
        success: false,
        isDrawingDeleted: null,
        response: action.payload,
      };
    },
    setDeleteDrawingSuccess: (state, action) => {
      return { ...state, isDrawingDeleted: true, response: [] };
    },
    setDeleteDrawingFailure: (state, action) => {
      return { ...state, isDrawingDeleted: false, response: [] };
    },
  },
});

export const {
  setSaveDrawingSuccess,
  setSaveDrawingFailure,
  fetchDrawingSuccess,
  fetchDrawingFailure,
  setDeleteDrawingSuccess,
  setDeleteDrawingFailure,
} = drawingSlice.actions;
export default drawingSlice.reducer;
