import React from 'react';
import { AuthProvider } from 'context/authorization';
import { RouterProvider } from 'react-router-dom';
import Routes from 'routes';
import DrawerComponentMolecule from 'components/molecules/DrawerComponentMolecule';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Routes}>
        <DrawerComponentMolecule />
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
