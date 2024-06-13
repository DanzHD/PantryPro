import React from "react";
import "./_button.scss"
import cx from "classnames"


function Button({
    children,
    dynamicWidth,
    fullWidth,
    danger,
    classNames,
    onClick,
    id,
    small,
    disabled

}: {
    children?: React.ReactNode,
    dynamicWidth?: boolean,
    fullWidth?: boolean,
    danger?: boolean,
    classNames?: string,
    disabled?: boolean,
    id?: string,
    small?: boolean,
    onClick?: () => void


}) {

    const computedClassNames = cx(
        "button",
        {
            "button--small": small,
            "button--danger": danger,
            "button--dynamic-width": dynamicWidth,
            "button--full-width": fullWidth,
            "button--disabled": disabled
        },
        classNames
    )

    return <button id={id} onClick={onClick} className={computedClassNames} disabled={disabled}>{children}</button>
}

export default Button