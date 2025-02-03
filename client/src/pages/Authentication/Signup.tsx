import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {Link, useNavigate,} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import usePassword from "../../hooks/usePassword/usePassword.tsx";
import APIError from "../../util/APIError.tsx";
import Text from "../../Components/Text/Text.tsx";
import Button from "../../Components/Button/Button.tsx";
import {loginRoute} from "../../App.tsx";
import AuthenticationHeader from "./AuthenticationHeader.tsx";
import Spinner from "../../Components/Spinner/Spinner.tsx";
import GoogleLoginButton from "../../GoogleLoginButton/GoogleLoginButton.tsx";
import {useGoogleLogin} from "@react-oauth/google";
import EmailValidation from "./EmailValidation.tsx";

function Signup() {
    const { registerUser, getNewAccessToken } = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [invalidVerificationMessage, setInvalidVerificationMessage] = useState("")
    const [isValidatingEmail, setIsValidatingEmail] = useState({
        email: "",
        successSignUp: false
    })
    const [signingUp, setSigningUp] = useState(false)

    const {
        passwordNotTooShort,
        passwordContainsDigit,
        passwordContainsUpperChar,
        passwordContainsSpecialChar,
        passwordContainsLowerChar
    } = usePassword(password)

    const { handleGoogleLogin } = useAuthContext()

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLogin(tokenResponse)
    })

    /* Check if user is logged in. If logged in redirect the user to the dashboard */
    useEffect(() => {

        getNewAccessToken()
            .then(() => navigate("/dashboard"))
            .catch(() => {

            })


    }, [getNewAccessToken, navigate]);

    const onSignUp = async () => {
        try {

            setSigningUp(true)
            const success = await registerUser({email: email, password: password})
            if (success) {
                setIsValidatingEmail({
                    email: email,
                    successSignUp: true
                })
                setInvalidVerificationMessage("")
            }

        } catch (error) {
            if (error instanceof APIError){

                if (error.statusCode === 409) {
                    setInvalidVerificationMessage("Registration failed: email already in use")
                } else if (error.statusCode === 422) {
                    setInvalidVerificationMessage("Password is too weak. "

                    )
                } else {
                    setInvalidVerificationMessage("Something went wrong... Please try again later")
                }

                setIsValidatingEmail({
                    email: "",
                    successSignUp: false
                })

            }

        } finally {
            setSigningUp(false)
        }
    }
    
    function handleEmailChange(e: ChangeEvent) {
        setEmail((e.target as HTMLInputElement).value)
        if (invalidVerificationMessage) {
            setInvalidVerificationMessage("")
        }
    }

    function handlePasswordChange(e: ChangeEvent) {

        setPassword((e.target as HTMLInputElement).value)
        if (invalidVerificationMessage) {
            setInvalidVerificationMessage("")
        }
    }

    if (isValidatingEmail.successSignUp) {
        return <EmailValidation
            email={isValidatingEmail.email}
            onBack={() => setIsValidatingEmail({
                email: "",
                successSignUp: false
            })}
        />
    }

    return (
        <>
            <div className="authentication">
                <div className="authentication__container">

                    <AuthenticationHeader
                        handlePasswordChange={handlePasswordChange}
                        handleEmailChange={handleEmailChange}
                        description={"Sign up now for automated food tracking!"}
                    />

                    {
                        password.length > 0 &&
                        <div>

                            {
                                !passwordNotTooShort &&

                                <Text small danger>

                                    Password must be a minimum of 8 characters
                                </Text>
                            }
                            {
                                !passwordContainsLowerChar &&

                                <Text small danger>
                                    Password must contain a lower case character
                                </Text>
                            }
                            {
                                !passwordContainsUpperChar &&
                                <Text small danger >
                                    Password must contain an upper case character

                                </Text>
                            }
                            {
                                !passwordContainsDigit &&
                                <Text small danger>
                                    Password must contain a digit
                                </Text>
                            }
                            {
                                !passwordContainsSpecialChar &&
                                <Text small danger>
                                    Password must contain a special character
                                </Text>
                            }
                        </div>
                    }
                    <Text
                        danger
                        small
                        centered
                    >
                        {invalidVerificationMessage}
                    </Text>
                    <div className="authentication-buttons">

                        {
                            signingUp ?
                                <Button
                                    small
                                    fullWidth
                                >
                                    <Spinner small />
                                </Button>

                                :
                                <Button
                                    small
                                    fullWidth
                                    onClick={onSignUp}

                                >
                                    Sign up

                                </Button>

                        }
                        <GoogleLoginButton onClick={() => googleLogin()} />
                    </div>



                        <Text centered>
                            Already have an account?
                            <Link to={loginRoute}> Login </Link>
                        </Text>


                </div>
            </div>
        </>
    )
}

export default Signup;