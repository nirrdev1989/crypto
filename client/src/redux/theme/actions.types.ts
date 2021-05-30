export enum ActionsTypesTheme {
   TOGGLE_THEME = 'TOGGLE_THEME',
}

export interface ToggleThemeActionType {
   type: ActionsTypesTheme.TOGGLE_THEME
}

export type ThemeActions = ToggleThemeActionType