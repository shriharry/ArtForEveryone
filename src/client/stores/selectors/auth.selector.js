export const userIdSelector = (state) => state?.auth?.user?.dataValues?.id;
export const isLoggedInSelector = (state) => state?.auth?.isLoggedIn;
export const loginErrorResponse = (state) => state?.auth?.errorResponse;
export const loginSuccessResponse = (state) => state?.auth?.successResponse;
