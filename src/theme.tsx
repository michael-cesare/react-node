import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#e8f1f2',
      dark: '#115293',
      light: '#4791db',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#e8f1f2',
      dark: '#9a0036',
      light: '#e33371',
    },
    error: {
      main: '#990000',
      contrastText: '#e8f1f2',
      dark: '#d32f2f',
      light: '#e57373',
    },
    success: {
      main: '#4caf50',
      contrastText: '#111111',
      dark: '#388e3c',
      light: '#81c784',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
    body1: {
      color: '#28292c',
    },
    body2: {
      color: '#2e2e38',
    },
    button: {
      color: '#e8f1f2',
      background: '#e8f1f2',
    }
  },
});

export default theme;