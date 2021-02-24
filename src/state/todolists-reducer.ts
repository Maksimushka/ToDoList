import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}
type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    title: string
}
type ChangeTodolistTitleActionType = {
    type: "Change_TODOLIST_TITLE"
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD_TODOLIST": {
            return [
                ...state,
                {id: v1(), title: action.title, filter: 'all'}
            ]
        }
        case 'Change_TODOLIST_TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.title = action.title
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.filter = action.filter
            return [...state]
        }
        default:
            throw new Error("I do not understand your action type")
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        id: id
    }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        title: title
    }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'Change_TODOLIST_TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        id: id,
        filter: filter
    }
}