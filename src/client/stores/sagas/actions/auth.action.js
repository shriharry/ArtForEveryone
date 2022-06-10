export const LOGIN_USER_ACTION = "LOGIN_USER_ACTION";
export const REGISTER_USER_ACTION = "REGISTER_USER_ACTION";

export function login(payload) {
  return {
    type: LOGIN_USER_ACTION,
    payload,
  };
}

export function signup(payload) {
  return {
    type: REGISTER_USER_ACTION,
    payload,
  };
}
