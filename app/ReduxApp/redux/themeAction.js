import { CHANGE_THEME } from "./constants";

export const changeThemeAction = (type) => ({
  type: CHANGE_THEME,
  payload: type,
});
