import React from "react";


export default function handleChangeObject<T>(
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>,
    event: React.ChangeEvent<HTMLInputElement>
) {
    setValue({
        ...value,
        [event.target.name]: event.target.value
    })
}