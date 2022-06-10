export const SAVE_DRAWING_ACTION = "SAVE_DRAWING_ACTION";
export const FETCH_DRAWINGS_ACTION = "FETCH_DRAWINGS_ACTION";
export const DELETE_DRAWING_ACTION = "DELETE_DRAWING_ACTION";

export function saveDrawing(payload) {
  return {
    type: SAVE_DRAWING_ACTION,
    payload,
  };
}

export function deleteDrawing(payload) {
  return {
    type: DELETE_DRAWING_ACTION,
    payload,
  };
}
