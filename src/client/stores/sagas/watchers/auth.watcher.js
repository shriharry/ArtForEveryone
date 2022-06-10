import { takeLatest } from "redux-saga/effects";
import { handleLogin, handleRegister } from "../handlers/auth.handler";
import {
  LOGIN_USER_ACTION,
  REGISTER_USER_ACTION,
} from "../actions/auth.action";

export default [
  takeLatest(LOGIN_USER_ACTION, handleLogin),
  takeLatest(REGISTER_USER_ACTION, handleRegister),
];
