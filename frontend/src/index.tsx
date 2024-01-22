import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import defaultTheme from 'components/themes/default';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <ThemeProvider theme={defaultTheme}>
  <App/>
  </ThemeProvider>
  
  < /React.StrictMode>
);