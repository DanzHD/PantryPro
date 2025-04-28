import React from "react";
import Input from "../Input/Input.tsx";

function WeekInput({
   className,
   placeholder,
   fullWidth,
   name,
   required,
   onChange,
   defaultValue
}: {
    className?: string,
    placeholder?: string,
    fullWidth?: boolean,
    name?:string,
    required?: boolean,
    onChange?: (e: React.ChangeEvent) => void,
    defaultValue?: string
}) {

    return <Input
        type="week"
        className={className}
        placeholder={placeholder}
        fullWidth={fullWidth}
        name={name}
        required={required}
        onChange={onChange}
        defaultValue={defaultValue}
    />
}

export default WeekInput