import { call, put } from "redux-saga/effects";
import {
  saveDrawing,
  getAllDrawings,
  deleteDrawing,
} from "../requests/drawing.request";
import {
  setSaveDrawingSuccess,
  setSaveDrawingFailure,
  fetchDrawingSuccess,
  fetchDrawingFailure,
  setDeleteDrawingSuccess,
  setDeleteDrawingFailure,
} from "../../reducers/drawing.reducer";

export function* saveDrawingAction(action) {
  try {
    const response = yield call(saveDrawing, action.payload);
    yield put(setSaveDrawingSuccess(response?.data));
  } catch (error) {
    yield put(setSaveDrawingFailure(error));
  }
}

export function* fetchDrawingsAction(action) {
  try {
    const response = yield call(getAllDrawings);
    yield put(fetchDrawingSuccess(response?.data));
  } catch (error) {
    yield put(fetchDrawingFailure(error));
  }
}

export function* deleteDrawingAction(action) {
  try {
    const { drawingId } = action.payload;
    const response = yield call(deleteDrawing, drawingId);
    yield put(setDeleteDrawingSuccess(response?.data));
  } catch (error) {
    yield put(setDeleteDrawingFailure(error));
  }
}
