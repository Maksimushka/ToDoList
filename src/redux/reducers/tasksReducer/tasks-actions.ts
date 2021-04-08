// TYPES
import {TaskStatus, TaskType} from '../../../api/tasksAPI';

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    id: string
    todoID: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    task: TaskType
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
export type SetTasksStatusActionType = {
    type: 'SET_TASKS'
    tasks: TaskType[]
    todoId: string
}

// ACTION CREATORS
export const removeTaskAC = (todoID: string, id: string,): RemoveTaskActionType => ({
    type: 'REMOVE_TASK',
    id,
    todoID
})
export const addTaskAC = (task: TaskType): AddTaskActionType => ({
    type: 'ADD_TASK',
    task
})
export const changeTaskTitleAC = (todoID: string, id: string, title: string): ChangeTaskTitleActionType => ({
    type: 'CHANGE_TASK_TITLE',
    id,
    todoID,
    title
})
export const changeTaskStatusAC = (todoID: string, id: string, status: TaskStatus): ChangeTaskStatusActionType => ({
    type: 'CHANGE_TASK_STATUS',
    id,
    todoID,
    status
})
export const setTasksAC = (todoId: string, tasks: TaskType[]): SetTasksStatusActionType => ({
    type: 'SET_TASKS',
    todoId,
    tasks
})