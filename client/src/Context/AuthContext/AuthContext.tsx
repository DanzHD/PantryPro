import React, {createContext, useState} from "react";
import {apiClient} from "../../api/client.tsx";
import {TokenResponseData} from "./loginResponse.tsx";
import {REFRESH_TOKEN_KEY} from "../../util/constants.tsx";

interface IAuthContext {
  loginUser: (userDetails: {email: string, password: string}) => Promise<boolean>,
  registerUser: (userDetails: {email: string, password: string}) => Promise<boolean>,
  getNewAccessToken: () => Promise<boolean>,
  accessToken: string | undefined
}

export const AuthContext = createContext<IAuthContext | null>(null)

export function AuthContextProvider({children}: {children: React.ReactNode}) {

  const [accessToken, setAccessToken] = useState<string>()


  const loginUser = async (userDetails: {email: string, password: string}) => {
    try {

      const response = await apiClient.post("/auth/login", userDetails)

      const tokens: TokenResponseData = response.data
      const {access_token: accessToken, refresh_token: refreshToken} = tokens
      setAccessToken(accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      return true


    } catch (error) {
      console.error(error)
      return false
    }
  }

  const registerUser = async (userDetails: {email: string, password: string}) => {
    try {
      const response = await apiClient.post("/auth/register", userDetails)
      const tokens: TokenResponseData = response.data
      const {access_token: accessToken, refresh_token: refreshToken} = tokens
      setAccessToken(accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      return true

    } catch (error) {
      console.error(error)
      return false
    }
  }

  const getNewAccessToken = async (): Promise<boolean> => {
    try {

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

      if (!refreshToken) {
        return true
      }

      const response = await apiClient.post("/auth/refresh-token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      const tokens: TokenResponseData = response.data
      const {access_token: accessToken} = tokens
      setAccessToken(accessToken)

      return true
    } catch (err) {
      console.error(err)
      return false
    }

  }

  const authContextValue: IAuthContext = {
    loginUser,
    registerUser,
    getNewAccessToken,
    accessToken
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>



}