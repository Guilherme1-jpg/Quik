import React, { createContext, useMemo, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { ContextType, authProvider, hasToken, singin } from '../interface/interfaceAuth';

import baseApi from 'api/server';

const DEFAULT_VALUE = {
  token: '',
  singin: () => {},
  signout: () => {},
  hasToken: () => {},
}

const AuthContext = createContext<ContextType>(DEFAULT_VALUE);

export function AuthProvider({ children }: authProvider): JSX.Element {
  const [token, setToken] = useState<string | undefined>('')

  useEffect(() => {
    const getToken = Cookies.get('token')
    setToken(getToken)

    document.addEventListener('signout', ({composed}) => {
      if(composed) {
        signout()
      }
    })

    return () => {
      document.removeEventListener('signout', () => {})
    }
  }, [])

  const hasToken = ({ authToken, callback}: hasToken) => {
    setToken(authToken);

    if (authToken) {
      baseApi.defaults.headers.Authorization = `Bearer ${authToken}`;
    }
    callback();
  };

  const singin = ({authToken, callback}: singin) => {
    Cookies.set('token', authToken)
    
    setToken(authToken)
    callback()
    baseApi.defaults.headers.Authorization = `Bearer ${authToken}`;
  }

  const signout = () => {
    setToken('');
    Cookies.remove('token');
  };

  const value = useMemo(() => ({
    token,
    singin,
    signout,
    hasToken,
  }), [token, singin, signout, hasToken])

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext;
