import React, {ChangeEvent, useState} from 'react';
import s from "./../Todolist/Todolist.module.css"
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    value: string
    onChange: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)
    const editInput = () => {
        setEditMode(true)
    }
    const editSpan = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
                ? <TextField
                        variant={'outlined'}
                        value={ title }
                        className={s.inputTask}
                        autoFocus
                        onChange={ changeTitle }
                        onBlur={ editSpan }
                    />
                : <span className={s.title} onDoubleClick={ editInput } >{ title }</span>
};

export default EditableSpan;