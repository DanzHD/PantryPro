import { useEffect, useState } from "react";

function usePassword(password: string) {
    const [passwordNotTooShort, setPasswordNotTooShort] = useState<boolean>(false)
    const [passwordContainsDigit, setPasswordContainsDigit] = useState<boolean>(false)
    const [passwordContainsLowerChar, setPasswordContainsLowerChar] = useState<boolean>(false)
    const [passwordContainsUpperChar, setPasswordContainsUpperChar] = useState<boolean>(false)
    const [passwordContainsSpecialChar, setPasswordContainsSpecialChar] = useState<boolean>(false)


    useEffect(() => {
        function validatePassword() {
            const containDigitRegex = /\d/
            const containLowerCaseRegex = /[a-z]/
            const containsUpperCaseRegex = /[A-Z]/
            const containsSpecialCharRegex = /[!@#$%^&*()=+_-]/

            setPasswordNotTooShort(password.length >= 8)
            setPasswordContainsDigit(containDigitRegex.test(password))
            setPasswordContainsLowerChar(containLowerCaseRegex.test(password))
            setPasswordContainsUpperChar(containsUpperCaseRegex.test(password))
            setPasswordContainsSpecialChar(containsSpecialCharRegex.test(password))
        }

        validatePassword()


    }, [password]);

    return {
        passwordNotTooShort,
        passwordContainsDigit,
        passwordContainsLowerChar,
        passwordContainsUpperChar,
        passwordContainsSpecialChar
    }
}

export default usePassword