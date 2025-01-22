import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Text from "../../Components/Text/Text.tsx";
import Button from "../../Components/Button/Button.tsx";
import { signupRoute} from "../../App.tsx";
import AuthenticationHeader from "./AuthenticationHeader.tsx";

function Login() {
    const { loginUser, getNewAccessToken } = useAuthContext();
    const navigate = useNavigate()
    const [invalidVerificationMessage, setInvalidVerificationMessage] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    /* Check if user is logged in. If logged in redirect the user to the dashboard */
    useEffect(() => {

        getNewAccessToken()
            .then(() => navigate("/dashboard"))
            .catch(() => {

            })


    }, [getNewAccessToken, navigate]);

    const onLogin = async () => {
        try {


            const success = await loginUser({ email: email, password: password })
            if (success) {
                navigate("/dashboard")
            }
        } catch (error) {
            setInvalidVerificationMessage("Incorrect username or password. Please try again")
            console.error(error)
        }
    }

    function handleEmailChange(e: ChangeEvent) {
        setInvalidVerificationMessage("")
        setEmail((e.target as HTMLInputElement).value)
    }

    function handlePasswordChange(e: ChangeEvent) {
        if (invalidVerificationMessage) {
            setInvalidVerificationMessage("")
        }

        setPassword((e.target as HTMLInputElement).value)
    }

    return (
        <>
            <div className="authentication">
                <div className="authentication__container">
                    <AuthenticationHeader
                        handlePasswordChange={handlePasswordChange}
                        handleEmailChange={handleEmailChange}
                        description={"Login to track your food"}
                    />

                    <Text
                        centered
                        small
                        danger>
                        { invalidVerificationMessage }
                    </Text>

                    <Button
                        small
                        fullWidth
                        onClick={onLogin}
                    >
                        Login
                    </Button>

                    <Text centered>
                        Don't have an account?
                        <Link onClick={() => navigate("sign-up")} to={signupRoute}> Sign Up </Link>
                    </Text>



                </div>
            </div>
        </>
    )

}

export default Login