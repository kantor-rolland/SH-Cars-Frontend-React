import { createTheme } from '@mui/material/styles/index.js';

export const MUI_THEME = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    mode: 'light',
  },
});

export const FOREST_THEME = createTheme({
  palette: {
    primary: { main: '#065d11' },
    secondary: { main: '#4e8155' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
    text: { primary: '#000000', secondary: '#4e8155' },
    mode: 'light',
  },
  shape: {
    borderRadius: 10,
  },
});

export const DEEP_RED_THEME = createTheme({
  palette: {
    primary: { main: '#ad0000' },
    secondary: { main: '#b90404' },
    background: { default: '#b34d4d', paper: '#ffffff' },
    text: { primary: '#000000', secondary: '#b90404' },
    mode: 'light',
  },
  shape: {
    borderRadius: 10,
  },
});

export const OCEAN_BLUE_THEME = createTheme({
  palette: {
    primary: { main: '#006773' },
    secondary: { main: '#57c7d5' },
    background: { default: '#73b8c1', paper: '#ffffff' },
    text: { primary: '#000000', secondary: '#57c7d5' },
    mode: 'light',
  },
  shape: {
    borderRadius: 10,
  },
});

export const DARK_PURPLE_THEME = createTheme({
  palette: {
    primary: { main: '#51138c' },
    secondary: { main: '#692aa6' },
    background: { default: '#262627', paper: '#1a1a1a' },
    text: { primary: '#9a16ce', secondary: '#a29bfe' },
    mode: 'light',
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          // color: '#4a148c',
          color: '#000000',
        },
        input: {
          '&::placeholder': {
            color: '#9c27b0',
            opacity: 1,
          },
        },
      },
    },
  },
});

export const themes = {
  mui: MUI_THEME,
  forest: FOREST_THEME,
  red: DEEP_RED_THEME,
  blue: OCEAN_BLUE_THEME,
  purple: DARK_PURPLE_THEME,
};
