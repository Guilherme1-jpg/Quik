export interface singin {
  authToken: string
  callback: () => void
}

export interface hasToken {
  authToken: string
  callback: () => void
}

export interface ContextType  {
  token: string | undefined,
  singin: ({authToken}: singin) => void
  signout: () => void,
  hasToken: ({authToken, callback}: hasToken) => void,
}

export interface authProvider {
  children: JSX.Element
}
