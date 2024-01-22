import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', 
    },
    secondary: {
      main: '#FF4081',
    },
    error: {
      main: '#FF5722', 
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',  
    },
    text: {
      primary: '#333333', 
      secondary: '#757575', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', 
    h1: {
      fontSize: '2.5rem', 
      fontWeight: 600,    
      color: '#333333',   
    },
    h2: {
      fontSize: '2rem',  
      fontWeight: 500,    
      color: '#333333',   
    },

  },

});

export default defaultTheme;
