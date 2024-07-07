import React, {createContext, useState} from "react";
import {apiClient} from "../../api/client.tsx";
import {TokenResponseData} from "./loginResponse.tsx";
import {REFRESH_TOKEN_KEY} from "../../util/constants.tsx";
import APIError from "../../util/APIError.tsx";
import {AxiosError} from "axios";

interface IAuthContext {
  loginUser: (userDetails: {email: string, password: string}) => Promise<boolean>,
  registerUser: (userDetails: {email: string, password: string}) => Promise<boolean>,
  getNewAccessToken: () => Promise<boolean>,
  accessToken: string | null,
  logout: () => void,
  enableAccount: (verificationToken: string) => Promise<boolean>
}

export const AuthContext = createContext<IAuthContext | null>(null)

export function AuthContextProvider({children}: {children: React.ReactNode}) {


  const [accessToken, setAccessToken] = useState<string | null>(null)


  const loginUser = async (userDetails: {email: string, password: string}) => {
    try {

      const response = await apiClient.post("/auth/authenticate", userDetails)

      const tokens: TokenResponseData = await response.data
      const {accessToken, refreshToken} = tokens
      setAccessToken(accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      return true


    } catch (error) {
      console.error(error)
      throw new Error("Failed to login")
    }
  }

  const registerUser = async (userDetails: {email: string, password: string}) => {
    try {
      const response = await apiClient.post("/auth/register", userDetails)

      const tokens: TokenResponseData = await response.data
      const { accessToken, refreshToken} = tokens
      setAccessToken(accessToken)

      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      return true

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {

          throw new APIError("Invalid signup", error.response.status)
        }

      }
      return false


    }
  }

  const getNewAccessToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
      const response = await apiClient.post("/auth/refresh-token", {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      const tokens: TokenResponseData = await response.data
      const {accessToken} = tokens
      setAccessToken(accessToken)

      return true
    } catch (err) {
      console.error(err)
      throw new Error("Failed to assign new access token")
    }

  }

  const logout = () => {

    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken(null)
  }

  const enableAccount = async (verificationToken: string) => {
    try {

      const response = await apiClient.post("/auth/register_complete", {
        verificationToken: verificationToken
      })
      const tokens: TokenResponseData = await response.data
      const {accessToken, refreshToken} = tokens
      setAccessToken(accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      return true
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        throw err
      }
      if (!err.response) {
        throw err
      }
      if (err.response.status === 409) {
        throw new APIError("Account has already been activated", err.response.status)
      }

      throw new Error("Verification token not valid")
    }
  }

  const authContextValue: IAuthContext = {
    loginUser,
    registerUser,
    getNewAccessToken,
    logout,
    enableAccount,
    accessToken
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>



}