export const drawingSelector = (state) => state?.drawing;
export const isDrawingSavedSelector = (state) => state?.drawing?.isDrawingSaved;
export const fetchDrawingsSelector = (state) => state?.drawing?.list;
export const isDrawingDeletedSelector = (state) =>
  state?.drawing?.isDrawingDeleted;
