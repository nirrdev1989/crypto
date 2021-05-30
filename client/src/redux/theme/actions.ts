import { ActionsTypesTheme } from "./actions.types";

export function toggleTheme() {
   return {
      type: ActionsTypesTheme.TOGGLE_THEME
   }
}