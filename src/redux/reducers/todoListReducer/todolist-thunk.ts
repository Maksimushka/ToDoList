import {Dispatch} from 'redux';
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodoListObjectStatusAC,
    setTodoListsAC
} from './todolist-actions';
import {todoListAPI} from '../../../api/todoAPI';
import {setLoadingStatusAC} from '../appReducer/app-actions';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

export const getTodoListsTC = () => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        let {data} = await todoListAPI.getTodoLists()
        dispatch(setTodoListsAC(data))
        dispatch(setLoadingStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }

}
export const deleteTodoListTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(setTodoListObjectStatusAC(todoId, 'loading'))
    try {
        let {data} = await todoListAPI.deleteTodoList(todoId)
        if (data.resultCode === 0) {
            dispatch(removeTodolistAC(todoId))
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(setTodoListObjectStatusAC(todoId, 'succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }

}
export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        let {data} = await todoListAPI.createTodoList(title)
        if (data.resultCode === 0) {
            dispatch(addTodolistAC(data.data.item))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const updateTodoListTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(setTodoListObjectStatusAC(todoId, 'loading'))
    try {
        let {data} = await todoListAPI.updateTodoList(todoId, title)
        if (data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todoId, title))
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(setTodoListObjectStatusAC(todoId, 'succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}