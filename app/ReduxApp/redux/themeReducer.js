import { colors } from "../../Colors";
import { CHANGE_THEME } from "./constants";

const initialTHeme = {
  theme: colors.light,
};

export default function theme(state = initialTHeme, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
