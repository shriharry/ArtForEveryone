import { call, put } from "redux-saga/effects";
import { setLoginSuccess, setLoginFailure } from "../../reducers/auth.reducer";
import {
  setRegistrationSuccess,
  setRegistrationFailure,
} from "../../reducers/registration.reducer";
import { registerUser, loginUser } from "../requests/auth.request";

export function* handleLogin(action) {
  try {
    const response = yield call(loginUser, action.payload);
    yield put(setLoginSuccess(response?.data));
  } catch (error) {
    yield put(setLoginFailure(error));
  }
}

export function* handleRegister(action) {
  try {
    const response = yield call(registerUser, action.payload);
    yield put(setRegistrationSuccess(response?.data));
  } catch (error) {
    yield put(setRegistrationFailure(error));
  }
}
