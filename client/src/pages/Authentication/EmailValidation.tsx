import Text from "../../Components/Text/Text.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import useTimer from "../../hooks/useTimer/useTimer.tsx";

function EmailValidation({
    onBack,
    email
}: {
    onBack: () => void,
    email: string
}) {
    const { sendConfirmationEmail } = useAuthContext()
    const { start, timeleft } = useTimer()

    function handleEmailConfirmation(email: string) {
        sendConfirmationEmail(email)
        start(30)
    }

    return (
        <div className="authentication">
            <div className="authentication__container">
                <div className="validation-header">

                    <span onClick={onBack} className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <Text heading centered>PantryPro</Text>
                </div>
                <Text small>
                    Confirmation email has been sent to {email}. Confirm your email and you will be logged in
                </Text>

                <Text>Didn't get an email?
                    {
                        timeleft > 0
                        ?
                            <span>{timeleft} </span> :
                            <span className="resend-email" onClick={() => handleEmailConfirmation(email)}>Resend Email</span>
                    }
                </Text>
            </div>
        </div>
    )

}

export default EmailValidation