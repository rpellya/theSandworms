import { createContext } from 'react';

export enum Theme {
	LIGHT = 'App_light_theme',
	DARK = 'App_dark_theme',
}

export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
