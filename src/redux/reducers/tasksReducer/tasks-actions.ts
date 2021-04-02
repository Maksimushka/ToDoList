// TYPES
import {TaskStatus} from '../../../api/tasksAPI';

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    id: string
    todoID: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    todoID: string
    title: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todoID: string
    id: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todoID: string
    id: string
    status: TaskStatus
}

// ACTION CREATORS
export const removeTaskAC = (id: string, todoID: string): RemoveTaskActionType => ({
    type: 'REMOVE_TASK',
    id: id,
    todoID: todoID
})
export const addTaskAC = (title: string, todoID: string): AddTaskActionType => ({
    type: 'ADD_TASK',
    title: title,
    todoID: todoID
})
export const changeTaskTitleAC = (title: string, id: string, todoID: string): ChangeTaskTitleActionType => ({
    type: 'CHANGE_TASK_TITLE',
    id: id,
    todoID: todoID,
    title: title
})
export const changeTaskStatusAC = (id: string, status: TaskStatus, todoID: string): ChangeTaskStatusActionType => ({
    type: 'CHANGE_TASK_STATUS',
    id,
    todoID,
    status
})