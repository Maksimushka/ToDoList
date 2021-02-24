import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    id: string
    todoID: string
}
type AddTaskActionType = {
    type: "ADD_TASK"
    todoID: string
    title: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    todoID: string
    id: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    todoID: string
    id: string
    isDone: boolean
}
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            let task = {id: v1(), title: action.title, isDone: false}
            let todolist = state[action.todoID]
            state[action.todoID] = [task, ...todolist]
            return { ...state }
        }
        case 'REMOVE_TASK': {
            let tasks = state[action.todoID]
            state[action.todoID] = tasks.filter(t => t.id !== action.id)
            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            let task = state[action.todoID].find( t => t.id === action.id )
            if (task) task.title = action.title
            return {...state}
        }
        case 'CHANGE_TASK_STATUS': {
            let task = state[action.todoID].find( t => t.id === action.id )
            if (task) task.isDone = action.isDone
            return {...state}
        }
        default: {
            throw new Error("I dont understand you")
        }
    }
}

export const RemoveTaskAC = (id: string, todoID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        id: id,
        todoID: todoID
    }
}
export const AddTaskAC = (title: string, todoID: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        title: title,
        todoID: todoID
    }
}
export const ChangeTaskTitleAC = (id: string, title: string, todoID: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        id: id,
        todoID: todoID,
        title: title
    }
}
export const ChangeTaskStatusAC = (id: string, isDone: boolean, todoID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id: id,
        todoID: todoID,
        isDone: isDone
    }
}