import s from "./Todolist/Todolist.module.css";
import React, {ChangeEvent, useState} from "react";

type EditableSpatType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpatType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                className={s.inputTask}
                autoFocus
                onChange={ ChangeTitle }
                value={ title }
                onBlur={ activateViewMode }
            />
            : <span onDoubleClick={ activeEditMode } className={s.title}>{ title }</span>
    )
}