import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "../Context/AuthContext/useAuthContext.tsx";
import {useEffect, useState} from "react";

const ProtectedRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [loading, setLoading] = useState(false)

  const {getNewAccessToken} = useAuthContext()

  /* Try to refresh the access token every 30 minutes, if fail at refreshing access token, logout  */

  useEffect(() => {

    const refresh = async () => {
      try {
        setLoading(true)
        await getNewAccessToken()
        setLoggedIn(true)
      } catch (error) {
        setLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    refresh()
      .then()
    /* Refresh every 30 minutes */
    const refreshInterval = setInterval(refresh, 1800000)

    return () => {
      clearInterval(refreshInterval)
    }


  }, [getNewAccessToken]);

  if (loading) {
    return <div>loading...</div>
  }

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return <Outlet />


}

export default ProtectedRoutes