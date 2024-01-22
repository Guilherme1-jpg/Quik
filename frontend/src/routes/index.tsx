import React from 'react';
import Login from 'components/pages/login';
import Dashboard from 'components/pages/dashboard';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import RequireAuth from './authRequire';
import SignUp from 'components/pages/signup';

interface props {
  children: JSX.Element
}

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element = { <Login/> } />
      <Route path='/signup' element = { <SignUp/>}/>
      <Route path="/dashboard" element={(  <RequireAuth> <Dashboard/>  </RequireAuth>)}/>
    </>
  )
)

export default Routes;