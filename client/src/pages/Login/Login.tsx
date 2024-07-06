import Text from "../../Components/Text/Text.tsx";
import "./_login.scss"
import Input from "../../Components/Input/Input.tsx";
import Button from "../../Components/Button/Button.tsx";
import GoogleSignInButton from "../../Components/GoogleSignInButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {loginRoute, signupRoute} from "../../App.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {useEffect, useRef, useState} from "react";
import APIError from "../../util/APIError.tsx";


function Login({
  loggingIn
}: {
  loggingIn?: boolean
}) {
  const {loginUser, registerUser, getNewAccessToken} = useAuthContext()
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)
  const [invalidVerificationMessage, setInvalidVerificationMessage] = useState("")
  const [checkingLoggedInStatus, setCheckingLoggedInStatus] = useState(true)

  const [loading, setLoading] = useState(false)

  /* Check if user is logged in. If logged in redirect the user to the dashboard */
  useEffect(() => {

    setCheckingLoggedInStatus(true)
    getNewAccessToken()
      .then(() => navigate("/dashboard"))
      .catch(() => {
        setCheckingLoggedInStatus(false)
      })
      
    
  }, [getNewAccessToken, navigate]);

  const onLogin = async () => {
    try {
      setLoading(true)
      const email = emailRef.current?.value
      const password = passwordRef.current?.value
      if (!email || !password) {
        return
      }

      const success = await loginUser({email: email, password: password})
      if (success) {
        navigate("/dashboard")
      }
    } catch (error) {
      setInvalidVerificationMessage("Incorrect username or password. Please try again")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onSignUp = async () => {
    try {
      setLoading(true)
      const email = emailRef.current?.value
      const password = passwordRef.current?.value

      if (!email || !password) {
        return
      }

      const success = await registerUser({email: email, password: password})

      if (success) {
        navigate("/dashboard")
      }

    } catch (error) {
      if (error instanceof APIError){

        if (error.statusCode === 409) {
          setInvalidVerificationMessage("Registration failed: emailed already in use")
        } else if (error.statusCode === 422) {
          setInvalidVerificationMessage("Password is too weak. " +
            "Password length must be between 8 and 20 characters \n" +
            "Contain at least 1 digit \n" +
            "Contain at least one lower and upper alphabetical character \n" +
            "Contain at least 1 special character \n" +
            "Have no spaces"
          )
        } else {
          setInvalidVerificationMessage("Something went wrong... Please try again later")
        }

      }


    } finally {
      setLoading(false)
    }
  }

  if (checkingLoggedInStatus) {
    return <div>Loading...</div>
  }


  return (
    <>
      <div className="login">
        <div className="login__container">
          {
            loading &&
              <div>Loading...</div>
          }

          <div className="login__container__logo">
            <Text centered heading>PantryPro</Text>
          </div>
          <div className="login__container__description">
            <Text centered >
              {
                loggingIn ?
                    "Login to track your food"
                  :
                    "Sign up now for automated food tracking!"
              }
            </Text>

          </div>
          <Input type="email" placeholder="Email" ref={emailRef} />
          <Input type="password" placeholder="Password" ref={passwordRef} />
          <Button
            small
            fullWidth
            onClick={loggingIn ? onLogin : onSignUp}
          >

            {
              loggingIn ?
                "Login"
                :
                "Sign up"
            }
          </Button>
          <GoogleSignInButton />
          {
            invalidVerificationMessage &&
              <Text danger>{invalidVerificationMessage}</Text>
          }
          {
            loggingIn ?
              <Text centered>Don't have an account? <Link onClick={() => setInvalidVerificationMessage("")} to={signupRoute} >Sign Up</Link></Text>
              :
              <Text centered>Already have an account? <Link onClick={() => setInvalidVerificationMessage("")} to={loginRoute}>Login </Link></Text>
          }

        </div>
      </div>
    </>
  )
}

export default Login