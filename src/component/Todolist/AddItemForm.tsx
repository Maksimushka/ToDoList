import s from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addTask: (title: string, todolistID: string) => void
    id: string
}

export function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string>("")

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
            setError("")
        } else {
            setError("Please, enter your task!")
            setTitle("")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.charCode === 13)  addTask() }

    return (
        <div className={s.input}>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={ error ? s.inputError : s.inputDefault }
            />
            <button onClick={ addTask }>Add</button>
            { error && <div className={s.error}>{error}</div> }
        </div>
    )
}