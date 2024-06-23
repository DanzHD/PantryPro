import Text from "../../Components/Text/Text.tsx";
import "./_login.scss"
import Input from "../../Components/Input/Input.tsx";
import Button from "../../Components/Button/Button.tsx";
import GoogleSignInButton from "../../Components/GoogleSignInButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {loginRoute, signupRoute} from "../../App.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {useRef} from "react";

function Login({
  loggingIn
}: {
  loggingIn?: boolean
}) {

  const {loginUser, registerUser} = useAuthContext()
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)

  const onLogin = async () => {
    try {
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
      console.error(error)
    }
  }

  const onSignUp = async () => {
    try {
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
      console.error(error)
    }
  }


  return (
    <>
      <div className="login">
        <div className="login__container">
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
            loggingIn ?
              <Text centered>Don't have an account? <Link to={signupRoute} >Sign Up</Link></Text>
              :
              <Text centered>Already have an account? <Link to={loginRoute}>Login </Link></Text>
          }

        </div>
      </div>
    </>
  )
}

export default Login