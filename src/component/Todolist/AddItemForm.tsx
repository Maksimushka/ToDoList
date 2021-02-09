import s from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string>("")

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
            setError("")
        } else {
            setError("Please, enter your task!")
            setTitle("")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.charCode === 13)  addItem() }

    return (
        <div className={s.input}>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={ error ? s.inputError : s.inputDefault }
            />
            <button onClick={ addItem }>Add</button>
            { error && <div className={s.error}>{error}</div> }
        </div>
    )
}