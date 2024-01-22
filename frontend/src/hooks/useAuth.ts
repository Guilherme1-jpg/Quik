import AuthProvider from "context/authorization";
import { useContext } from "react";

function useAuth() {
  return useContext(AuthProvider);
}

export default useAuth;