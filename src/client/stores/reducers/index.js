import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import registrationReducer from "./registration.reducer";
import drawingReducer from "./drawing.reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  registration: registrationReducer,
  drawing: drawingReducer,
});

export default rootReducers;
