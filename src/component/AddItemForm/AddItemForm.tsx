import s from "../Todolist/Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled}: AddItemFormType) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onAddItem = () => {
        if (title.trim() !== "") {
            addItem(title)
            setTitle("")
            setError(null)
        } else {
            setError("Please, enter your task!")
            setTitle("")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onAddItem()
        }
    }

    return (
        <div className={s.input}>
            <TextField
                value={title}
                label={'Type value'}
                variant={'outlined'}
                onChange={ onChangeHandler }
                onKeyPress={ onKeyPressHandler }
                error={ !!error }
                helperText={ error }
            />
            <IconButton disabled={disabled} color='primary'  onClick={ onAddItem }>
                <AddBox />
            </IconButton>
        </div>
    )
})