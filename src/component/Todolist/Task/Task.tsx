import React, {useCallback} from 'react';
import s from '../Todolist.module.css';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatus} from '../../../api/tasksAPI';
import {RequestStatusType} from '../../../redux/reducers/app-reducer';

export type TaskPropsType = {
    taskId: string
    todoId: string
    title: string
    status: TaskStatus
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (taskId: string, status: TaskStatus, todolistID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistID: string) => void
    taskObjectStatus: RequestStatusType
}

export const Task = React.memo((props: TaskPropsType) => {
    const {taskId, todoId, title, status, taskObjectStatus,
        removeTask, changeStatus, changeTaskTitle} = props

    const onRemoveHandler = () => removeTask(taskId, todoId)
    const onChangeStatusHandler = () => {
        let newStatus = status ? TaskStatus.New : TaskStatus.Completed
        changeStatus(taskId, newStatus, todoId)
    }
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(title, taskId, todoId)
    }, [taskId, todoId, changeTaskTitle])


    return (
        <div className={ !!status ? s.taskDone : s.task}>
            <Checkbox
                disabled={taskObjectStatus === 'loading'}
                color={'primary'}
                onChange={ onChangeStatusHandler }
                checked={ !!status }
            />
            <EditableSpan disabled={taskObjectStatus === 'loading'} value={ title } onChange={ onChangeTaskTitle } />
            <IconButton disabled={taskObjectStatus === 'loading'} onClick={ onRemoveHandler } >
                <Delete />
            </IconButton>
        </div>
    )
})