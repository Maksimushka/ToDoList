import React, {ChangeEvent, useState} from 'react';
import s from "./../Todolist/Todolist.module.css"

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


    return (
        <span>
            {
                editMode
                ? <input
                        value={ title }
                        className={s.inputTask}
                        autoFocus
                        onChange={ changeTitle }
                        onBlur={ editSpan }
                    />
                : <span className={s.title} onDoubleClick={ editInput } >{ title }</span>
            }
        </span>
    );
};

export default EditableSpan;