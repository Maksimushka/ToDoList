import {Dispatch} from 'redux';
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodoListsAC} from './todolist-actions';
import {todoListAPI} from '../../../api/todoAPI';

export const getTodoListsTC = () => async (dispatch: Dispatch) => {
    let {data} = await todoListAPI.getTodoLists()
    dispatch(setTodoListsAC(data))
}

export const deleteTodoListTC = (todoId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodoList(todoId).then(() => {
        dispatch(removeTodolistAC(todoId))
    })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(title).then(() => {
        dispatch(addTodolistAC(title))
    })
}

export const updateTodoListTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todoId, title).then(() => {
        dispatch(changeTodolistTitleAC(todoId, title))
    })
}