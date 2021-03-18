import s from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    console.log('AddItemForm rendering')

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
            setError(null)
        } else {
            setError("Please, enter your task!")
            setTitle("")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
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
            <IconButton color='primary'  onClick={ addItem }>
                <AddBox />
            </IconButton>
        </div>
    )
})