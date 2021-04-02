import React, {ChangeEvent, useCallback} from 'react';
import s from '../Todolist/Todolist.module.css';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatus} from '../../api/tasksAPI';

export type TaskPropsType = {
    taskId: string
    todoId: string
    title: string
    status: TaskStatus
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (taskId: string, status: TaskStatus, todolistID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {taskId, todoId, title, status,
        removeTask, changeStatus, changeTaskTitle} = props

    const onRemoveHandler = () => removeTask(taskId, todoId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = status ? TaskStatus.New : TaskStatus.Completed
        changeStatus(taskId, newStatus, todoId)
    }
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(title, taskId, todoId)
    }, [taskId, todoId, changeTaskTitle])


    return (
        <div key={taskId} className={ !!status ? s.taskDone : s.task}>
            <Checkbox
                color={'primary'}
                onChange={ onChangeStatusHandler }
                checked={ !!status }
            />
            <EditableSpan value={ title } onChange={ onChangeTaskTitle } />
            <IconButton onClick={ onRemoveHandler } >
                <Delete />
            </IconButton>
        </div>
    )
})