import {FilterValuesType} from './todolists-reducer';
import {TodoListType} from '../../../api/todoAPI';
import {RequestStatusType} from '../appReducer/app-reducer';

export type TodoListsActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListObjectStatusAC>
    | SetTodoListsActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

// ACTION CREATORS
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE_TODOLIST',
    id
} as const )
export const addTodolistAC = (todoList: TodoListType) => ({
    type: 'ADD_TODOLIST',
    todoList
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'Change_TODOLIST_TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    id,
    filter
} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({
    type: 'SET_TODOLISTS',
    todoLists
} as const)
export const setTodoListObjectStatusAC = (todoId: string, status: RequestStatusType) => ({
    type: 'SET_TODOLIST_OBJECT_STATUS',
    todoId,
    status
} as const)