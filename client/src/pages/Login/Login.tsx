import Text from "../../Components/Text/Text.tsx";
import "./_login.scss"
import Input from "../../Components/Input/Input.tsx";
import Button from "../../Components/Button/Button.tsx";
import GoogleSignInButton from "../../Components/GoogleSignInButton.tsx";

function Login() {

  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__container__logo">

            <Text centered heading>PantryPro</Text>
          </div>
          <div className="login__container__description">
            <Text centered >
              Login to track your food
            </Text>

          </div>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button small fullWidth>Login</Button>
          <GoogleSignInButton />


          <div className="g-signin2" data-onsuccess="onSignIn"></div>



        </div>
      </div>
    </>
  )
}

export default Login