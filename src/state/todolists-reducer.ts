import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

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
type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}]

export const todoListsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            return [
                ...state,
                {id: action.todoId, title: action.title, filter: 'all'}
            ]
        }
        case 'Change_TODOLIST_TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            todolist!.title = action.title
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            todolist!.filter = action.filter
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        id: id,
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        title: title,
        todoId: v1()
    }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'Change_TODOLIST_TITLE',
        id: id,
        title: title
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        id: id,
        filter: filter
    }
}