import {AuthContext} from "./AuthContext.tsx";
import {useContext} from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("Auth context must be used inside an auth context provider")
  }

  return context

}