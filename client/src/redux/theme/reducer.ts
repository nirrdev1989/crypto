import { ActionsTypesTheme, ThemeActions } from "./actions.types";
import { getLocalStorage, saveLocalStorage } from "../../utils/utils";

interface ThemeInitialState {
   isDark: boolean
}

const INITIAL_THEME_TABS: ThemeInitialState = getLocalStorage('theme') || { isDark: true }

export default function themeReducer(state = INITIAL_THEME_TABS, action: ThemeActions): ThemeInitialState {
   switch (action.type) {
      case ActionsTypesTheme.TOGGLE_THEME:
         saveLocalStorage('theme', { isDark: !state.isDark })
         return {
            isDark: !state.isDark
         }
      default:
         return state
   }
}