import Text from "../../Components/Text/Text.tsx";
import Input from "../../Components/Input/Input.tsx";
import {ChangeEvent} from "react";
import "./_authentication.scss"

function AuthenticationHeader({
    handlePasswordChange,
    handleEmailChange,
    description
}: {
    handlePasswordChange: (e: ChangeEvent) => void,
    handleEmailChange: (e: ChangeEvent) => void,
    description: string
}) {

    return (
        <>
            <div className="authentication__container__logo">
                <Text centered heading>PantryPro</Text>
            </div>
            <div className="authentication__container__description">
                <Text centered>{description}</Text>

            </div>
            <Input onChange={handleEmailChange} type="email" placeholder="Email" />
            <Input onChange={handlePasswordChange} type="password" placeholder="Password"/>
        </>
    )
}

export default AuthenticationHeader