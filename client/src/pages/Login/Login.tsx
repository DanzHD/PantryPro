import Text from "../../Components/Text/Text.tsx";
import "./_login.scss"
import Input from "../../Components/Input/Input.tsx";
import Button from "../../Components/Button/Button.tsx";
import GoogleSignInButton from "../../Components/GoogleSignInButton.tsx";
import {Link} from "react-router-dom";
import {loginRoute, signupRoute} from "../../App.tsx";

function Login({
  loggingIn
}: {
  loggingIn?: boolean
}) {


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
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button small fullWidth>
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