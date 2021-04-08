import {v1} from 'uuid';
import {FilterValuesType, TodoListBllType} from './todolists-reducer';

// TYPES
export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
    todoId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'Change_TODOLIST_TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodoListsActionType = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListBllType[]
}

// ACTION CREATORS
export const removeTodolistAC = (id: string): RemoveTodolistActionType => ({
    type: 'REMOVE_TODOLIST',
    id: id,
})
export const addTodolistAC = (title: string): AddTodolistActionType => ({
    type: 'ADD_TODOLIST',
    title: title,
    todoId: v1()
})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => ({
    type: 'Change_TODOLIST_TITLE',
    id,
    title
})
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id,
    filter
})
export const setTodoListAC = (todoLists: TodoListBllType[]): SetTodoListsActionType => ({
    type: 'SET_TODOLISTS',
    todoLists
})

