import { takeLatest } from "redux-saga/effects";
import {
  saveDrawingAction,
  fetchDrawingsAction,
  deleteDrawingAction,
} from "../handlers/drawing.handler";
import {
  SAVE_DRAWING_ACTION,
  FETCH_DRAWINGS_ACTION,
  DELETE_DRAWING_ACTION,
} from "../actions/drawing.action";

export default [
  takeLatest(FETCH_DRAWINGS_ACTION, fetchDrawingsAction),
  takeLatest(SAVE_DRAWING_ACTION, saveDrawingAction),
  takeLatest(DELETE_DRAWING_ACTION, deleteDrawingAction),
];
