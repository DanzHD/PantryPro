import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import Text from "../../Components/Text/Text.tsx";
import APIError from "../../util/APIError.tsx";

function Verify() {
  const [searchParams] = useSearchParams()
  const { enableAccount } = useAuthContext()
  const [accountAlreadyEnabled, setAccountAlreadyEnabled] = useState(false)
  const [tokenExpired, setTokenExpired] = useState(false)

  const token = searchParams.get("token")
  const navigate = useNavigate()
  
  useEffect(() => {

    if (!token) {
      navigate("/login")
      return
    }
      
    enableAccount(token)
      .then(() => {
        navigate("/dashboard")
      })
      .catch((err) => {
        if (err instanceof APIError) {
          if (err.statusCode === 409) {
            setAccountAlreadyEnabled(true)
            return
          }
          if (err.statusCode === 401) {
            setTokenExpired(true)
            return
          }
        }

        navigate("/login")
      })

  }, [enableAccount, navigate, token]);

  if (accountAlreadyEnabled) {
    return <Text>Account has already been activated. <Link to={"/login"}>Click here to login</Link></Text>
  }
  if (tokenExpired) {
    return <Text danger>Account activation period passed.
      Please register a new account <Link to={"/sign-up"}>here</Link>
    </Text>
  }

  return <Text>Activating Account...</Text>
}

export default Verify