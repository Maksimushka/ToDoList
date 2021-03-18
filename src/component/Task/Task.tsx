import React, {ChangeEvent, useCallback} from 'react';
import s from '../Todolist/Todolist.module.css';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';

type TaskPropsType = {
    taskId: string
    todoId: string
    title: string
    isDone: boolean
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {taskId, todoId, title, isDone,
        removeTask, changeStatus, changeTaskTitle} = props

    const onRemoveHandler = () => removeTask(taskId, todoId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(taskId, e.currentTarget.checked, todoId)
    }
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(title, taskId, todoId)
    }, [taskId, todoId, changeTaskTitle])

    return (
        <div key={taskId} className={ isDone ? s.taskDone : s.task}>
            <Checkbox
                color={'primary'}
                onChange={ onChangeStatusHandler }
                checked={ isDone }
            />
            <EditableSpan value={ title } onChange={ onChangeTaskTitle } />
            <IconButton onClick={ onRemoveHandler } >
                <Delete />
            </IconButton>
        </div>
    )
})