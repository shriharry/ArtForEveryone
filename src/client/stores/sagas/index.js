import { all } from "redux-saga/effects";
import drawingsWatcher from "./watchers/drawing.watcher";
import authWatcher from "./watchers/auth.watcher";

export default function* rootSaga() {
  yield all([...drawingsWatcher, ...authWatcher]);
}
