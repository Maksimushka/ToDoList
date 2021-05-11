import {FilterValuesType} from './todolists-reducer';
import {TodoListType} from '../../../api/todoAPI';
import {RequestStatusType} from '../appReducer/app-reducer';

export enum todoListsActionTypes {
    fetchRemoveTodolist = 'TODOLIST/FETCH_REMOVE_TODOLIST',
    fetchUpdateTodolist = 'TODOLIST/FETCH_CHANGE_TODOLIST_TITLE',
    fetchAddTodolist = 'TODOLIST/FETCH_ADD_TODOLIST',
    getTodoLists = 'TODOLIST/GET_TODOLISTS',

    removeTodolist = 'TODOLIST/REMOVE_TODOLIST',
    changeTodolistFilter = 'TODOLIST/CHANGE_TODOLIST_FILTER',
    changeTodolistTitle = 'TODOLIST/CHANGE_TODOLIST_TITLE',
    addTodolist = 'TODOLIST/ADD_TODOLIST',
    setTodoListObjectStatus = 'TODOLIST/SET_TODOLIST_OBJECT_STATUS',
    setTodoLists = 'TODOLIST/SET_TODOLISTS',
}

export type TodoListsReducerActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListObjectStatusAC>
    | SetTodoListsActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

// ACTION CREATORS
export const fetchRemoveTodoList = (payload: string) => ({
    type: todoListsActionTypes.fetchRemoveTodolist, payload
} as const)
export const fetchAddTodoList = (payload: string) => ({
    type: todoListsActionTypes.fetchAddTodolist, payload
} as const)
export const UpdateTodoList = (payload: {title: string, todoId: string}) => ({
    type: todoListsActionTypes.fetchUpdateTodolist, payload
} as const)
export const getTodoLists = () => ({type: todoListsActionTypes.getTodoLists} as const)

export const removeTodolistAC = (id: string) => ({
    type: todoListsActionTypes.removeTodolist, id
} as const )
export const addTodolistAC = (todoList: TodoListType) => ({
    type: todoListsActionTypes.addTodolist, todoList
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: todoListsActionTypes.changeTodolistTitle, id, title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: todoListsActionTypes.changeTodolistFilter, id, filter
} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({
    type: todoListsActionTypes.setTodoLists, todoLists
} as const)
export const setTodoListObjectStatusAC = (todoId: string, status: RequestStatusType) => ({
    type: todoListsActionTypes.setTodoListObjectStatus, todoId, status
} as const)