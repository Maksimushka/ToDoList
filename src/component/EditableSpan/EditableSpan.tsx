import React, {ChangeEvent, useState} from 'react';
import s from "./../Todolist/Todolist.module.css"
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    value: string
    onChange: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanType) => {

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
                        onKeyPress={ (e) => e.charCode === 13 && editSpan() }
                        autoFocus
                        onChange={ changeTitle }
                        onBlur={ editSpan }
                    />
                : <span className={s.title} onDoubleClick={ editInput } >{ title }</span>
})

export default EditableSpan;